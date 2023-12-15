import { useMutation } from "@tanstack/react-query";
import {
  checkEmailDuplication,
  registerUser,
} from "../services/apis/user.apis";
import { IUserSignupRequest } from "../types";
import { useNavigate } from "react-router-dom";

export const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userInfo: IUserSignupRequest) => registerUser(userInfo),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      navigate("/login");
      console.log(data);
    },
  });
};

//수정될 수 있음
export const useEmailCheckMutation = () => {
  return useMutation({
    mutationFn: (userEmail: { email: string }) =>
      checkEmailDuplication(userEmail),
    onError: (error) => {
      console.error(error);
    },
  });
};
