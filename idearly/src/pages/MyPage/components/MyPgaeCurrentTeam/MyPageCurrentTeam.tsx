import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import * as S from "./MyPageCurrentTeam.styles";
import { curCompetition } from "../../../../mocks/curCompetition.mocks";
import { dateChange } from "../../../../utils/dateChange";

export const MyPageCurrentTeam = () => {
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
              <Th>대회 시작 일시</Th>
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
                    <Td>{dateChange({ date: competiton.startDateTime })}</Td>
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
      <S.SearchTeamTableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>참가 대회</Th>
              <Th>팀명</Th>
              <Th>팀장</Th>
              <Th>대회 시작 일시</Th>
              <Th>수락 / 거절</Th>
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
                    <Td>{dateChange({ date: competiton.startDateTime })}</Td>
                    <Td>
                      <S.ButtonGroup>
                        <Button>수락</Button>  
                        <Button>거절</Button>  
                      </S.ButtonGroup>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

    </S.SearchTeamWrapper>
  )
}
