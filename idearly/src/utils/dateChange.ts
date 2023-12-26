export const dateChange = ({ date }: { date: string }) => {
  // 날짜 문자열의 유효성을 확인합니다.
  if (!date) {
    return "유효하지 않은 날짜";
  }

  // JavaScript의 Date 객체를 사용하여 날짜를 파싱합니다 (UTC 기준).
  const dateObj = new Date(date);

  // 한국 시간(KST, UTC+9)으로 조정합니다.
  dateObj.setHours(dateObj.getHours() + 9);

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

const getYear = (dateObj: Date) => {
  return dateObj.getUTCFullYear();
};
const getMonth = (dateObj: Date) => {
  return (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
};
const getDay = (dateObj: Date) => {
  return dateObj.getUTCDate().toString().padStart(2, "0");
};
const getHour = (dateObj: Date) => {
  return dateObj.getUTCHours().toString().padStart(2, "0");
};
const getMinutes = (dateObj: Date) => {
  return dateObj.getUTCMinutes().toString().padStart(2, "0");
};

export const mainDate = ({ date }: { date: string }) => {
  // 날짜 문자열의 유효성을 확인합니다.
  if (!date) {
    return "유효하지 않은 날짜";
  }
  const dateObj = new Date(date);
  return `${getYear(dateObj)}년 ${getMonth(dateObj)}월 ${getDay(
    dateObj
  )}일 ${getHour(dateObj)}시${getMinutes(dateObj)}분`;
};

export const chatDate = ({ date }: { date: string }) => {
  // 날짜 문자열의 유효성을 확인합니다.
  if (!date) {
    return "유효하지 않은 날짜";
  }

  const dateObj = new Date(date);

  // 한국 시간(KST, UTC+9)으로 조정합니다.
  dateObj.setHours(dateObj.getHours() + 9);

  // 시간과 분을 추출합니다
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  // 변환된 날짜 형식을 반환합니다.
  return `${hours}:${minutes}`;
};

export const formDateChange = ({ date }: { date: string }) => {
  const regex = /^\d{8}\/\d{4}$/;
  // 입력된 문자열이 정규 표현식과 일치하는지 검사
  if (!regex.test(date)) {
    alert("날짜 형식이 올바르지 않습니다. 올바른 형식: YYYYMMDD/HHMM");
    return;
  }
  // 입력된 날짜와 시간을 분리합니다.
  const [datePart, timePart] = date.split("/");

  // 날짜와 시간을 YYYY-MM-DD와 HH:MM:SS 포맷으로 변환합니다.
  const year = datePart.substring(0, 4);
  const month = datePart.substring(4, 6);
  const day = datePart.substring(6, 8);
  const hour = timePart.substring(0, 2);
  const minute = timePart.substring(2, 4);

  // 변환된 포맷을 합쳐서 반환합니다.
  return `${year}-${month}-${day}T${hour}:${minute}:00`;
};
