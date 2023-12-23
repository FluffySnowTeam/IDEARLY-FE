import { axiosInstance } from "./axios";

// 팀 생성 요청
export const teamCreate = async (competitionId: string, payload: any) => {
  return await axiosInstance.post(`/api/competitions/${competitionId}`, payload);
}

// 이메일로 회원 조회 -> 이 코드 user.api.ts로 옮기는게 좋을까요?
export const searchMember = async (competitionId: string, email: string) => {
  return await axiosInstance.get(`/api/competitions/${competitionId}/members?email=${email}`);
}