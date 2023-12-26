import { Select, Table, Th, Thead, Tr } from "@chakra-ui/react";
import * as S from "./AdminUserPage.styles";
import { UserInfoList } from "./components";
import { fakeUserInfo } from "../../../../mocks/adminUserInfo.mocks";
import { AdminUserPageConfig } from "../../../../constants";
import { Pagination } from "../../../../components";
import { useEffect, useState } from "react";
import { useAdminUserList } from "../../../../hooks/useAdminCompetitionMutation";

export const AdminUserPage = () => {
  const { id, name, email, competition, team } = AdminUserPageConfig;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const startIdx = currentPage * itemsPerPage;
  const endIdx = (currentPage + 1) * itemsPerPage;

  //
  const [userList, setUserList] = useState();
  const { data, status, error } = useAdminUserList();

  useEffect(() => {
    if (data) {
      setUserList(data.data);
      console.log(data.data);
    }
  }, [data]);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <S.AdminUserContainer>
      <S.AdminUserTitleBox>
        <S.AdminUserTitle>회원 정보 리스트</S.AdminUserTitle>
        <S.AdminUserSelect>
          <Select>
            <option>이름순 정렬</option>
            <option>이메일순 정렬</option>
            <option>대회명순 정렬</option>
          </Select>
        </S.AdminUserSelect>
      </S.AdminUserTitleBox>
      <S.AdminUserTableContainer>
        <S.AdminTableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{id}</Th>
                <Th>{name}</Th>
                <Th>{email}</Th>
                <Th>{competition}</Th>
                <Th>{team}</Th>
              </Tr>
            </Thead>
            {/**
             * 실제 데이터로 변경하기 userList!!!
             */}
            {fakeUserInfo.slice(startIdx, endIdx).map((userInfo) => (
              <UserInfoList key={userInfo.id} userInfo={userInfo} />
            ))}
          </Table>
        </S.AdminTableContainer>
      </S.AdminUserTableContainer>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        dataLength={fakeUserInfo.length}
      />
    </S.AdminUserContainer>
  );
};
