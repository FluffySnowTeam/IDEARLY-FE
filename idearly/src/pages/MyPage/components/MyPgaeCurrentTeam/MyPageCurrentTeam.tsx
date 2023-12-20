import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import * as S from "./MyPageCurrentTeam.styles";
import { curCompetition } from "../../../../mocks/curCompetition.mocks";
import { CurrentTeamList, WaitingTeamList } from "./components";
import { MyPageCurrentTeamConfig } from "../../../../constants/MyPage.constants";

export const MyPageCurrentTeam = () => {
  const { competitionName, teamName, leaderName, date, manage, choose} = MyPageCurrentTeamConfig;

  return (
    <S.SearchTeamWrapper>
      <S.SearchTeamTitle>현재 팀 조회</S.SearchTeamTitle>
      <S.SearchTeamSubTitle>참가 대회 소속팀</S.SearchTeamSubTitle>
      <S.SearchTeamTableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>{competitionName}</Th>
              <Th>{teamName}</Th>
              <Th>{leaderName}</Th>
              <Th>{date}</Th>
              <Th>{manage}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              curCompetition.map((competition) => (
                <CurrentTeamList competition={competition} />
              ))
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

      <S.SearchTeamSubTitle>대기 중인 초대 현황</S.SearchTeamSubTitle>
      <S.SearchTeamTableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>{competitionName}</Th>
              <Th>{teamName}</Th>
              <Th>{leaderName}</Th>
              <Th>{date}</Th>
              <Th>{choose}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              curCompetition.map((competition) => (
                <WaitingTeamList competition={competition} />
              ))
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

    </S.SearchTeamWrapper>
  )
}
