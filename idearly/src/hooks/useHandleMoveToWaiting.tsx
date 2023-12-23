import { ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICompetition {
  competitionId: number;
  title: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
  login: boolean;
  participate: boolean;
  teamId: number;
  teamName: string;
}

const useHandleMoveToWaiting = (competition: ICompetition) => {
  // 추후 실제 데이터로 변경
  const { competitionId, startDateTime, participate } = competition;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const handleMoveToWaiting = useCallback(() => {
    // 만약 대회에 소속된 팀이 있다면
    const now = new Date();
    const startDate = new Date(startDateTime);

    now.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    // if (startDate.getTime() === now.getTime()) {
    // 만약 대회 날짜가 오늘이면
    navigate(`/waiting/${competitionId}`);
    // } else if (participate === false) {
    //   navigate("/matching");
    // } else {
    //   // 대회 날짜가 오늘이 아니면 모달 표시
    //   onOpen();
    //   setOverlay(<OverlayOne />);
    // }

    // 만약 대회에 소속된 팀이 없다면?
    // navigate(`/matching`);
  }, [navigate, competitionId, startDateTime, participate, onOpen, setOverlay]);

  return { isOpen, onClose, overlay, handleMoveToWaiting };
};

export default useHandleMoveToWaiting;
