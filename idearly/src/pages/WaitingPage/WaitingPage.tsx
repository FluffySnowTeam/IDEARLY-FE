import * as S from "./WaitingPage.styles";
import { WaitingPageConfig } from "../../constants";
import { useParams } from "react-router-dom";
import { fakeCompetitions } from "../../mocks/competition.mocks";
import { useEffect, useState } from "react";

export const WaitingPage = () => {
  const { title, subTitle } = WaitingPageConfig;
  const { id } = useParams<{ id: string }>();
  const [timeLeft, setTimeLeft] = useState("");

  // 특정 대회 정보 상세
  const selectedCompetition = fakeCompetitions.filter(
    (competition) => competition.competitionId === id
  );

  const [timerVisible, setTimerVisible] = useState(false);

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
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <S.WaitingCardStack>
          <S.WaitingCardBody>
            <S.WaitingCardHeading size="md">
              대회 시작 전 주의사항
            </S.WaitingCardHeading>

            <S.WaitingCardText py="2">
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </S.WaitingCardText>
          </S.WaitingCardBody>

          <S.WaitingCardFooter>
            <S.WaitingCardButton
              timerVisible={timerVisible}
              variant="solid"
              colorScheme="blue"
            >
              {timeLeft}
            </S.WaitingCardButton>
          </S.WaitingCardFooter>
        </S.WaitingCardStack>
      </S.WaitingCardBox>
    </S.WaitingCardWrapper>
  );
};
