import * as S from "./AlgorithmNav.styles";
import { AlgorithmVoiceChat } from "..";
import { fakeProblem } from "../../../../mocks/problem.mocks";
import type { Prop } from "./AlgorithmNav.types";
import { useLocation, useNavigate } from "react-router-dom";

export const AlgorithmNav = ({ onOpen }: Prop) => {
  const navigate = useNavigate();
  const path = useLocation();
  const handleProblems = (id: string) => {
    navigate(`${path.pathname}?id=${id}`);
  };
  return (
    <S.AlgorithmNavContainer>
      <div>
        {fakeProblem.map((problem, index) => (
          <S.ProblemNumber
            key={problem.id}
            onClick={() => {
              handleProblems(problem.id);
            }}
          >
            <div>{index + 1}</div>
          </S.ProblemNumber>
        ))}
      </div>
      <S.NavIcons>
        <AlgorithmVoiceChat />
        <span className="material-icons" onClick={onOpen}>
          chat
        </span>
      </S.NavIcons>
    </S.AlgorithmNavContainer>
  );
};
