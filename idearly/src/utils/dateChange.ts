export const dateChange = ({ date }: { date: string }) => {
  // 날짜 문자열의 유효성을 확인합니다.
  if (!date) {
    return "유효하지 않은 날짜";
  }

  // JavaScript의 Date 객체를 사용하여 날짜를 파싱합니다 (UTC 기준).
  const dateObj = new Date(date);

  // 연도, 월, 일을 추출합니다 (UTC 기준).
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");

  // 시간과 분을 추출합니다 (UTC 기준).
  const hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  // 변환된 날짜 형식을 반환합니다.
  return `${year}년 ${month}월 ${day}일 ${hours}시${minutes}분`;
};
