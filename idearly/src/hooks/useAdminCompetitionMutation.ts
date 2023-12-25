import { useMutation } from "@tanstack/react-query";
import { addCompetition } from "../services/apis/admin.apis";
import type { CompetitionRequest } from "../types";
import { useToast } from "@chakra-ui/react";

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
