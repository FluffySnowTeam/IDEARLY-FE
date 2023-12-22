import * as S from "./WaitingPage.styles";
import { WaitingPageConfig } from "../../constants";
import { useParams } from "react-router-dom";
import { fakeCompetitions } from "../../mocks/competition.mocks";
import { useCompetitionTimer } from "../../hooks";

export const WaitingPage = () => {
  const { title, subTitle, content } = WaitingPageConfig;
  const { id } = useParams<{ id: string }>();

  // 특정 대회 정보 상세 추후 실제 데이터로 변경
  const selectedCompetition = fakeCompetitions.filter(
    (competition) => competition.competitionId === Number(id)
  );
  const {
    title: compeTitle,
    startDateTime,
    endDateTime,
  } = selectedCompetition[0] || {};
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
