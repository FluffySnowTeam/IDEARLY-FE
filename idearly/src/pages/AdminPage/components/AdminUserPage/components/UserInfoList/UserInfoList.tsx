import { Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IUserInfo {
  id: string;
  name: string;
  email: string;
  competition: string[];
  team: string[];
}

interface IUserInfoList {
  userInfo: IUserInfo;
}

export const UserInfoList = ({
  userInfo,
}: PropsWithChildren<IUserInfoList>) => {
  const { id, name, email, competition, team } = userInfo;
  const competitionStr = competition.join(", "); // 쉼표로 구분하여 합치기
  const teamStr = team.join(", "); // 쉼표로 구분하여 합치기
  return (
    <Tbody>
      <Tr>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        <Td>{competitionStr}</Td>{" "}
        {/* competition 배열을 하나의 문자열로 변환하여 표시 */}
        <Td>{teamStr}</Td> {/* team 배열을 하나의 문자열로 변환하여 표시 */}
      </Tr>
    </Tbody>
  );
};
