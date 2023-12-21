// import { useState } from "react";
// import ConnectLive from "@connectlive/connectlive-web-sdk";
// import type { IRoom, ILocalMedia } from "@connectlive/connectlive-web-sdk";

// export const AlgorithmVoiceChat = () => {
//   const [localMedia, setLocalMedia] = useState<ILocalMedia | null>(null);
//   const [room, setRoom] = useState<IRoom | null>(null);
//   const [statusText, setStatusText] = useState<string>("Disconnected");
//   const [logs, setLogs] = useState<string[]>(["Ready to connect"]);
//   const roomId = "icl-voice-call";

//   const addLog = (text: string) => {
//     setLogs((prevLogs) => [...prevLogs, text]);
//   };

//   const connectConference = async () => {
//     try {
//       setLogs(["Connecting..."]);
//       setStatusText("Connecting...");

//       // Provisioning
//       await ConnectLive.signIn({
//         serviceId: import.meta.env.VITE_APP_KAKAO_ID,
//         serviceSecret: import.meta.env.VITE_APP_KAKAO_SECRET_KEY,
//       });
//       addLog("User Signed In");

//       // Create Local Media
//       const newLocalMedia = await ConnectLive.createLocalMedia({
//         audio: {
//           echoCancellation: { ideal: true },
//           autoGainControl: { ideal: false },
//           noiseSuppression: { ideal: true },
//         },
//       });
//       setLocalMedia(newLocalMedia);
//       addLog("Local Media Created");

//       // Create Conference
//       const newRoom = ConnectLive.createRoom();
//       setRoom(newRoom);
//       addLog("Conference Created");

//       await newRoom.connect(roomId);
//       await newRoom.publish([newLocalMedia]);
//       addLog("Voice Connected");

//       setStatusText("Connected");
//     } catch (error) {
//       console.error(error);
//       setStatusText("Failed to Connect");
//       alert("Failed to Start Service");
//     }
//   };

//   const disconnectConference = async () => {
//     if (!room || !localMedia) {
//       console.error("No Conference to Stop");
//       setStatusText("No active conference to disconnect");
//       return;
//     }

//     try {
//       setStatusText("Disconnecting...");
//       addLog("Active Speaker Check Stopped");

//       room.disconnect();
//       addLog("Conference Disconnected");

//       localMedia.stop();
//       setLocalMedia(null);
//       addLog("Voice Disconnected");

//       addLog("Participants Cleared");

//       ConnectLive.signOut();
//       addLog("User Signed Out");

//       setRoom(null); // Clear the room state
//       setStatusText("Disconnected");
//     } catch (error) {
//       console.error(error);
//       setStatusText("Failed to Disconnect");
//     }
//   };

//   const [toggleState, setToggleState] = useState({
//     micOn: false,
//   });

//   const toggleFeature = async (feature: "micOn") => {
//     setToggleState((prev) => {
//       const newState = {
//         ...prev,
//         [feature]: !prev[feature],
//       };
//       if (feature === "micOn") {
//         if (newState.micOn) {
//           connectConference();
//         } else {
//           disconnectConference();
//         }
//       }

//       return newState;
//     });
//   };

//   return (
//     <div>
//       연결 확인 로그용
//       <div id="status">{statusText}</div>
//       <div id="log-list">
//         <h3>Log</h3>
//         <ul id="log">
//           {logs.map((log, index) => (
//             <li key={index}>{log}</li>
//           ))}
//         </ul>
//       </div>
//       <span
//         onClick={() => {
//           toggleFeature("micOn");
//         }}
//         className="material-icons"
//       >
//         {toggleState.micOn ? "mic" : "mic_off"}
//       </span>
//     </div>
//   );
// };

// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Socket, io } from "socket.io-client";

// interface IncomingCall {
//   sdp: RTCSessionDescriptionInit;
//   caller: string;
// }

// interface AnswerMessage {
//   sdp: RTCSessionDescriptionInit;
//   caller: string;
// }

// export const AlgorithmVoiceChat = () => {
//   const [toggleState, setToggleState] = useState({
//     speakerOn: false,
//     micOn: false,
//   });

//   const toggleFeature = (feature: "speakerOn" | "micOn") => {
//     setToggleState((prev) => {
//       const newState = {
//         ...prev,
//         [feature]: !prev[feature],
//       };

//       // 마이크 상태 업데이트
//       if (feature === "micOn" && userStream.current) {
//         userStream.current.getAudioTracks().forEach((track) => {
//           track.enabled = newState.micOn;
//         });
//       }

//       // 스피커 상태 (음소거) 업데이트
//       if (feature === "speakerOn" && userVideo.current) {
//         userVideo.current.muted = !newState.speakerOn;
//       }

//       return newState;
//     });
//   };

//   const userVideo = useRef<HTMLVideoElement>(null);
//   const partnerVideos = useRef<{ [key: string]: HTMLVideoElement | null }>({});
//   const peerRefs = useRef<{ [key: string]: RTCPeerConnection }>({});
//   const socketRef = useRef<Socket | null>(null);
//   const userStream = useRef<MediaStream | null>(null);
//   const { id } = useParams<{ id: string }>();
//   const videoContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: false, video: false })
//       .then((stream) => {
//         if (userVideo.current) userVideo.current.srcObject = stream;
//         userStream.current = stream;

//         socketRef.current = io("/");
//         if (socketRef.current) {
//           socketRef.current.emit("join room", id);

//           socketRef.current.on("other users", (userIDs) => {
//             console.log("Other users in the room: ", userIDs);
//             userIDs.forEach((userID: string) => {
//               const peer = createPeer(userID);
//               peerRefs.current[userID] = peer;
//             });
//           });

//           socketRef.current.on("user joined", (userID) => {
//             console.log("User joined in the room: ", userID);
//             const peer = createPeer(userID);
//             peerRefs.current[userID] = peer;
//           });

//           socketRef.current.on("offer", handleRecieveCall);
//           socketRef.current.on("answer", handleAnswer);
//           socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
//         }
//       });
//   }, [id]);

//   function createPeer(userID: string) {
//     console.log(`Creating peer connection for user: ${userID}`);
//     const peer = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: "stun:stun.stunprotocol.org",
//         },
//         {
//           urls: "turn:numb.viagenie.ca",
//           credential: "muazkh",
//           username: "webrtc@live.com",
//         },
//       ],
//     });

//     // 로컬 미디어 스트림을 피어 연결에 추가합니다.
//     if (userStream.current) {
//       userStream.current.getTracks().forEach((track) => {
//         peer.addTrack(track, userStream.current as MediaStream);
//       });
//     }

//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current?.emit("ice-candidate", {
//           target: userID,
//           candidate: event.candidate,
//         });
//       }
//     };

//     peer.ontrack = (e) => handleTrackEvent(e, userID);
//     peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer, userID);

//     return peer;
//   }

//   function handleNegotiationNeededEvent(
//     peer: RTCPeerConnection,
//     userID: string
//   ) {
//     console.log(`Negotiation needed for user: ${userID}`);
//     peer
//       .createOffer()
//       .then((offer) => {
//         return peer.setLocalDescription(offer);
//       })
//       .then(() => {
//         const payload = {
//           target: userID,
//           caller: socketRef.current?.id,
//           sdp: peer.localDescription,
//         };
//         socketRef.current?.emit("offer", payload);
//       })
//       .catch((e) => console.log(e));
//   }

//   function handleRecieveCall(incoming: IncomingCall) {
//     console.log(`Received call from user: ${incoming.caller}`);
//     const peer = peerRefs.current[incoming.caller];
//     if (!peer) return;

//     const desc = new RTCSessionDescription(incoming.sdp);
//     peer
//       .setRemoteDescription(desc)
//       .then(() => {
//         userStream.current
//           ?.getTracks()
//           .forEach((track) =>
//             peer.addTrack(track, userStream.current as MediaStream)
//           );
//       })
//       .then(() => {
//         return peer.createAnswer();
//       })
//       .then((answer) => {
//         return peer.setLocalDescription(answer);
//       })
//       .then(() => {
//         const payload = {
//           target: incoming.caller,
//           caller: socketRef.current?.id,
//           sdp: peer.localDescription,
//         };
//         socketRef.current?.emit("answer", payload);
//       });
//   }

//   function handleAnswer(message: AnswerMessage) {
//     console.log(`Received answer from user: ${message.caller}`);
//     const peer = peerRefs.current[message.caller];
//     if (!peer) return;

//     const desc = new RTCSessionDescription(message.sdp);
//     peer.setRemoteDescription(desc).catch((e) => console.log(e));
//   }

//   function handleNewICECandidateMsg(incoming: {
//     target: string;
//     candidate: RTCIceCandidate;
//   }) {
//     console.log(`Received ICE candidate from user: ${incoming.target}`);
//     const peer = peerRefs.current[incoming.target];
//     if (!peer) return;

//     const candidate = new RTCIceCandidate(incoming.candidate);
//     peer.addIceCandidate(candidate).catch((e) => console.log(e));
//   }

//   function handleTrackEvent(e: RTCTrackEvent, userID: string) {
//     if (!userID) {
//       console.error("UserID is null or undefined.");
//       return;
//     }

//     let videoElement = partnerVideos.current[userID];
//     if (!videoElement) {
//       videoElement = document.createElement("video");
//       videoElement.autoplay = true;
//       partnerVideos.current[userID] = videoElement;
//       videoContainerRef.current?.appendChild(videoElement);
//     }

//     videoElement.srcObject = e.streams[0];
//   }

//   useEffect(() => {
//     const videoContainer = videoContainerRef.current;
//     if (videoContainer) {
//       Object.keys(partnerVideos.current).forEach((userID) => {
//         const videoElement = partnerVideos.current[userID];
//         if (videoElement && !videoContainer.contains(videoElement)) {
//           videoContainer.appendChild(videoElement);
//         }
//       });
//     }

//     return () => {
//       if (videoContainer) {
//         videoContainer.innerHTML = "";
//       }
//     };
//   }, [partnerVideos.current]);

//   return (
//     <>
{
  /* <span
        onClick={() => {
          toggleFeature("speakerOn");
        }}
        className="material-icons"
      >
        {toggleState.speakerOn ? "volume_up" : "volume_off"}
      </span> */
}
{
  /* <span
        onClick={() => {
          toggleFeature("micOn");
        }}
        className="material-icons"
      >
        {toggleState.micOn ? "mic" : "mic_off"}
      </span>
      <video autoPlay ref={userVideo} style={{ display: "none" }} />
      <div ref={videoContainerRef} style={{ display: "none" }} />
    </>
  );
}; */
}
