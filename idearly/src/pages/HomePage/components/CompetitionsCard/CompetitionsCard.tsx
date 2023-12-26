import { PropsWithChildren } from "react";
import * as S from "./CompetitionCard.styles";
import type { ICompetitionCard } from "./CompetitionsCard.types";
import { useNavigate } from "react-router-dom";
import { dateChange } from "../../../../utils/dateChange";

export const CompetitionsCard = ({
  competition,
}: PropsWithChildren<ICompetitionCard>) => {
  const navigate = useNavigate();

  // 대회 데이터 아이디로 수정해야함
  const handleMoveToDetail = () => {
    navigate(`/detail/${competition.competitionId}`);
  };

  return (
    <>
      <S.CompeCardContainer
        spacing={6}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <S.CompeCardBox>
          <img src="/images/trophy.jpg" />
          <S.CompeCardBody>
            <S.CompeCardHeading size="md">
              {competition?.title}
            </S.CompeCardHeading>
            <S.CompeText>
              대회 시작: {dateChange({ date: competition?.startDateTime })}
            </S.CompeText>
            <S.CompeText>
              대회 종료: {dateChange({ date: competition?.endDateTime })}
            </S.CompeText>
            <S.CardDetailButton onClick={handleMoveToDetail}>
              대회 상세보기 및 참가하기
            </S.CardDetailButton>
          </S.CompeCardBody>
        </S.CompeCardBox>
      </S.CompeCardContainer>
    </>
  );
};
