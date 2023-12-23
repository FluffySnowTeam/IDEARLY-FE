import { useState, useEffect } from "react";

export const useCompetitionTimer = (
  startDateTime: string,
  endDateTime: string
) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [timerVisible, setTimerVisible] = useState(false);

  // UTC 시간을 KST 시간으로 변환하는 함수
  const convertToKST = (utcDate) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 9); // UTC에서 KST(UTC+9)로 변환
    return date;
  };

  useEffect(() => {
    const startLocal = convertToKST(startDateTime);
    const endLocal = convertToKST(endDateTime);

    const updateTimer = () => {
      const now = new Date();
      if (now >= endLocal) {
        setTimeLeft("대회가 종료되었습니다.");
        setTimerVisible(false);
      } else if (now >= startLocal) {
        // 대회 시작 이후 경과 시간 계산
        const elapsed = Math.floor((now - startLocal) / 1000);
        const days = Math.floor(elapsed / 86400);
        const hours = Math.floor((elapsed % 86400) / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        setTimeLeft(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초 경과`);
        setTimerVisible(true);
      } else {
        // 대회 시작 전 남은 시간 계산
        const diff = startLocal - now;
        const days = Math.floor(diff / 1000 / 86400);
        const hours = Math.floor(((diff / 1000) % 86400) / 3600);
        const minutes = Math.floor(((diff / 1000) % 3600) / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초 전`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startDateTime, endDateTime]);

  return { timeLeft, timerVisible };
};
