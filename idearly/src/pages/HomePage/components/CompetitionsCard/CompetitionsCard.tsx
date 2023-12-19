import { PropsWithChildren, useState } from "react";
import * as S from "./CompetitionCard.styles";
import type { ICompetitionCard } from "./CompetitionsCard.types";
import { useNavigate } from "react-router-dom";
import { CompetitionsModal } from "../CompetitionsModal/CompetitionsModal";
import { ModalOverlay, useDisclosure } from "@chakra-ui/react";

export const CompetitionsCard = ({
  competition,
}: PropsWithChildren<ICompetitionCard>) => {
  const { competitionId, title, startDateTime, endDateTime } = competition;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const handleMoveToWaiting = () => {
    // 만약 대회에 소속된 팀이 있다면
    const now = new Date();
    const startDate = new Date(startDateTime);

    now.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    if (startDate.getTime() === now.getTime()) {
      // 만약 대회 날짜가 오늘이면
      navigate(`/waiting/${competitionId}`);
    } else {
      // 대회 날짜가 오늘이 아니면 모달 표시
      onOpen();
      setOverlay(<OverlayOne />);
    }

    // 만약 대회에 소속된 팀이 없다면?
    // navigate(`/matching`);
  };

  // 대회 데이터 아이디로 수정해야함
  const handleMoveToDetail = () => {
    navigate(`/detail/${competitionId}`);
  };

  return (
    <>
      <CompetitionsModal
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        startDateTime={startDateTime}
      />
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
    </>
  );
};
