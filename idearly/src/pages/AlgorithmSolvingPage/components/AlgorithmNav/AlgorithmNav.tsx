import { fakeProblem } from "../../../../mocks/problem.mocks";
import * as S from "./AlgorithmNav.styles";
import { AlgorithmVoiceChat } from "..";

export const AlgorithmNav = () => {
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
        <span className="material-icons">chat</span>
      </S.NavIcons>
    </S.AlgorithmNavContainer>
  );
};
