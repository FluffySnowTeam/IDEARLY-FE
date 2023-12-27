import { Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IUserInfoList } from "./UserInfoList.types";
import * as S from "./UserInfoList.styles";

export const UserInfoList = ({
  userInfo,
}: PropsWithChildren<IUserInfoList>) => {
  const { memberId, name, email, competitionTitleList, teamIdList } = userInfo;
  const teamStr = teamIdList.join(", ");
  return (
    <Tbody>
      <Tr>
        <Td>{memberId}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        <S.WrapTextTd>
          {competitionTitleList.map((title, index) => (
            <Text key={index}>◆ {title}</Text>
          ))}
        </S.WrapTextTd>
        <S.WrapTextTd>{teamStr}</S.WrapTextTd>
      </Tr>
    </Tbody>
  );
};
