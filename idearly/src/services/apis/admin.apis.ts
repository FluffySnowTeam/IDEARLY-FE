import type { CompetitionRequest, ICompetitionProblem } from "../../types";
import { axiosInstance } from "./axios";

export const addCompetition = async (payload: CompetitionRequest) => {
  const response = await axiosInstance.post(
    "/api/admin/create-competition",
    payload
  );
  return response.data;
};

export const addProblem = async (
  competitionId: number,
  payload: ICompetitionProblem
) => {
  const response = await axiosInstance.post(
    `/api/admin/create-problem/${competitionId}`,
    payload
  );
  return response.data;
};
