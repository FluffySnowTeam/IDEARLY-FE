import { Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IUserInfoList } from "./UserInfoList.types";
import * as S from "./UserInfoList.styles";

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
        <S.WrapTextTd>{competitionStr}</S.WrapTextTd>
        <S.WrapTextTd>{teamStr}</S.WrapTextTd>
      </Tr>
    </Tbody>
  );
};
