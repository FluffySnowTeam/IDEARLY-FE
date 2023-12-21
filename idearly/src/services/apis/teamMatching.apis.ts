import { axiosInstance } from "./axios";

// 팀 생성 요청
export const teamCreate = async (competitionId: string, payload: any) => {
  return await axiosInstance.post(`/api/competitions/${competitionId}`, payload);
}

// 이메일로 회원 조회
export const searchMember = async (email: string) => {
  return axiosInstance.get(`/api/members?email=${email}`);
}