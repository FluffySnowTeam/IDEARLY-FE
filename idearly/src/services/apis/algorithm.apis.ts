import { axiosInstance } from "./axios";

// 테스트 실행 요청
export const executeTest = async (
  competitionId: string | undefined,
  problemId: string | null,
  code: string | undefined
) => {
  console.log(
    "[API] competitionId: ",
    competitionId,
    "problemId: ",
    problemId,
    "code: ",
    code
  );
  const response = await axiosInstance.post(
    `/api/competitions/${competitionId}/problems/${problemId}/test`,
    {
      code,
      language: "PYTHON",
    }
  );
  return response.data;
};

export const submitCode = async (
  competitionId: string | undefined,
  problemId: string | null,
  code: string | undefined
) => {
  const response = await axiosInstance.post(
    `/api/competitions/${competitionId}/problems/${problemId}`,
    {
      code,
      language: "PYTHON",
    }
  );
  return response.data;
};

export const getAlgorithmProblem = async (
  competitionId: number,
  problemId: number
) => {
  const response = await axiosInstance.get(
    `/api/competitions/${competitionId}/problems/${problemId}?language=PYTHON`
  );
  return response;
};
