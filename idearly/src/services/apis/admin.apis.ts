import type { CompetitionRequest } from "../../types";
import { axiosInstance } from "./axios";

export const addCompetition = async (payload: CompetitionRequest) => {
  const response = await axiosInstance.post(
    "/api/admin/create-competition",
    payload
  );
  return response.data;
};
