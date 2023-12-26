import type { CompetitionRequest, ICompetitionProblem } from "../../types";
import type { ITestCaseRequest } from "../../types/admin.types";
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

export const addTestCase = async (
  problemId: number,
  testcase: ITestCaseRequest[]
) => {
  const response = await axiosInstance.post(
    `/api/admin/create-testcase/${problemId}`,
    testcase
  );
  return response.data;
};
