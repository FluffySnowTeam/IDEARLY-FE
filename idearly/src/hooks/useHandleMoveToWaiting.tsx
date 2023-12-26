import { useCallback } from "react";
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

  const handleMoveToWaiting = useCallback(() => {
    if (participate === false) {
      navigate(`/matching/${competitionId}`);
    } else {
      navigate(`/waiting/${competitionId}`);
    }
  }, [navigate, competitionId, startDateTime, participate]);

  return { handleMoveToWaiting };
};

export default useHandleMoveToWaiting;
