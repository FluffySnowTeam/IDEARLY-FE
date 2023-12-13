import type { IUserRequest } from "../../types";
import { axiosInstance } from "./axios";

// 회원가입 요청 fetcher
export const registerUser = async (payload: IUserRequest) => {
  const response = await axiosInstance.post("/api/register", payload);
  return response.data; // 서버의 응답을 반환합니다.
};

export const checkEmailDuplication = async (payload: string) => {
  const response = await axiosInstance.post("/api/check-email", { payload });
  return response.data; // 여기서 서버의 응답을 반환합니다.
};
