import { Table, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import * as S from "./MyPageCurrentTeam.styles";
import {
  CurrentTeamList,
  TeamDetailModal,
  TeamModifyModal,
  WaitingTeamList,
} from "./components";
import { MyPageCurrentTeamConfig } from "../../../../constants/MyPage.constants";
import type { ITeamMember } from "./MyPageCurrentTeam.types";
import { useEffect, useState } from "react";
import {
  useGetCurrentTeamQuery,
  useGetWaitTeamQuery,
  useTeamInfoQuery,
} from "../../../../hooks/useMyPageMutation";
import { useAtom, useAtomValue } from "jotai";
import { curTeamAtom, userInfoAtom, waitTeamAtom } from "../../../../store";

export const MyPageCurrentTeam = () => {
  const { competitionName, teamName, leaderName, date, manage, choose } =
    MyPageCurrentTeamConfig;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userInfo = useAtomValue(userInfoAtom);
  const [curTeam, setCurTeam] = useAtom(curTeamAtom);
  const [waitTeam, setWaitTeam] = useAtom(waitTeamAtom);

  const [teamId, setTeamId] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([]);

  const {
    data: curTeamData,
    status: curTeamStatus,
    error: curTeamError,
  } = useGetCurrentTeamQuery();
  const {
    data: waitTeamData,
    status: waitTeamStatus,
    error: waitTeamError,
  } = useGetWaitTeamQuery();
  const {
    data: teamInfoData,
    error: teamInfoError,
    isLoading,
  } = useTeamInfoQuery(isClick, teamId);

  // 참가 대회 소속팀 / 대기중인 초대 현황 정보 불러오기
  useEffect(() => {
    if (curTeamStatus === "success" && curTeamData) {
      setCurTeam(curTeamData.result);
    }
  }, [curTeamData, curTeamStatus]);

  useEffect(() => {
    if (waitTeamStatus === "success" && waitTeamData) {
      setWaitTeam(waitTeamData.result);
    }
  }, [waitTeamData, waitTeamStatus]);

  useEffect(() => {
    if (teamInfoData) {
      setTeamMembers(teamInfoData.result.teammates);
      console.log("teamMembers: ", teamMembers);
      setCurrentMemberList(
        teamInfoData.result.teammates.filter(
          (member: any) => member.inviteStatus === "invite"
        )
      );
      setInviteMemberList(
        teamInfoData.result.teammates.filter(
          (member: any) => member.inviteStatus === "accept"
        )
      );
    }
  }, [teamInfoData]);

  const [currentMemberList, setCurrentMemberList] = useState<ITeamMember[]>(
    teamMembers.filter((member: any) => member.inviteStatus === "invite")
  );
  const [inviteMemberList, setInviteMemberList] = useState<ITeamMember[]>(
    teamMembers.filter((member: any) => member.inviteStatus === "accept")
  );

  console.log(
    "currentMemberList: ",
    currentMemberList,
    "inviteMemberList: ",
    inviteMemberList
  );
  console.log("cur: ", curTeam, "waitTeam: ", waitTeam);

  const onClickTeamDetail = (teamId: number) => {
    setTeamId(teamId);
    setIsClick(true);
    onOpen();
  };

  if (curTeamStatus === "pending" || waitTeamStatus === "pending" || isLoading)
    return <p>Loading...</p>;
  if (curTeamError || waitTeamError || teamInfoError) return <p>Error</p>;

  return (
    <S.SearchTeamWrapper>
      {teamInfoData?.result.leaderEmail === userInfo.email ? (
        <TeamModifyModal
          isOpen={isOpen}
          onClose={onClose}
          currentMemberList={currentMemberList}
          setCurrentMemberList={setCurrentMemberList}
          inviteMemberList={inviteMemberList}
          setInviteMemberList={setInviteMemberList}
          teamId={teamId}
          competitionId={teamInfoData.result.competitionId}
        />
      ) : (
        <TeamDetailModal
          isOpen={isOpen}
          onClose={onClose}
          currentMemberList={currentMemberList}
          inviteMemberList={inviteMemberList}
        />
      )}

      <S.SearchTeamTitle>현재 팀 조회</S.SearchTeamTitle>
      <S.SearchTeamSubTitle>참가 대회 소속팀</S.SearchTeamSubTitle>
      <S.SearchTeamTableContainer>
        <Table variant="simple">
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
            {curTeam.map((competition) => (
              <CurrentTeamList
                key={competition.competitionId}
                competition={competition}
                onClickTeamDetail={onClickTeamDetail}
              />
            ))}
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>

      <S.SearchTeamSubTitle>대기 중인 초대 현황</S.SearchTeamSubTitle>
      <S.SearchTeamTableContainer>
        <Table variant="simple">
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
            {waitTeam.map((competition) => (
              <WaitingTeamList
                key={competition.competitionId}
                competition={competition}
              />
            ))}
          </Tbody>
        </Table>
      </S.SearchTeamTableContainer>
    </S.SearchTeamWrapper>
  );
};
