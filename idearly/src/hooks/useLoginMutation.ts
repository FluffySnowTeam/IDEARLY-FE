import { useMutation } from "@tanstack/react-query";
import { IUserRequest } from "../types";
import { loginUser } from "../services/apis/user.apis";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userInfo: IUserRequest) => loginUser(userInfo),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      navigate("/");
      console.log(data);
    },
  });
};
