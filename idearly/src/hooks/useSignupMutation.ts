import { useMutation } from "@tanstack/react-query";
import {
  checkEmailDuplication,
  registerUser,
} from "../services/apis/user.apis";
import { IUserSignupRequest } from "../types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

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

  return useMutation({
    mutationFn: (userEmail: string) => checkEmailDuplication(userEmail),
    onError: (error) => {
      console.error(error);
      toast({
        title: "로그아웃 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "로그아웃 성공!",
        description: "로그아웃 성공ㅎㅎ",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });
};
