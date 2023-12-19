import * as S from "./WaitingPage.styles";
import { WaitingPageConfig } from "../../constants";
import { useParams } from "react-router-dom";
import { fakeCompetitions } from "../../mocks/competition.mocks";
import { useEffect, useState } from "react";

export const WaitingPage = () => {
  const { title, subTitle, content } = WaitingPageConfig;
  const { id } = useParams<{ id: string }>();
  const [timeLeft, setTimeLeft] = useState("");
  const [timerVisible, setTimerVisible] = useState(false);

  // 특정 대회 정보 상세
  const selectedCompetition = fakeCompetitions.filter(
    (competition) => competition.competitionId === id
  );

  useEffect(() => {
    if (!selectedCompetition) return;
    const { startDateTime, endDateTime } = selectedCompetition[0];
    const startLocal = new Date(
      new Date(startDateTime).getTime() + new Date().getTimezoneOffset() * 60000
    );
    const endLocal = new Date(
      new Date(endDateTime).getTime() + new Date().getTimezoneOffset() * 60000
    );

    const updateTimer = () => {
      const now = new Date();

      if (now >= endLocal) {
        setTimeLeft("대회가 종료되었습니다.");
        setTimerVisible(false);
      } else if (now >= startLocal) {
        const elapsedSeconds = Math.floor(
          (now.getTime() - startLocal.getTime()) / 1000
        );
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const remainingSeconds = elapsedSeconds % 60;
        setTimeLeft(`대회시작 ${elapsedMinutes}분 ${remainingSeconds}초 경과`);
        setTimerVisible(true);
      } else {
        const diff = startLocal.getTime() - now.getTime();
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`대회시작 ${minutes}분 ${seconds}초 전`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [selectedCompetition]);

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
            <S.WaitingCardHeading size="md">{title}</S.WaitingCardHeading>
            <S.WaitingCardSubHeading size="md">
              [ {subTitle} ]
            </S.WaitingCardSubHeading>
            <S.WaitingCardText
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br />"),
              }}
            ></S.WaitingCardText>
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
