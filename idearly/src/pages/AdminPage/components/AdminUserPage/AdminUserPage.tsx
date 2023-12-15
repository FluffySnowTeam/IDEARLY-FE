import { Select, Table, Th, Thead, Tr } from "@chakra-ui/react";
import * as S from "./AdminUserPage.styles";
import { UserInfoList } from "./components";
import { fakeUserInfo } from "../../../../mocks/adminUserInfo.mocks";

export const AdminUserPage = () => {
  return (
    <S.AdminUserContainer>
      <S.AdminUserTitleBox>
        <S.AdminUserTitle>회원 정보 리스트</S.AdminUserTitle>
        <S.AdminUserSelect>
          <Select>
            <option>이름순</option>
          </Select>
        </S.AdminUserSelect>
      </S.AdminUserTitleBox>
      <S.AdminUserTableContainer>
        <S.AdminTableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>유저 ID</Th>
                <Th>참가자 이름</Th>
                <Th>이메일</Th>
                <Th>참가 대회</Th>
                <Th>참가 팀</Th>
              </Tr>
            </Thead>
            {fakeUserInfo.map((userInfo) => (
              <UserInfoList key={userInfo.id} userInfo={userInfo} />
            ))}
          </Table>
        </S.AdminTableContainer>
      </S.AdminUserTableContainer>
    </S.AdminUserContainer>
  );
};
