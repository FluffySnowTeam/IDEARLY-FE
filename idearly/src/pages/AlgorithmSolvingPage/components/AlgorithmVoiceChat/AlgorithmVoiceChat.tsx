import { useState } from "react";
import ConnectLive from "@connectlive/connectlive-web-sdk";
import type { IRoom, ILocalMedia } from "@connectlive/connectlive-web-sdk";

export const AlgorithmVoiceChat = () => {
  const [localMedia, setLocalMedia] = useState<ILocalMedia | null>(null);
  const [room, setRoom] = useState<IRoom | null>(null);
  const [statusText, setStatusText] = useState<string>("Disconnected");
  const [logs, setLogs] = useState<string[]>(["Ready to connect"]);
  const roomId = "icl-voice-call";

  const addLog = (text: string) => {
    setLogs((prevLogs) => [...prevLogs, text]);
  };

  const connectConference = async () => {
    try {
      setLogs(["Connecting..."]);
      setStatusText("Connecting...");

      // Provisioning
      await ConnectLive.signIn({
        serviceId: import.meta.env.VITE_APP_KAKAO_ID,
        serviceSecret: import.meta.env.VITE_APP_KAKAO_SECRET_KEY,
      });
      addLog("User Signed In");

      // Create Local Media
      const newLocalMedia = await ConnectLive.createLocalMedia({
        audio: {
          echoCancellation: { ideal: true },
          autoGainControl: { ideal: false },
          noiseSuppression: { ideal: true },
        },
      });
      setLocalMedia(newLocalMedia);
      addLog("Local Media Created");

      // Create Conference
      const newRoom = ConnectLive.createRoom();
      setRoom(newRoom);
      addLog("Conference Created");

      await newRoom.connect(roomId);
      await newRoom.publish([newLocalMedia]);
      addLog("Voice Connected");

      setStatusText("Connected");
    } catch (error) {
      console.error(error);
      setStatusText("Failed to Connect");
      alert("Failed to Start Service");
    }
  };

  const disconnectConference = async () => {
    if (!room || !localMedia) {
      console.error("No Conference to Stop");
      setStatusText("No active conference to disconnect");
      return;
    }

    try {
      setStatusText("Disconnecting...");
      addLog("Active Speaker Check Stopped");

      room.disconnect();
      addLog("Conference Disconnected");

      localMedia.stop();
      setLocalMedia(null);
      addLog("Voice Disconnected");

      addLog("Participants Cleared");

      ConnectLive.signOut();
      addLog("User Signed Out");

      setRoom(null); // Clear the room state
      setStatusText("Disconnected");
    } catch (error) {
      console.error(error);
      setStatusText("Failed to Disconnect");
    }
  };

  const [toggleState, setToggleState] = useState({
    micOn: false,
  });

  const toggleFeature = async (feature: "micOn") => {
    setToggleState((prev) => {
      const newState = {
        ...prev,
        [feature]: !prev[feature],
      };
      if (feature === "micOn") {
        if (newState.micOn) {
          connectConference();
        } else {
          disconnectConference();
        }
      }

      return newState;
    });
  };

  return (
    <div>
      {/* 연결 확인 로그용
      <div id="status">{statusText}</div>
      <div id="log-list">
        <h3>Log</h3>
        <ul id="log">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div> */}
      <span
        onClick={() => {
          toggleFeature("micOn");
        }}
        className="material-icons"
      >
        {toggleState.micOn ? "mic" : "mic_off"}
      </span>
    </div>
  );
};
