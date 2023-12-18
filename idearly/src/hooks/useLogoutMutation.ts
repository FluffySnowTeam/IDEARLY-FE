import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/apis/user.apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logoutUser(),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "로그아웃 완료",
        description: "로그아웃 완료되었습니다.",
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
