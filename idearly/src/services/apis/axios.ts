import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://your-api-domain.com",
  // 추후 서버 api 도메인으로 변경
});
