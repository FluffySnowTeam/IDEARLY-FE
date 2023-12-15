import { useMutation } from "@tanstack/react-query";
import { IUserRequest } from "../types";
import { loginUser } from "../services/apis/user.apis";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (userInfo: IUserRequest) => loginUser(userInfo),
    onError: (error) => {
      console.error(error);
    },
  });
};
