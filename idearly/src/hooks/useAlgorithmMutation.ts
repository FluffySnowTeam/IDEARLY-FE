import { useMutation } from "@tanstack/react-query";
import {
  executeTest,
  getAlgorithmProblem,
  submitCode,
} from "../services/apis/algorithm.apis";
import { useSetAtom } from "jotai";
import { executeResultAtom, testResultAtom } from "../store/Algorithm.atoms";

interface IExecuteTest {
  competitionId: string | undefined;
  problemId: string | null;
  code: string | undefined;
}

export const useExcuteTestMutation = () => {
  const setTestResult = useSetAtom(testResultAtom);
  return useMutation({
    mutationFn: ({ competitionId, problemId, code }: IExecuteTest) =>
      executeTest(competitionId, problemId, code),
    onSuccess: (data) => {
      // 컴파일 결과 보여주기
      setTestResult(data.result.testcases);
      console.log("컴파일 결과:", data);
    },
    onError: (error) => {
      console.log("에러: ", error);
    },
  });
};

export const useRunMutation = () => {
  const setExecuteResult = useSetAtom(executeResultAtom);
  return useMutation({
    mutationFn: ({ competitionId, problemId, code }: IExecuteTest) =>
      submitCode(competitionId, problemId, code),
    onSuccess: (data) => {
      // 컴파일 결과 보여주기
      console.log("제출 결과:", data);
      setExecuteResult(data.result.testcases);
    },
    onError: (error) => {
      console.log("에러: ", error);
    },
  });
};

export const useAlgorithmProblem = () => {
  return useMutation({
    mutationFn: (problemId: number) => getAlgorithmProblem(problemId),
  });
};
