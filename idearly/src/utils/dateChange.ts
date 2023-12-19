export const dateChange = ({ date }: { date: string }) => {
  // JavaScript의 Date 객체를 사용하여 날짜를 파싱합니다.
  const dateObj = new Date(date);

  // 연도, 월, 일을 추출합니다.
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  // 시간과 분을 추출합니다.
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  // 변환된 날짜 형식을 반환합니다.
  return `${year}.${month}.${day} / ${hours}:${minutes}`;
};
