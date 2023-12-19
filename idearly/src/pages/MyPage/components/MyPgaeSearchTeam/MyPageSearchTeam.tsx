import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import * as S from "./MyPageSearchTema.styles";
import { curCompetition } from "../../../../mocks/curCompetition.mocks";

export const MyPageSearchTeam = () => {
  return (
    <S.SearchTeamWrapper>
      <S.SearchTeamTitle>현재 팀 조회</S.SearchTeamTitle>
      <S.SearchTeamSubTitle>참가 대회 소속팀</S.SearchTeamSubTitle>
      <S.SearchTeamTableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>참가 대회</Th>
              <Th>팀명</Th>
              <Th>팀장</Th>
              <Th>대회 시작 날짜</Th>
              <Th>팀 관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              curCompetition.map((competiton) => {
                return (
                  <Tr key={competiton.competitionId}>
                    <Td>{competiton.competitionTitle}</Td>
                    <Td>{competiton.teamName}</Td>
                    <Td>{competiton.leaderName}</Td>
                    <Td>{competiton.startDateTime}</Td>
                    <Td>
                      <Button>상세 보기</Button>  
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>


      <S.SearchTeamSubTitle>대기 중인 초대 현황</S.SearchTeamSubTitle>
    </S.SearchTeamWrapper>
  )
}
