import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://idearly.site",
  withCredentials: true,
});
