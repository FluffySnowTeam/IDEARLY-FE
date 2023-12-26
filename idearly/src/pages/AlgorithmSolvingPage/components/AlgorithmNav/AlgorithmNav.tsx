import * as S from "./AlgorithmNav.styles";
// import { AlgorithmVoiceChat } from "..";
import { fakeProblem } from "../../../../mocks/problem.mocks";
import type { Prop } from "./AlgorithmNav.types";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { AlgorithmExitModal } from "..";

export const AlgorithmNav = ({ onOpen }: Prop) => {
  const navigate = useNavigate();
  const path = useLocation();
  const { isOpen, onOpen: onOpenExit, onClose } = useDisclosure();

  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    fakeProblem[0].id
  );
  const selectedStyle = {
    backgroundColor: "#01228a",
    color: "white",
  };
  const defaultStyle = {
    backgroundColor: "initial",
    color: "#01228a",
  };

  window.onload = () => {
    navigate(`${path.pathname}?id=${fakeProblem[0].id}`);
  };

  const handleProblems = (id: string) => {
    navigate(`${path.pathname}?id=${id}`);
    setSelectedProblemId(id);
  };
  return (
    <S.AlgorithmNavContainer>
      <AlgorithmExitModal isOpen={isOpen} onClose={onClose} />
      <div>
        {fakeProblem.map((problem, index) => (
          <S.ProblemNumber
            key={problem.id}
            onClick={() => {
              handleProblems(problem.id);
            }}
            style={
              problem.id === selectedProblemId ? selectedStyle : defaultStyle
            }
          >
            <div>{index + 1}</div>
            {/* 만약 해당 문제가 제출되었다면 체크 표시 */}
            {/* <S.CheckIcon /> */}
          </S.ProblemNumber>
        ))}
      </div>
      <S.NavIcons>
        {/* <AlgorithmVoiceChat /> */}
        <span className="material-icons" onClick={onOpen}>
          chat
        </span>
        <S.ExitBtn colorScheme="red" onClick={onOpenExit}>
          종료
        </S.ExitBtn>
      </S.NavIcons>
    </S.AlgorithmNavContainer>
  );
};
