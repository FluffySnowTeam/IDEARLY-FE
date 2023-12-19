import { PropsWithChildren } from "react";
import * as S from "./CompetitionCard.styles";
import type { ICompetitionCard } from "./CompetitionsCard.types";
import { useNavigate } from "react-router-dom";

export const CompetitionsCard = ({
  competition,
}: PropsWithChildren<ICompetitionCard>) => {
  const { competitionId, title, startDateTime, endDateTime } = competition;
  const navigate = useNavigate();

  const handleMoveToWaiting = () => {
    // 만약 대회에 소속된 팀이 있다면
    navigate(`/waiting/${competitionId}`);
    // 만약 대회에 소속된 팀이 있다면 없다면?
    // navigate(`/waiting/${id}`);
  };

  // 대회 데이터 아이디로 수정해야함
  const handleMoveToDetail = () => {
    navigate(`/detail/${competitionId}`);
  };

  return (
    <S.CompeCardContainer
      spacing={6}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <S.CompeCardBox>
        <img src="/images/trophy.jpg" />
        <S.CompeCardBody>
          <S.CompeCardHeading size="md">{title}</S.CompeCardHeading>
          <S.CompeText>대회 시작: {startDateTime}</S.CompeText>
          <S.CompeText>대회 종료: {endDateTime}</S.CompeText>
          <S.CardDetailButton onClick={handleMoveToDetail}>
            대회 상세보기
          </S.CardDetailButton>
          <S.CompeCardButton onClick={handleMoveToWaiting}>
            대회 참가하기
          </S.CompeCardButton>
        </S.CompeCardBody>
      </S.CompeCardBox>
    </S.CompeCardContainer>
  );
};
