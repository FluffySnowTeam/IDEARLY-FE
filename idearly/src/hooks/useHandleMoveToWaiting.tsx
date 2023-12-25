import { ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ICompetition } from "../types";

const useHandleMoveToWaiting = (competition?: ICompetition) => {
  const defaultCompetition = {
    competitionId: 0,
    title: "",
    startDateTime: "",
    endDateTime: "",
    description: "",
    login: false,
    participate: false,
    teamId: 0,
    teamName: "",
  };
  const { competitionId, startDateTime, participate } =
    competition || defaultCompetition;
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

    navigate(`/waiting/${competitionId}`);
    // if (participate === false) {
    //   navigate("/matching");
    // }
  }, [navigate, competitionId, startDateTime, participate, onOpen, setOverlay]);

  return { isOpen, onClose, overlay, handleMoveToWaiting };
};

export default useHandleMoveToWaiting;
