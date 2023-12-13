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
  // 1. 음성채팅 / 채팅 자동 참가
  // 2. competition id로 이동 경로 params 전달
  const handleMoveToAlgorithm = () => {
    // 만약 유저가 해당 대회의 소속된 팀 데이터가 없다면
    // navigate("/matching");
    // '2023.12.15 / 18:00' 형식의 날짜 문자열을 Date 객체로 변환
    const dateParts = date.split(" / "); // ['2023.12.15', '18:00']
    const [year, month, day] = dateParts[0].split(".").map(Number); // ['2023', '12', '15']
    const [hours, minutes] = dateParts[1].split(":").map(Number); // ['18', '00']

    const competitionDate = new Date(year, month - 1, day, hours, minutes); // JavaScript의 월은 0부터 시작합니다

    const now = new Date();

    // 현재 시간이 대회 시작 시간보다 이전이면 대기 페이지로 이동, 아니면 상세 페이지로 이동
    if (now < competitionDate) {
      navigate(`/waiting/${id}`);
    } else {
      navigate(`/algorithm-solving/${id}`);
    }
  };

  // 대회 데이터 아이디로 수정해야함
  const handleMoveToDetail = () => {
    navigate(`/detail/${id}`);
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
          <S.CompeText>{subTitle}</S.CompeText>
          <S.CompeText>대회 시작일: {date}</S.CompeText>
          <S.CardDetailButton onClick={handleMoveToDetail}>
            대회 상세보기
          </S.CardDetailButton>
          <S.CompeCardButton onClick={handleMoveToAlgorithm}>
            대회 참가하기
          </S.CompeCardButton>
        </S.CompeCardBody>
      </S.CompeCardBox>
    </S.CompeCardContainer>
  );
};
