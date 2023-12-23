import * as S from "./WaitingPage.styles";
import { WaitingPageConfig } from "../../constants";
import { useCompetitionTimer } from "../../hooks";
import { useAtomValue } from "jotai";
import { competitionDataAtom } from "../../store";

export const WaitingPage = () => {
  const { title, subTitle, content } = WaitingPageConfig;
  const competition = useAtomValue(competitionDataAtom);

  const { title: compeTitle, startDateTime, endDateTime } = competition;

  const { timeLeft, timerVisible } = useCompetitionTimer(
    startDateTime,
    endDateTime
  );

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
