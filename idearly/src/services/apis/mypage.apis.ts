import { axiosInstance } from "./axios";

// 회원 탈퇴 요청
export const withdrawalUser = async () => {
  return await axiosInstance.delete("/api/members");
}

// 회원 정보 수정 요청
export const modifyUser = async (name: string) => {
  return await axiosInstance.patch("/api/members", {name});
}

// 현재 팀 조회 - 참가 대회 소속팀 조회 요청
export const getCurrentTeam = async () => {
  const response = await axiosInstance.get("/api/teams?invite=true");
  return response.data;
}

// 현재 팀 조회 - 대기중인 초대 현황 조회 요청
export const getCWaitTeam = async () => {
  const response = await axiosInstance.get("/api/teams?invite=false");
  return response.data;
}

// 팀 초대 요청 수락 / 거절
export const HandleInvite = async (teamId:number, isAccept: boolean) => {
  const resposne = await axiosInstance.post(`/api/teams/${teamId}`, {accept: isAccept});
  return resposne.data;
}