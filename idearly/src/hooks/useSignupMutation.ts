import { useMutation } from "@tanstack/react-query";
import {
  checkEmailDuplication,
  registerUser,
} from "../services/apis/user.apis";
import { IUserSignupRequest } from "../types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { EmailCheckAtom } from "../store/LoginPage.atoms";

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: (userInfo: IUserSignupRequest) => registerUser(userInfo),
    onError: (error) => {
      console.error(error);
      toast({
        title: "회원가입 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "회원가입 성공!",
        description: "회원가입에 성공하였습니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
  });
};

export const useEmailCheckMutation = () => {
  const toast = useToast();
  const setIsEmailCheck = useSetAtom(EmailCheckAtom);

  return useMutation({
    mutationFn: (userEmail: string) => checkEmailDuplication(userEmail),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      const isDuplicate = data?.result?.duplicate;
      setIsEmailCheck(isDuplicate);
      const toastMessage = isDuplicate
        ? "이메일이 중복되었습니다."
        : "이메일 중복 확인 성공";
      const toastStatus = isDuplicate ? "error" : "success";
      toast({
        title: toastMessage,
        description: toastMessage,
        status: toastStatus,
        duration: 2000,
        isClosable: true,
      });
    },
  });
};
