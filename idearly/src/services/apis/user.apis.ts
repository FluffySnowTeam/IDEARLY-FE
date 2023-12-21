import type { IUserRequest } from "../../types";
import { axiosInstance } from "./axios";

// 회원가입 요청
export const registerUser = async (payload: IUserRequest) => {
  const response = await axiosInstance.post("/api/signup", payload);
  return response.data;
};

// 이메일 중복 체크 요청
export const checkEmailDuplication = async (payload: string) => {
  const response = await axiosInstance.get(
    `api/signup/email-check?email=${payload}`
  );
  return response.data;
};

// 로그인 요청
export const loginUser = async (payload: IUserRequest) => {
  return await axiosInstance.post("/api/login", payload);
};

// 로그아웃 요청
export const logoutUser = async () => {
  return await axiosInstance.post("/api/logout");
};
