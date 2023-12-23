import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { LoginStateAtom } from "../store/LoginPage.atoms";
import { getCWaitTeam, getCurrentTeam, modifyUser, withdrawalUser } from "../services/apis/mypage.apis";
import { userInfoAtom } from "../store";

export const useWithdrawalMutation = () => {
  const setIsLoginState = useSetAtom(LoginStateAtom);
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
      setIsLoginState(false);
      setUserInfoState({
        memberId: '',
        email: '',
        name: '',
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

      // 이 부분도 storage에 저장해야되겠죠?
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
