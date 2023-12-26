import * as S from "./AlgorithmNav.styles";
import type { Prop } from "./AlgorithmNav.types";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { AlgorithmExitModal } from "..";
import { AlgorithmVoiceChat } from "../AlgorithmVoiceChat/AlgorithmVoiceChat";
import { useCompetitionProblemIdsMutation } from "../../../../hooks/useCompetitionMutation";
import { problemListAtom } from "../../../../store";
import { useAtom } from "jotai";

export const AlgorithmNav = ({ onOpen }: Prop) => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const { id: competitionId } = useParams<{ id: string }>();
  const { isOpen, onOpen: onOpenExit, onClose } = useDisclosure();
  const [problemList, setProblemList] = useAtom(problemListAtom);

  console.log(problemList);

  const {
    data: problemIds,
    mutate: problemsMutate,
    status: problemStatus,
  } = useCompetitionProblemIdsMutation();

  useEffect(() => {
    problemsMutate(Number(competitionId));
  }, [competitionId, problemsMutate]);

  useEffect(() => {
    if (problemIds) {
      setProblemList(problemIds.result.problemIdList);
      console.log(problemIds.result.problemIdList);
    }
  }, [problemIds]);

  const navigate = useNavigate();

  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(
    problemList[0]
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

  if (problemStatus === "pending") return <div>...Loading</div>;

  return (
    <S.AlgorithmNavContainer>
      <AlgorithmExitModal isOpen={isOpen} onClose={onClose} />
      <div>
        {problemList.map((id, index) => (
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
