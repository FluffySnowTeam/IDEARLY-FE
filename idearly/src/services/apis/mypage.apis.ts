import { axiosInstance } from "./axios";

// 회원 탈퇴 요청
export const withdrawalUser = async () => {
  return await axiosInstance.delete("/api/members");
}