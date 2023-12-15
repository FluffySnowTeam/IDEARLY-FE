import { Button } from "@chakra-ui/react";
import { WaitingPageConfig } from "../../constants";

export const WaitingPage = () => {
  const { title, subTitle } = WaitingPageConfig;
  // const navigate = useNavigate();

  // 대회 데이터 요청 필요

  // 유저정보에서 팀이 존재할 경우
  // 1. 음성채팅 / 채팅 자동 참가
  // 2. competition id로 이동 경로 params 전달
  // const handleMoveToAlgorithm = () => {
  // '2023.12.15 / 18:00' 형식의 날짜 문자열을 Date 객체로 변환
  // const dateParts = date.split(" / ");
  // const [year, month, day] = dateParts[0].split(".").map(Number);
  // const [hours, minutes] = dateParts[1].split(":").map(Number);

  // const competitionDate = new Date(year, month - 1, day, hours, minutes);
  // const now = new Date();

  // 현재 시간이 대회 시작 시간보다 이전이면 대기 페이지로 이동, 아니면 상세 페이지로 이동
  //   if (now < competitionDate) {
  //     navigate(`/waiting/${id}`);
  //   } else {
  //     navigate(`/algorithm-solving/${id}`);
  //   }
  // };

  return (
    <div>
      <div>
        <div>{title}</div>
        <div>{subTitle}</div>
        <div>
          <Button>주의사항</Button>
          <Button>대회 입장</Button>
          {/* {isCompetitionOpen ? (
          ) : (
            <Button>대회 시작까지 {restTime}</Button>
          )} */}
        </div>
      </div>
      <div></div>
    </div>
  );
};
