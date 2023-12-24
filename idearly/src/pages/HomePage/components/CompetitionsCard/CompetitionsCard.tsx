import { PropsWithChildren } from "react";
import * as S from "./CompetitionCard.styles";
import type { ICompetitionCard } from "./CompetitionsCard.types";
import { useNavigate } from "react-router-dom";
import { CompetitionsModal } from "../CompetitionsModal/CompetitionsModal";
import { dateChange } from "../../../../utils/dateChange";
import useHandleMoveToWaiting from "../../../../hooks/useHandleMoveToWaiting";

export const CompetitionsCard = ({
  competition,
}: PropsWithChildren<ICompetitionCard>) => {
  const navigate = useNavigate();

  const { isOpen, onClose, overlay, handleMoveToWaiting } =
    useHandleMoveToWaiting(competition);

  // 대회 데이터 아이디로 수정해야함
  const handleMoveToDetail = () => {
    navigate(`/detail/${competition.competitionId}`);
  };

  return (
    <>
      <CompetitionsModal
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        startDateTime={competition.startDateTime}
      />
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
              대회 상세보기
            </S.CardDetailButton>
            <S.CompeCardButton onClick={handleMoveToWaiting}>
              대회 참가하기
            </S.CompeCardButton>
          </S.CompeCardBody>
        </S.CompeCardBox>
      </S.CompeCardContainer>
    </>
  );
};
