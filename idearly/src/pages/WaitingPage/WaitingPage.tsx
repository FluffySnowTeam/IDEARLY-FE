import * as S from "./WaitingPage.styles";
import { WaitingPageConfig } from "../../constants";
import { useCompetitionTimer } from "../../hooks";
import { useAtom } from "jotai";
import { competitionDataAtom, problemListAtom } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useCompetitionDetailMutation,
  useCompetitionProblemIdsMutation,
} from "../../hooks/useCompetitionMutation";

export const WaitingPage = () => {
  const navigate = useNavigate();
  const { id: competitionId } = useParams<{ id: string }>();
  const { title, subTitle, content } = WaitingPageConfig;
  const [competition, setCompetition] = useAtom(competitionDataAtom);
  const [problemList, setProblemList] = useAtom(problemListAtom);

  const { data, mutate, status } = useCompetitionDetailMutation(
    Number(competitionId)
  );
  useEffect(() => {
    mutate();
  }, [competitionId, mutate]);

  useEffect(() => {
    if (data) {
      const newCompetition = data.result;
      setCompetition(newCompetition);
    }
  }, [data]);

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

  const { title: compeTitle, startDateTime, endDateTime, teamId } = competition;

  const { timeLeft, timerVisible } = useCompetitionTimer(
    startDateTime,
    endDateTime
  );

  // algorithm-solving/${competitionId}?teamId=123&problemId=123
  const handleMoveToAlgorithmSolving = () => {
    if (problemIds && timerVisible) {
      navigate(
        `/algorithm-solving/${competitionId}?teamId=${teamId}&problemId=${problemList[0]}`
      );
    }
  };

  if (status === "pending" && problemStatus === "pending")
    return <div>...Loading</div>;

  return (
    <S.WaitingCardWrapper>
      <S.WaitingCardBox
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <S.WaitingCardImage
          objectFit="cover"
          maxW={{ base: "100%", sm: "20rem" }}
          src="/images/restImage.gif"
          alt="Caffe Latte"
        />
        <S.WaitingCardStack>
          <S.WaitingCardBody>
            <S.WaitingCardHeading size="md">{compeTitle}</S.WaitingCardHeading>
            <S.WaitingCardHeading size="md">{title}</S.WaitingCardHeading>
            <S.WaitingCardSubHeading size="md">
              [ {subTitle} ]
            </S.WaitingCardSubHeading>
            <S.WaitingCardTextWrapper>
              {content.map((indexContent) => (
                <S.WaitingCardText key={indexContent.num}>
                  <p>{indexContent.num}</p> {indexContent.content}
                </S.WaitingCardText>
              ))}
            </S.WaitingCardTextWrapper>
            <S.WaitingCardButton
              disabled={!timerVisible}
              variant="solid"
              colorScheme="blue"
              onClick={handleMoveToAlgorithmSolving}
            >
              {timeLeft}
            </S.WaitingCardButton>
          </S.WaitingCardBody>
        </S.WaitingCardStack>
      </S.WaitingCardBox>
    </S.WaitingCardWrapper>
  );
};
