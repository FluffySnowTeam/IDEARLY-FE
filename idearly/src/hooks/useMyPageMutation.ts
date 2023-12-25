import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { useAtom, useSetAtom } from "jotai";
import { handleInvite, getCWaitTeam, getCurrentTeam, modifyUser, withdrawalUser, getTeamInfo } from "../services/apis/mypage.apis";
import { curTeamAtom, userInfoAtom, waitTeamAtom } from "../store";

export const useWithdrawalMutation = () => {
  const setUserInfoState = useSetAtom(userInfoAtom);

  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: () => withdrawalUser(),
    onError: (error) => {
      console.error(error);
      toast({
        title: "회원 탈퇴 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      // 로그인 상태 업데이트
      // setIsLoginState(false);
      setUserInfoState({
        memberId: '',
        email: '',
        name: '',
        isLogin: false,
      });
      toast({
        title: "회원 탈퇴 성공",
        description: "탈퇴에 성공하였습니다!",
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

export const useModifyUerMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const setUserInfoState = useSetAtom(userInfoAtom);

  return useMutation({
    mutationFn: (name: string) => modifyUser(name),
    onError: (error) => {
      console.error(error);
      toast({
        title: "회원 정보 수정 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log('check: ', data);
      console.log('check: ', data.data.data.name);

      setUserInfoState((prev) => ({ ...prev, name: data.data.data.name }));

      toast({
        title: "회원 정보 수정 성공",
        description: "회원 정보 수정에 성공하였습니다!",
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

export const useGetCurrentTeamQuery = () => {
  const {
    data,
    status,
    error,
  } = useQuery({
    queryKey: ["curTeam"],
    queryFn: getCurrentTeam,
    staleTime: 2 * 60 * 1000,
  });
  return { data, status, error };
};

export const useGetWaitTeamQuery = () => {
  const {
    data,
    status,
    error,
  } = useQuery({
    queryKey: ["waitTeam"],
    queryFn: getCWaitTeam,
    staleTime: 2 * 60 * 1000,
  });
  return { data, status, error };
};

interface IHandleInvite {
  teamId: number,
  isAccept: boolean,
}

export const useHandleInviteMutation = () => {
  const [curTeam, setCurTeam] = useAtom(curTeamAtom);
  const [waitTeam, setWaitTeam] = useAtom(waitTeamAtom);

  return useMutation({
    mutationFn: ({teamId, isAccept}: IHandleInvite) => handleInvite(teamId, isAccept),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      // 반환값을 보고, 이게 수락인지 거절인지 확인 후, 리스트에서 처리
      // 반환값에 해당 TeamId도 같이 건내주면 좋겠다!
      console.log('res: ', data);
      // 수락이라면, 대기현황에서 삭제, 현재 팀으로 이동
      // 거절이라면, 대기 현황에서 삭제
      if (data.data) {
        console.log('수락');
        // setCurTeam()
        // setWaitTeam()
      } else {
        console.log('거절');
        // setWaitTeam()
      }
    },
  });
};

export const useTeamInfoQuery = (teamId: number) => {
  const {
    data,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teamInfo", teamId],
    queryFn:() => getTeamInfo(teamId),
    staleTime: 2 * 1000,
  });
  return { data, status, error, refetch };
}