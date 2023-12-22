import { useMutation } from "@tanstack/react-query";
import { IUserRequest } from "../types";
import { loginUser } from "../services/apis/user.apis";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { LoginStateAtom } from "../store/LoginPage.atoms";
import { userInfoAtom } from "../store";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const setIsLoginState = useSetAtom(LoginStateAtom);
  const setUserInfoState = useSetAtom(userInfoAtom);

  return useMutation({
    mutationFn: (userInfo: IUserRequest) => loginUser(userInfo),
    onError: (error) => {
      console.error(error);
      toast({
        title: "로그인 실패",
        description: "다시 시도해주세요.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data.result);
      // 로그인 상태 업데이트
      setIsLoginState(true);
      setUserInfoState(data.data.result);
      toast({
        title: "로그인 성공!",
        description: "로그인에 성공하였습니다!",
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
