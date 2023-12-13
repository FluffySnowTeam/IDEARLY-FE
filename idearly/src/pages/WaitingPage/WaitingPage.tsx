import { Button } from "@chakra-ui/react";
import { WaitingPageConfig } from "../../constants";

export const WaitingPage = () => {
  const { title, subTitle } = WaitingPageConfig;

  return (
    <div>
      <div>
        <div>{title}</div>
        <div>{subTitle}</div>
        <div>
          <Button>주의사항</Button>
          <Button>대회 입장</Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};
