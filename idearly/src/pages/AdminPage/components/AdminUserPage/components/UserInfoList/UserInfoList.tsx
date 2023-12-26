import { Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IUserInfoList } from "./UserInfoList.types";
import * as S from "./UserInfoList.styles";

export const UserInfoList = ({
  userInfo,
}: PropsWithChildren<IUserInfoList>) => {
  const { memberId, name, email, competitionTitleList, teamIdList } = userInfo;
  const competitionStr = competitionTitleList.join(", "); // 쉼표로 구분하여 합치기
  const teamStr = teamIdList.join(", "); // 쉼표로 구분하여 합치기
  return (
    <Tbody>
      {/**
             * 실제 데이터로 변경하기 userList!!!
             * {
             * competitionIdList: number;
              competitionTitleList: string[];
              email: string;
              memberId: number;
              name: string;
              teamIdList: number[];
              teamNameList: string[];
             * }
             */}
      <Tr>
        <Td>{memberId}</Td>
        <Td>{name}</Td>
        <Td>{email}</Td>
        <S.WrapTextTd>{competitionStr}</S.WrapTextTd>
        <S.WrapTextTd>{teamStr}</S.WrapTextTd>
      </Tr>
    </Tbody>
  );
};
