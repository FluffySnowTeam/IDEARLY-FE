import { axiosInstance } from "./axios";

// 회원 탈퇴 요청
export const withdrawalUser = async () => {
  return await axiosInstance.delete("/api/members");
}

// 회원 정보 수정 요청
export const modifyUser = async (name: string) => {
  return await axiosInstance.patch("/api/members", name);
}
