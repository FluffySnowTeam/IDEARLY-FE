import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import * as S from "./MyPageCurrentTeam.styles";
import { curCompetition } from "../../../../mocks/curCompetition.mocks";
import { CurrentTeamList, WaitingTeamList } from "./components";

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
              curCompetition.map((competition) => {
                return (
                  <CurrentTeamList competition={competition} />
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
              curCompetition.map((competition) => {
                return (
                  <WaitingTeamList competition={competition} />
                )
              })
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

    </S.SearchTeamWrapper>
  )
}
