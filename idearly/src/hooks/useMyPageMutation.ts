import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { useAtomValue, useSetAtom } from "jotai";
import {
  handleInvite,
  getWaitTeam,
  getCurrentTeam,
  modifyUser,
  withdrawalUser,
  getTeamInfo,
  ModifyTeamMembers,
} from "../services/apis/mypage.apis";
import { curTeamAtom, userInfoAtom, waitTeamAtom } from "../store";
import { IReqTeamMember } from "../types";

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
      setUserInfoState({
        authority: "",
        memberId: "",
        email: "",
        name: "",
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
      console.log("check: ", data.result);
      console.log("check: ", data.result.name);

      setUserInfoState((prev) => ({ ...prev, name: data.result.name }));

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
  const { data, status, error } = useQuery({
    queryKey: ["curTeam"],
    queryFn: getCurrentTeam,
    staleTime: 5 * 1000,
  });
  return { data, status, error };
};

export const useGetWaitTeamQuery = () => {
  const { data, status, error } = useQuery({
    queryKey: ["waitTeam"],
    queryFn: getWaitTeam,
    staleTime: 5 * 1000,
  });
  return { data, status, error };
};

interface IHandleInvite {
  teamId: number;
  isAccept: boolean;
}

export const useHandleInviteMutation = () => {
  const setCurTeam = useSetAtom(curTeamAtom);
  const waitTeam = useAtomValue(waitTeamAtom);
  return useMutation({
    mutationFn: ({ teamId, isAccept }: IHandleInvite) =>
      handleInvite(teamId, isAccept),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      if (data.result.accept) {
        console.log("수락");
        const accetedTeam = waitTeam.filter(
          (team) => team.teamId == data.result.teamId
        )[0];
        setCurTeam((prev) => [...prev, accetedTeam]);
      } else {
        console.log("거절");
      }
    },
  });
};

export const useTeamInfoQuery = (isClick: boolean, teamId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["teamInfo", teamId],
    queryFn: () => getTeamInfo(teamId),
    enabled: isClick,
    staleTime: 2 * 60 * 1000,
  });
  return { data, error, isLoading };
};
interface ITeamMember {
  teamId: number;
  payload: IReqTeamMember[];
}
export const useModifyTeamMembersMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ teamId, payload }: ITeamMember) =>
      ModifyTeamMembers(teamId, payload),
    onError: (error) => {
      console.error(error);
      toast({
        title: "팀원 수정 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "팀원 수정 성공",
        description: "팀원 정보를 수정하였습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });
};
