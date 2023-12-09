import { useState } from "react";
import { fakeProblem } from "../../../../mocks/problem.mocks";
import * as S from "./AlgorithmNav.styles";

export const AlgorithmNav = () => {
  const [toggleState, setToggleState] = useState({
    speakerOn: true,
    micOn: true,
  });

  const toggleFeature = (feature: "speakerOn" | "micOn") => {
    setToggleState((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <S.AlgorithmNavContainer>
      <div>
        {fakeProblem.map((problem, index) => (
          <S.ProblemNumber key={problem.id}>
            <div>{index + 1}</div>
          </S.ProblemNumber>
        ))}
      </div>
      <S.NavIcons>
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
        <span className="material-icons">chat</span>
      </S.NavIcons>
    </S.AlgorithmNavContainer>
  );
};
