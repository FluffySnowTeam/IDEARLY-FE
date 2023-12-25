import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { modifyUser, withdrawalUser } from "../services/apis/mypage.apis";
import { userInfoAtom } from "../store";

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
      console.log("check: ", data);
      console.log("check: ", data.data.data.name);

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
