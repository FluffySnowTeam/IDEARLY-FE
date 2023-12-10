import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

interface IncomingCall {
  sdp: RTCSessionDescriptionInit;
  caller: string;
}

interface AnswerMessage {
  sdp: RTCSessionDescriptionInit;
  caller: string;
}

const Room: React.FC = () => {
  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideos = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const peerRefs = useRef<{ [key: string]: RTCPeerConnection }>({});
  const socketRef = useRef<Socket | null>(null);
  const userStream = useRef<MediaStream | null>(null);
  const { id } = useParams<{ id: string }>();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        if (userVideo.current) userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io("/");
        socketRef.current.emit("join room", id);

        socketRef.current.on("other users", (userIDs) => {
          console.log("Other users in the room: ", userIDs);
          userIDs.forEach((userID: string) => {
            const peer = createPeer(userID);
            peerRefs.current[userID] = peer;
          });
        });

        socketRef.current.on("user joined", (userID) => {
          console.log("User joined in the room: ", userID);
          const peer = createPeer(userID);
          peerRefs.current[userID] = peer;
        });

        socketRef.current.on("offer", handleRecieveCall);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
      });
  }, [id]);

  function createPeer(userID: string) {
    console.log(`Creating peer connection for user: ${userID}`);
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    // 로컬 미디어 스트림을 피어 연결에 추가합니다.
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => {
        peer.addTrack(track, userStream.current as MediaStream);
      });
    }

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("ice-candidate", {
          target: userID,
          candidate: event.candidate,
        });
      }
    };

    peer.ontrack = (e) => handleTrackEvent(e, userID);
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer, userID);

    return peer;
  }

  function handleNegotiationNeededEvent(
    peer: RTCPeerConnection,
    userID: string
  ) {
    console.log(`Negotiation needed for user: ${userID}`);
    peer
      .createOffer()
      .then((offer) => {
        return peer.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current?.id,
          sdp: peer.localDescription,
        };
        socketRef.current?.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming: IncomingCall) {
    console.log(`Received call from user: ${incoming.caller}`);
    const peer = peerRefs.current[incoming.caller];
    if (!peer) return;

    const desc = new RTCSessionDescription(incoming.sdp);
    peer
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          ?.getTracks()
          .forEach((track) =>
            peer.addTrack(track, userStream.current as MediaStream)
          );
      })
      .then(() => {
        return peer.createAnswer();
      })
      .then((answer) => {
        return peer.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current?.id,
          sdp: peer.localDescription,
        };
        socketRef.current?.emit("answer", payload);
      });
  }

  function handleAnswer(message: AnswerMessage) {
    console.log(`Received answer from user: ${message.caller}`);
    const peer = peerRefs.current[message.caller];
    if (!peer) return;

    const desc = new RTCSessionDescription(message.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleNewICECandidateMsg(incoming: {
    target: string;
    candidate: RTCIceCandidate;
  }) {
    console.log(`Received ICE candidate from user: ${incoming.target}`);
    const peer = peerRefs.current[incoming.target];
    if (!peer) return;

    const candidate = new RTCIceCandidate(incoming.candidate);
    peer.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e: RTCTrackEvent, userID: string) {
    if (!userID) {
      console.error("UserID is null or undefined.");
      return;
    }

    let videoElement = partnerVideos.current[userID];
    if (!videoElement) {
      videoElement = document.createElement("video");
      videoElement.autoplay = true;
      partnerVideos.current[userID] = videoElement;
      videoContainerRef.current?.appendChild(videoElement);
    }

    videoElement.srcObject = e.streams[0];
  }

  useEffect(() => {
    const videoContainer = videoContainerRef.current;
    if (videoContainer) {
      Object.keys(partnerVideos.current).forEach((userID) => {
        const videoElement = partnerVideos.current[userID];
        if (videoElement && !videoContainer.contains(videoElement)) {
          videoContainer.appendChild(videoElement);
        }
      });
    }

    return () => {
      if (videoContainer) {
        videoContainer.innerHTML = "";
      }
    };
  }, [partnerVideos.current]);

  return (
    <div>
      <video autoPlay ref={userVideo} />
      <div ref={videoContainerRef} />
      {/* 파트너 비디오 요소는 동적으로 생성되므로 여기에는 포함되지 않습니다. */}
    </div>
  );
};

export default Room;
