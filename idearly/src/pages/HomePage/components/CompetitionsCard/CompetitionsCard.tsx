import { PropsWithChildren } from "react";
import * as S from "./CompetitionCard.styles";
import type { ICompetitionCard } from "./CompetitionsCard.types";
import { useNavigate } from "react-router-dom";

export const CompetitionsCard = ({
  competition,
}: PropsWithChildren<ICompetitionCard>) => {
  const { id, title, subTitle, date } = competition;
  const navigate = useNavigate();

  // 유저정보에서 팀이 존재할 경우
  const handleMoveToAlgorithm = () => {
    navigate(`/algorithm-solving/${id}`);
  };

  // 유저정보에서 팀이 존재하지 않을 경우
  //   const handleRedirectPage = () => {
  //     navigate("/matching");
  //   };

  return (
    <S.CompeCardContainer
      spacing={6}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <S.CompeCardBox>
        <img src="/images/trophy.jpg" />
        <S.CompeCardBody>
          <S.CompeCardHeading size="md">{title}</S.CompeCardHeading>
          <S.CompeText>{subTitle}</S.CompeText>
          <S.CompeText>대회 시작일: {date}</S.CompeText>
          <S.CompeCardButton onClick={handleMoveToAlgorithm}>
            대회 참가하기
          </S.CompeCardButton>
        </S.CompeCardBody>
      </S.CompeCardBox>
    </S.CompeCardContainer>
  );
};
