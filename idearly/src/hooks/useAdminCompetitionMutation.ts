import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCompetition,
  addProblem,
  addTestCase,
  getCompetitionData,
  getCompetitionProblems,
  getUserList,
} from "../services/apis/admin.apis";
import type { CompetitionRequest, ICompetitionProblem } from "../types";
import { useToast } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { ITestCaseRequest } from "../types/admin.types";

export const useAdminCompetitionMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (competitionData: CompetitionRequest) =>
      addCompetition(competitionData),
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "대회 추가 성공!",
        description: "대회 정보가 성공적으로 추가되었습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "대회 추가 실패.. 저런",
        description: "다시 시도해보세요!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });
};

interface IuseAdminProblemMutation {
  competitionId: number;
  problemData: ICompetitionProblem;
}

export const useAdminProblemMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      competitionId,
      problemData,
    }: PropsWithChildren<IuseAdminProblemMutation>) =>
      addProblem(competitionId, problemData),
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "문제 추가 성공!",
        description: "문제 정보가 성공적으로 추가되었습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "문제 추가 실패.. 저런",
        description: "다시 시도해보세요!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });
};

export interface IuseAdminTestCaseMutation {
  problemId: number;
  payload: IPayload;
}

export type IPayload = {
  testcase: ITestCaseRequest[];
};

export const useAdminTestCaseMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ problemId, payload }: IuseAdminTestCaseMutation) =>
      addTestCase(problemId, payload),
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "테스트케이스 추가 성공!",
        description: "테스트케이스 정보가 성공적으로 추가되었습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "테스트케이스 추가 실패.. 저런",
        description: "다시 시도해보세요!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });
};

export const useAdminUserList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["userlist"],
    queryFn: getUserList,
  });
  return { data, status, error };
};

export const useAdminCompetitionList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["competitionList"],
    queryFn: getCompetitionData,
  });
  return { data, status, error };
};

export const useAdminCompetitionProblems = () => {
  return useMutation({
    mutationFn: (competitionId: number) =>
      getCompetitionProblems(competitionId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });
};
