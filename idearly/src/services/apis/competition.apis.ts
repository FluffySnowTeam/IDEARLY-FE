import { axiosInstance } from "./axios";

// competiton 데이터 받아오기
export const getCompetitions = async () => {
  const response = await axiosInstance.get("/api/competitions");
  return response.data;
};

/**
// {
    "competitionId": 1,
    "title": "title1",
    "startDateTime": "2023-12-07T13:33:03.969Z",
    "endDateTime": "2023-12-08T13:33:03.969Z"
}[]
 */

// competition 상세 데이터 받아오기
// participate으로 참가 대회인지 여부 확인 가능
export const getCompetitionDetail = async (competitionId: number) => {
  const response = await axiosInstance.post(
    `/api/competitions/${competitionId}`
  );
  return response.data;
};

/**
 {
    "competitionId": 1,
    "title": "title1",
    "startDateTime": "2023-12-07T13:33:03.969Z",
    "endDateTime": "2023-12-08T13:33:03.969Z",
    "description": "대회 설명",
    "login": true,
    "participate": true,
    "teamId": 3231,
    "teamName": "팀명1"
  }
 */
