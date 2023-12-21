import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { teamCreate } from "../services/apis/teamMatching.apis";

interface IProp {
  competitionId: string, 
  payload: any
}
export const useTeamMatchingMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: ({competitionId, payload}: IProp) => teamCreate(competitionId, payload),

    onError: (error) => {
      console.error(error);
      toast({
        title: "팀 생성 실패",
        description: "팀 이름이 중복됩니다. 다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "팀 매칭 성공!",
        description: "팀을 생성하였습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });
};
