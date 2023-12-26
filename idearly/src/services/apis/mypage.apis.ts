import { axiosInstance } from "./axios";

// 회원 탈퇴 요청
export const withdrawalUser = async () => {
  return await axiosInstance.delete("/api/members");
};

// 회원 정보 수정 요청
export const modifyUser = async (name: string) => {
  const response = await axiosInstance.patch("/api/members", { name });
  return response.data;
};

// 현재 팀 조회 - 참가 대회 소속팀 조회 요청 // 사용자 팀 정보 조회 - 이미 수락된 팀
export const getCurrentTeam = async () => {
  const response = await axiosInstance.get("/api/teams?invite=false");
  return response.data;
};

// 현재 팀 조회 - 대기중인 초대 현황 조회 요청 // 사용자 팀 정보 조회 - 초대 상태인 팀
export const getWaitTeam = async () => {
  const response = await axiosInstance.get("/api/teams?invite=true");
  return response.data;
};

// 팀 초대 요청 수락 / 거절
export const handleInvite = async (teamId: number, isAccept: boolean) => {
  const resposne = await axiosInstance.post(`/api/teams/${teamId}`, {
    accept: isAccept,
  });
  return resposne.data;
};

// 특정 팀 정보 조회
export const getTeamInfo = async (teamId: number) => {
  const response = await axiosInstance.get(`/api/teams/${teamId}`);
  return response.data;
};

// 팀원 수정 요청
export const ModifyTeamMembers = async (teamId: number, payload: any) => {
  console.log("payload 확인:", payload);
  const response = await axiosInstance.patch(`api/teams/${teamId}`, payload);
  return response.data;
};
