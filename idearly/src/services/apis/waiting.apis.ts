import { axiosInstance } from "./axios";

export const getCompetitionProblemIds = async (competitionId: number) => {
  const response = await axiosInstance.get(
    `/api/competitions/${competitionId}/problems`
  );
  return response.data;
};
