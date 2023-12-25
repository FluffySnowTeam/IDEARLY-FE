import { useMutation } from "@tanstack/react-query";
import { executeTest, submitCode } from "../services/apis/algorithm.apis";
import { useSetAtom } from "jotai";
import { testResultAtom } from "../store/Algorithm.atoms";

interface IExecuteTest {
  competitionId: string | undefined,
  problemId: string | null,
  code: string | undefined,
}

export const useExcuteTestMutation = () => {
  const setTestResult = useSetAtom(testResultAtom); // 여기다가 저장해서 AlgorithmResult에 보여주기
  return useMutation({
    mutationFn: ({competitionId, problemId, code}: IExecuteTest) => executeTest(competitionId, problemId, code),
    onSuccess: (data) => {
      // 컴파일 결과 보여주기
      console.log('컴파일 결과:', data);
    },
    onError: (error) => {
      console.log('에러: ', error);
    },
  })
}

export const useRunMutation = () => {
  return useMutation({
    mutationFn: ({competitionId, problemId, code}: IExecuteTest) => submitCode(competitionId, problemId, code),
    onSuccess: (data) => {
      // 컴파일 결과 보여주기
      console.log('제출 결과:', data);
    },
    onError: (error) => {
      console.log('에러: ', error);
    },
  })
}
