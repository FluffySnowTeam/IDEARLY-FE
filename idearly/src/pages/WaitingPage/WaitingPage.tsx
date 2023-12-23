import * as S from "./WaitingPage.styles";
import { WaitingPageConfig } from "../../constants";
import { useCompetitionTimer } from "../../hooks";
import { useAtom } from "jotai";
import { competitionDataAtom } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCompetitionDetailMutation } from "../../hooks/useCompetitionMutation";

export const WaitingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { title, subTitle, content } = WaitingPageConfig;
  const [competition, setCompetition] = useAtom(competitionDataAtom);

  const { data, mutate, status } = useCompetitionDetailMutation(Number(id));
  useEffect(() => {
    mutate();
  }, [id, mutate]);

  useEffect(() => {
    if (data) {
      const newCompetition = data.result;
      setCompetition(newCompetition);
    }
  }, [data]);

  const { title: compeTitle, startDateTime, endDateTime } = competition;

  const { timeLeft, timerVisible } = useCompetitionTimer(
    startDateTime,
    endDateTime
  );

  if (status === "pending") return <div>...Loading</div>;

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
            >
              {timeLeft}
            </S.WaitingCardButton>
          </S.WaitingCardBody>
        </S.WaitingCardStack>
      </S.WaitingCardBox>
    </S.WaitingCardWrapper>
  );
};
