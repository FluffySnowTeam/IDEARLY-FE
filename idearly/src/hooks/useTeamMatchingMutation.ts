import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { searchMember, teamCreate } from "../services/apis/teamMatching.apis";

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

interface IProp2 {
  competitionId: string, 
  email: string,
}

export const useSearchMemberQuery = ({competitionId, email}: IProp2) => {
  const result = useQuery({
    queryKey: ['searchMember', competitionId, email],
    queryFn: () => searchMember(competitionId, email)
  });
  // 여기 log 찍으면 계속 나오는데, queryFn은 또 그게 아닌 것 같고... 아직 이해가 부족합니다. 
  // api 요청은 디바운스 및 캐싱이 적용되는 것 같아 보입니다.
  // 요 부분 잘 작성됐는지 확인 부탁드립니다!
  return result.data?.data.data;
};