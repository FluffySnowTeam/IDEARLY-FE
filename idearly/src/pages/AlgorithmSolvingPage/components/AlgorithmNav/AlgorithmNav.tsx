import * as S from "./AlgorithmNav.styles";
import type { Prop } from "./AlgorithmNav.types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { AlgorithmExitModal } from "..";
import { AlgorithmVoiceChat } from "../AlgorithmVoiceChat/AlgorithmVoiceChat";
import { useAtomValue } from "jotai";
import { problemListAtom } from "../../../../store";

export const AlgorithmNav = ({ onOpen }: Prop) => {
  const problemIds = useAtomValue(problemListAtom);
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const { isOpen, onOpen: onOpenExit, onClose } = useDisclosure();
  const { id: competitionId } = useParams<{ id: string }>();
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
    if (problemIds) {
      navigate(
        `/algorithm-solving/${competitionId}?teamId=${teamId}&problemId=${id}`
      );
      setSelectedProblemId(id);
    }
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
