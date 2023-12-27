import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCompetitionDetail,
  getCompetitions,
} from "../services/apis/competition.apis";
import { getCompetitionProblemIds } from "../services/apis/waiting.apis";

export const useCompetitionDetailMutation = (competitionId: number) => {
  return useMutation({
    mutationFn: () => getCompetitionDetail(competitionId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("error", error);
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

//ICompetitionProblemIds
export const useCompetitionProblemIdsMutation = () => {
  return useMutation({
    mutationFn: (competitionId: number) =>
      getCompetitionProblemIds(competitionId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });
};
