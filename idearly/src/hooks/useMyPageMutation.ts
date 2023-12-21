import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { LoginStateAtom } from "../store/LoginPage.atoms";
import { withdrawalUser } from "../services/apis/mypage.apis";

export const useWithdrawalMutation = () => {
  const setIsLoginState = useSetAtom(LoginStateAtom);
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
