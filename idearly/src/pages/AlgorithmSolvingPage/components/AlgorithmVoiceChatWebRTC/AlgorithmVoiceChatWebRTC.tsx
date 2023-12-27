import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
// import Stomp from "stompjs";
// import { Client as StompClient } from "@stomp/stompjs";
import * as Stomp from "@stomp/stompjs";

const AlgorithmVoiceChatWebRTC = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const [myKey, setMyKey] = useState<string | undefined>(undefined);
  const [otherKeyList, setOtherKeyList] = useState<Set<string>>(new Set());
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
    undefined
  );
  //const stompClient = useRef(null);
  const stompClient = useRef<Stomp.Client | null>(null);
  const pcListMap = useRef<Map<string, RTCPeerConnection>>(new Map());
  const [remoteStreams, setRemoteStreams] = useState<{
    [key: string]: MediaStream;
  }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
    ],
  };

  //   const handleEnterRoom = async () => {
  //     await startVoice();
  //   };

  //   useEffect(() => {
  //     if (teamId) {
  //       startVoice();
  //     }
  //   }, [teamId]);

  useEffect(() => {
    if (myKey && stompClient.current) {
      console.log("myKey", myKey);
      stompClient.current.publish({ destination: `/app/call/key`, body: " " });
    }
  }, [myKey]);

  useEffect(() => {
    const sendOffers = () => {
      otherKeyList.forEach(async (key: string) => {
        if (!pcListMap.current.has(key)) {
          const pc = createPeerConnection(key);
          pcListMap.current.set(key, pc);
          sendOffer(pc, key);
        }
      });
    };

    if (otherKeyList) {
      console.log("otherKeyList", otherKeyList);
      sendOffers();
    }
  }, [otherKeyList]);

  const startVoice = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices !== undefined) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(async (stream) => {
            console.log("Stream found");
            // 마이크의 스트림 정보를 글로벌 변수로 저장
            stream.getAudioTracks()[0].enabled = true;
            setLocalStream(stream);
            resolve(stream);
          })
          .catch((error) => {
            console.error("Error accessing media devices:", error);
            reject(error);
          });
      }
    });
  };

  // 내 키 업데이트 함수
  const updateMyKey = useCallback((newKey: string) => {
    if (newKey) {
      setMyKey((prevKey) => prevKey ?? newKey);
    }
  }, []);

  // 다른 사용자 키 추가 함수
  const addOtherKey = useCallback((newKey: string) => {
    setOtherKeyList((prevList) => new Set([...prevList, newKey]));
  }, []);

  const connectSocket = async () => {
    console.log("connectSocket");
    if (myKey === undefined) {
      // const socket = new WebSocket("wss://idearly.site/ws/signaling");
      // stompClient.current = Stomp.over(socket);
      stompClient.current = new Stomp.Client({
        brokerURL: "wss://idearly.site/ws/signaling",
      });
      stompClient.current.activate();
    }
    if (stompClient.current) {
      stompClient.current.onConnect = () => {
        console.log("Connected to WebRTC server");

        stompClient.current?.subscribe(`/topic/user/connected`, (message) => {
          const connectedKey = JSON.parse(message.body).sessionId;
          updateMyKey(connectedKey);
        });
      };
    }
  };

  const handleUserDisconnected = (disconnectedKey: string) => {
    // 사용자 연결이 종료될 때의 로직을 수행
    // 해당 사용자의 피어 연결을 종료
    if (pcListMap.current.has(disconnectedKey)) {
      const pc = pcListMap.current.get(disconnectedKey);
      if (pc) {
        pc.close();
      }
      pcListMap.current.delete(disconnectedKey);
    }
    // 목록에서 해당 사용자 제거
    setOtherKeyList(
      (prevList) =>
        new Set([...prevList].filter((key) => key !== disconnectedKey))
    );

    // 화면에서 해당 사용자의 오디오 제거
    setRemoteStreams((prevStreams) => {
      const updatedStreams = { ...prevStreams };
      delete updatedStreams[disconnectedKey];

      const audioElement = audioRefs.current[disconnectedKey];
      if (audioElement) {
        audioElement.srcObject = null;
        audioElement.remove();
      }

      return updatedStreams;
    });
  };

  const onTrack = (event: RTCTrackEvent, otherKey: string) => {
    if (!remoteStreams[otherKey]) {
      setRemoteStreams((prevStreams) => ({
        ...prevStreams,
        [otherKey]: event.streams[0],
      }));
    }
  };

  const createPeerConnection = (otherKey: string) => {
    const pc = new RTCPeerConnection(configuration);
    try {
      pc.addEventListener("icecandidate", (event) => {
        onIceCandidate(event, otherKey);
      });
      pc.addEventListener("track", (event) => {
        onTrack(event, otherKey);
      });
      if (localStream) {
        // localStream이 정의되어 있는지 확인
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }
      console.log("PeerConnection created");
    } catch (error) {
      console.error("PeerConnection failed: ", error);
    }
    return pc;
  };

  const onIceCandidate = (
    event: RTCPeerConnectionIceEvent,
    otherKey: string
  ) => {
    console.log("event.candidate", event.candidate);
    if (event.candidate) {
      console.log("ICE candidate");
      const pc = pcListMap.current.get(otherKey);

      const sendIceCandidate = () => {
        if (stompClient.current && pc && pc.remoteDescription) {
          stompClient.current.publish({
            destination: `/app/peer/iceCandidate/${otherKey}/${teamId}`,
            body: JSON.stringify({
              key: myKey,
              body: event.candidate,
            }),
          });
        }
      };

      if (event.candidate) {
        // 유효한 ICE 후보가 있는 경우
        console.log("ICE candidate");
        if (pc && pc.remoteDescription) {
          sendIceCandidate();
        } else {
          // 원격 설명이 설정될 때까지 기다리기
          const checkInterval = setInterval(() => {
            if (pc && pc.remoteDescription && event.candidate) {
              clearInterval(checkInterval);
              sendIceCandidate();
            }
          }, 500);
        }
      } else {
        // ICE 후보 수집이 완료되었음을 나타내는 null 이벤트
        console.log("ICE gathering completed");
        sendIceCandidate();
      }
    }
  };

  const sendOffer = (pc: RTCPeerConnection, otherKey: string) => {
    pc.createOffer().then((offer) => {
      pc.setLocalDescription(offer).then(() => {
        stompClient.current?.publish({
          destination: `/app/peer/offer/${otherKey}/${teamId}`,
          body: JSON.stringify({
            key: myKey,
            body: offer,
          }),
        });
        console.log("Send offer");
      });
    });
  };

  const sendAnswer = (pc: RTCPeerConnection, otherKey: string) => {
    pc.createAnswer().then((answer) => {
      pc.setLocalDescription(answer).then(() => {
        stompClient.current?.publish({
          destination: `/app/peer/answer/${otherKey}/${teamId}`,
          body: JSON.stringify({
            key: myKey,
            body: answer,
          }),
        });
        console.log("Send answer");
      });
    });
  };

  useEffect(() => {
    Object.keys(remoteStreams).forEach((key) => {
      const audioElement = audioRefs.current[key];
      if (audioElement && remoteStreams[key]) {
        audioElement.srcObject = remoteStreams[key];
      }

      //   if (audioRefs.current[key] && remoteStreams[key]) {
      //     const audioElement = audioRefs.current[key];
      //     audioElement.srcObject = remoteStreams[key];
      //   }
    });
  }, [remoteStreams]);

  // // 중요한 부분!
  // useEffect(() => {
  //   if (localStream !== undefined) {
  //     connectSocket();
  //   }
  //   // eslint-disable-next-line
  // }, [localStream]);
  useEffect(() => {
    if (localStream && !myKey) {
      connectSocket();
    }
  }, [localStream, myKey]);

  useEffect(() => {
    if (myKey !== undefined) {
      // 사용자 연결을 감지하는 subscribe
      stompClient.current?.subscribe(`/topic/user/connected`, (message) => {
        const connectedKey = JSON.parse(message.body);
        if (myKey === undefined) {
          console.log("getMyKey");
          setMyKey(connectedKey.sessionId);
        }
      });

      // iceCandidate peer 교환을 위한 subscribe
      stompClient.current?.subscribe(
        `/topic/peer/iceCandidate/${myKey}/${teamId}`,
        (candidate) => {
          const key = JSON.parse(candidate.body).key;
          const message = JSON.parse(candidate.body).body;
          // 해당 key에 해당되는 peer 에 받은 정보를 addIceCandidate 해준다.

          const pc = pcListMap.current.get(key);
          if (pc) {
            try {
              pc.addIceCandidate(
                new RTCIceCandidate({
                  candidate: message.candidate,
                  sdpMLineIndex: message.sdpMLineIndex,
                  sdpMid: message.sdpMid,
                })
              );
            } catch (error) {
              console.warn("addIceCandidate failed: ", error);
            }
          } else {
            console.warn(`PeerConnection for key ${key} not found`);
          }
          //   try {
          //     pcListMap.current.get(key).addIceCandidate(
          //       new RTCIceCandidate({
          //         candidate: message.candidate,
          //         sdpMLineIndex: message.sdpMLineIndex,
          //         sdpMid: message.sdpMid,
          //       })
          //     );
          //   } catch (error) {
          //     console.warn("addIceCandidate failed: ", error);
          //   }
        }
      );

      // offer peer 교환을 위한 subscribe
      stompClient.current?.subscribe(
        `/topic/peer/offer/${myKey}/${teamId}`,
        (offer) => {
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;
          if (!pcListMap.current.has(key)) {
            const newPc = createPeerConnection(key);
            pcListMap.current.set(key, newPc);
            newPc.setRemoteDescription(
              new RTCSessionDescription({
                type: message.type,
                sdp: message.sdp,
              })
            );
            sendAnswer(newPc, key);

            // pcListMap.current.set(key, createPeerConnection(key));
            // // 생성한 peer 에 offer 정보를 setRemoteDescription 해준다.
            // pcListMap.current.get(key).setRemoteDescription(
            //   new RTCSessionDescription({
            //     type: message.type,
            //     sdp: message.sdp,
            //   })
            // );
            // // sendAnswer 함수를 호출해준다.
            // sendAnswer(pcListMap.current.get(key), key);
          }
          // 해당 key에 새로운 peerConnection 를 생성해준 후 pcListMap 에 저장해준다.
        }
      );

      // answer peer 교환을 위한 subscribe
      stompClient.current?.subscribe(
        `/topic/peer/answer/${myKey}/${teamId}`,
        (answer) => {
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;
          // 해당 key에 해당되는 Peer 에 받은 정보를 setRemoteDescription 해준다.
          const pc = pcListMap.current.get(key);
          if (pc) {
            try {
              pc.setRemoteDescription(new RTCSessionDescription(message));
            } catch (error) {
              console.warn("setRemoteDescription failed: ", error);
            }
          } else {
            console.warn("PeerConnection not found for key:", key);
          }
          //   try {
          //     pcListMap.current
          //       .get(key)
          //       .setRemoteDescription(new RTCSessionDescription(message));
          //   } catch (error) {
          //     console.warn("setRemoteDescription failed: ", error);
          //   }
        }
      );

      // key를 보내라는 신호를 받은 subscribe
      stompClient.current?.subscribe(`/topic/call/key`, () => {
        // 자신의 key를 보내는 send
        console.log("보내는 key", myKey);
        stompClient.current?.publish({
          destination: `/app/send/key`,
          body: JSON.stringify(myKey),
        });
      });

      // 상대방의 key를 받는 subscribe
      stompClient.current?.subscribe(`/topic/send/key`, (message) => {
        const key = JSON.parse(message.body);
        console.log("받는 key", key);
        // 만약 중복되는 키가 otherKeyList에 있는지 확인하고 없다면 추가해준다.
        if (myKey !== key) {
          // setOtherKeyList(prevList => new Set([...prevList, key]));
          addOtherKey(key);
        }
      });

      // 사용자 연결 종료를 감지하는 subscribe
      stompClient.current?.subscribe(`/topic/user/disconnected`, (message) => {
        const disconnectedKey = JSON.parse(message.body);
        handleUserDisconnected(disconnectedKey.sessionId);
      });
    }
    // eslint-disable-next-line
  }, [myKey, pcListMap]);

  const [toggleState, setToggleState] = useState({
    micOn: false,
  });

  const toggleFeature = async (feature: "micOn") => {
    setToggleState((prev) => {
      const newState = {
        ...prev,
        [feature]: !prev[feature],
      };
      if (feature === "micOn" && teamId) {
        startVoice();
      }

      return newState;
    });
  };

  return (
    <div>
      {/* <label>
        방 번호:
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </label>
      <button onClick={handleEnterRoom}>입장</button> */}

      {/* {localStream && (
        <button onClick={handleStartStream}>스트림 시작</button>
      )} */}
      <div>
        <span
          onClick={() => {
            toggleFeature("micOn");
          }}
          className="material-icons"
        >
          {toggleState.micOn ? "mic" : "mic_off"}
        </span>
      </div>

      <div id="remoteStreamDiv">
        {Object.keys(remoteStreams).map((key) => (
          <div key={key}>
            <p>{key}</p>
            <audio
              ref={(el) => (audioRefs.current[key] = el)}
              autoPlay
              controls
              id={key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmVoiceChatWebRTC;
