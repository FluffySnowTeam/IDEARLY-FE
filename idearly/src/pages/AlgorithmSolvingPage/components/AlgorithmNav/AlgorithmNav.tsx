import * as S from "./AlgorithmNav.styles";
import { AlgorithmVoiceChat } from "..";
import { fakeProblem } from "../../../../mocks/problem.mocks";
import type { Prop } from "./AlgorithmNav.types";

export const AlgorithmNav = ({onOpen}: Prop) => {

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
        <AlgorithmVoiceChat />
        <span 
          className="material-icons"
          onClick={onOpen}
        >
          chat
        </span>
      </S.NavIcons>
    </S.AlgorithmNavContainer>
  );
};
