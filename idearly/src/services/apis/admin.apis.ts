import { IPayload } from "../../hooks/useAdminCompetitionMutation";
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

export const addTestCase = async (problemId: number, testcase: IPayload) => {
  const response = await axiosInstance.post(
    `/api/admin/create-testcase/${problemId}`,
    testcase
  );
  return response.data;
};

// 아직 데이터 형식 전달 x
export const getUserList = async () => {
  const response = await axiosInstance.get("/api/admin/members");
  return response;
};

export const getCompetitionData = async () => {
  const response = await axiosInstance.get("/api/competitions");
  return response;
};

export const getCompetitionProblems = async (competitionId: number) => {
  const response = await axiosInstance.get(
    `/api/admin/competitions/${competitionId}/problems`
  );
  return response;
};
