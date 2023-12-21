import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCompetitionDetail,
  getCompetitions,
} from "../services/apis/competition.apis";

export const useCompetitionMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: () => getCompetitionDetail(competitionId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCompetitionQuery = () => {
  const {
    data: competitionData,
    status,
    error,
  } = useQuery({
    queryKey: ["competition"],
    queryFn: getCompetitions,
    staleTime: 2 * 60 * 1000,
  });
  return { competitionData, status, error };
};
