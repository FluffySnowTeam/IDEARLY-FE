import { Table, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import * as S from "./MyPageCurrentTeam.styles";
import { curCompetition, TeamMembers } from "../../../../mocks/curCompetition.mocks";
import { CurrentTeamList, TeamModifyModal, WaitingTeamList } from "./components";
import { MyPageCurrentTeamConfig } from "../../../../constants/MyPage.constants";
import type { ITeamMember } from "./MyPageCurrentTeam.types";

export const MyPageCurrentTeam = () => {
  const { competitionName, teamName, leaderName, date, manage, choose} = MyPageCurrentTeamConfig;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // curretMembers를 쪼개서 현재 맴버 / 수락 대기 중인 맴버 변수 만들기
  const currentMemberList: ITeamMember[] = TeamMembers.teammates.filter(member => member.inviteStatus === "accept");
  const inviteMemberList: ITeamMember[] = TeamMembers.teammates.filter(member => member.inviteStatus === "invite");

  return (
    <S.SearchTeamWrapper>
      {/* <TeamDetailModal isOpen={isOpen} onClose={onClose} currentMemberList={currentMemberList} inviteMemberList={inviteMemberList} /> */}
      <TeamModifyModal isOpen={isOpen} onClose={onClose} currentMemberList={currentMemberList} inviteMemberList={inviteMemberList} />
      
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
                <CurrentTeamList key={competition.competitionId} competition={competition} onOpen={onOpen} />
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
                <WaitingTeamList key={competition.competitionId} competition={competition} />
              ))
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

    </S.SearchTeamWrapper>
  )
}
