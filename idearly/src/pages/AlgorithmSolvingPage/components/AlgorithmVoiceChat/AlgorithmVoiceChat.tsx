import { useState } from "react";
import ConnectLive from "@connectlive/connectlive-web-sdk";
import type { IRoom, ILocalMedia } from "@connectlive/connectlive-web-sdk";
import { useSearchParams } from "react-router-dom";

export const AlgorithmVoiceChat = () => {
  const [localMedia, setLocalMedia] = useState<ILocalMedia | null>(null);
  const [room, setRoom] = useState<IRoom | null>(null);
  const k1 = "ZY2JWWA";
  const k2 = "3GQTR";
  const s1 = "ZY2JWWA3G";
  const s2 = "QTR8S1X:oJBg";
  const s3 = "COsX0G77EGNh";
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");

  const connectConference = async () => {
    try {
      console.log("Connecting...");

      // Provisioning
      await ConnectLive.signIn({
        serviceId: k1 + k2,
        serviceSecret: s1 + s2 + s3,
      });
      console.log("User Signed In");

      // Create Local Media
      const newLocalMedia = await ConnectLive.createLocalMedia({
        audio: {
          echoCancellation: { ideal: true },
          autoGainControl: { ideal: false },
          noiseSuppression: { ideal: true },
        },
      });
      setLocalMedia(newLocalMedia);
      console.log("Local Media Created");

      // Create Conference
      const newRoom = ConnectLive.createRoom();
      setRoom(newRoom);
      console.log("Conference Created");

      // teamId
      if (teamId) {
        await newRoom.connect(teamId);
      } else {
        // teamId가 null일 때의 처리
        console.error("teamId is null");
        // 또는 기본값을 사용하거나 다른 처리를 할 수 있습니다.
      }
      await newRoom.publish([newLocalMedia]);
      console.log("Voice Connected");

      console.log("Connected");
    } catch (error) {
      console.error(error);
      console.log("Failed to Connect");
      alert("Failed to Start Service");
    }
  };

  const disconnectConference = async () => {
    if (!room || !localMedia) {
      console.error("No Conference to Stop");
      console.log("No active conference to disconnect");
      return;
    }

    try {
      console.log("Disconnecting...");
      console.log("Active Speaker Check Stopped");

      room.disconnect();
      console.log("Conference Disconnected");

      localMedia.stop();
      setLocalMedia(null);
      console.log("Voice Disconnected");

      console.log("Participants Cleared");

      ConnectLive.signOut();
      console.log("User Signed Out");

      setRoom(null); // Clear the room state
      console.log("Disconnected");
    } catch (error) {
      console.error(error);
      console.log("Failed to Disconnect");
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
