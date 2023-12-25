import { Table, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import * as S from "./MyPageCurrentTeam.styles";
import { CurrentTeamList, TeamDetailModal, TeamModifyModal, WaitingTeamList } from "./components";
import { MyPageCurrentTeamConfig } from "../../../../constants/MyPage.constants";
import type { ITeamMember } from "./MyPageCurrentTeam.types";
import { useEffect, useState } from "react";
import { useGetCurrentTeamQuery, useGetWaitTeamQuery, useTeamInfoQuery } from "../../../../hooks/useMyPageMutation";
import { useAtom, useAtomValue } from "jotai";
import { curTeamAtom, userInfoAtom, waitTeamAtom } from "../../../../store";

export const MyPageCurrentTeam = () => {
  const { competitionName, teamName, leaderName, date, manage, choose} = MyPageCurrentTeamConfig;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {data: curTeamData} = useGetCurrentTeamQuery();
  const {data: waitTeamData} = useGetWaitTeamQuery();

  const [curTeam, setCurTeam] = useAtom(curTeamAtom);
  const [waitTeam, setWaitTeam] = useAtom(waitTeamAtom);

  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);
  
  // curretMembers를 쪼개서 현재 맴버 / 수락 대기 중인 맴버 변수 만들기
  console.log("teamMembers: ", teamMembers);
  const currentMemberList: ITeamMember[] = teamMembers.filter(member => member.inviteStatus === "accept");
  const inviteMemberList: ITeamMember[] = teamMembers.filter(member => member.inviteStatus === "invite");

  const [teamId, setTeamId] = useState(0);
  const [isClick, setIsClick] = useState(false);

  const {data: memberData, status, error, isInitialLoading} = useTeamInfoQuery(isClick, teamId);
  
  const userInfo = useAtomValue(userInfoAtom);

  // 참가 대회 소속팀 / 대기중인 초대 현황 정보 불러오기
  useEffect(() => {
    if(curTeamData) {
      setCurTeam(curTeamData.data.teams);
    }
  }, [curTeamData])

  useEffect(() => {
    if(waitTeamData) {
      setWaitTeam(waitTeamData.data.teams);
    }
  }, [waitTeamData])

  const onClickTeamDetail = (teamId: number) => {
    // 현재 팀 목록에서 팀 상세보기 클릭 시!
    setIsClick(true);
    setTeamId(teamId);
    // 모달창에 들어가는 정보 업데이트
    setTeamMembers(memberData.data.teammates);
  }
  if (isInitialLoading) {
    return <div>...Loadin1</div>;
  }

  if (status === "error") {
    console.log(error);
  }

  return (
    <S.SearchTeamWrapper>
      {
        memberData?.data.leaderEmail === userInfo.email
        ? <TeamModifyModal isOpen={isOpen} onClose={onClose} currentMemberList={currentMemberList} inviteMemberList={inviteMemberList} />
        : <TeamDetailModal isOpen={isOpen} onClose={onClose} currentMemberList={currentMemberList} inviteMemberList={inviteMemberList} />
      }
      
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
              curTeam.map((competition) => (
                <CurrentTeamList key={competition.competitionId} competition={competition} onOpen={onOpen} onClickTeamDetail={onClickTeamDetail} />
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
              waitTeam.map((competition) => (
                <WaitingTeamList key={competition.competitionId} competition={competition} />
              ))
            }
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

    </S.SearchTeamWrapper>
  )
}
