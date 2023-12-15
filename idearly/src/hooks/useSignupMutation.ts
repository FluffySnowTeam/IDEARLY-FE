import { useMutation } from "@tanstack/react-query";
import {
  checkEmailDuplication,
  registerUser,
} from "../services/apis/user.apis";
import { IUserSignupRequest } from "../types";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (userInfo: IUserSignupRequest) => registerUser(userInfo),
    onError: (error) => {
      console.error(error);
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
