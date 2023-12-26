import * as S from "./AlgorithmNav.styles";
import type { Prop } from "./AlgorithmNav.types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { AlgorithmExitModal } from "..";
import { AlgorithmVoiceChat } from "../AlgorithmVoiceChat/AlgorithmVoiceChat";
import { useAtomValue } from "jotai";
import { problemListAtom } from "../../../../store";

export const AlgorithmNav = ({ onOpen }: Prop) => {
  const problemIds = useAtomValue(problemListAtom);
  console.log(problemIds);
  const { isOpen, onOpen: onOpenExit, onClose } = useDisclosure();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(
    problemIds[0]
  );
  const selectedStyle = {
    backgroundColor: "#01228a",
    color: "white",
  };
  const defaultStyle = {
    backgroundColor: "initial",
    color: "#01228a",
  };

  const handleProblems = (id: number) => {
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    console.log(id);
    console.log(newUrl);
    navigate(newUrl);
    setSelectedProblemId(id);
  };
  return (
    <S.AlgorithmNavContainer>
      <AlgorithmExitModal isOpen={isOpen} onClose={onClose} />
      <div>
        {problemIds.map((id, index) => (
          <S.ProblemNumber
            key={id}
            onClick={() => {
              handleProblems(id);
            }}
            style={id === selectedProblemId ? selectedStyle : defaultStyle}
          >
            <div>{index + 1}</div>
            {/* 만약 해당 문제가 제출되었다면 체크 표시 */}
            {/* <S.CheckIcon /> */}
          </S.ProblemNumber>
        ))}
      </div>
      <S.NavIcons>
        <AlgorithmVoiceChat />
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
