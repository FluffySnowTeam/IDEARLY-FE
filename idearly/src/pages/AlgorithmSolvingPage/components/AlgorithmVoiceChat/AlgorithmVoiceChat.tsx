import { useState } from "react";

export const AlgorithmVoiceChat = () => {
  const [toggleState, setToggleState] = useState({
    speakerOn: false,
    micOn: false,
  });

  const toggleFeature = (feature: "speakerOn" | "micOn") => {
    setToggleState((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };
  return (
    <>
      <span
        onClick={() => {
          toggleFeature("speakerOn");
        }}
        className="material-icons"
      >
        {toggleState.speakerOn ? "volume_up" : "volume_off"}
      </span>
      <span
        onClick={() => {
          toggleFeature("micOn");
        }}
        className="material-icons"
      >
        {toggleState.micOn ? "mic" : "mic_off"}
      </span>
    </>
  );
};
