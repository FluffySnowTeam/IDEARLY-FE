import { Button } from "@chakra-ui/react";
import { WaitingPageConfig } from "../../constants";

export const WaitingPage = () => {
  // const [restTime, setRestTime] = useState("00:00");
  const { title, subTitle } = WaitingPageConfig;
  // const isCompetitionOpen = restTime === "00:00";
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
