import { Button, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IWaitingCompetitionProp } from "../../MyPageCurrentTeam.types";
import { dateChange } from "../../../../../../utils/dateChange";
import * as S from "./WaitingTeamList.styles";
import { useHandleInviteMutation } from "../../../../../../hooks/useMyPageMutation";
import { waitTeamAtom } from "../../../../../../store";
import { useAtom } from "jotai";

export const WaitingTeamList = ({
  competition,
}: PropsWithChildren<IWaitingCompetitionProp>) => {
  const {
    teamId,
    competitionId,
    competitionTitle,
    teamName,
    leaderName,
    startDateTime,
  } = competition;
  const { mutate } = useHandleInviteMutation();
  const [waitTeam, setWaitTeam] = useAtom(waitTeamAtom);

  const handleSuccess = () => {
    const accetedTeam = waitTeam.filter((team) => team.teamId == teamId)[0];
    setWaitTeam((prev) => prev.filter((team) => team.teamId !== teamId));
    try {
      mutate({ teamId, isAccept: true });
    } catch {
      setWaitTeam((prev) => [...prev, accetedTeam]);
    }
  };

  const handleReject = () => {
    setWaitTeam((prev) => prev.filter((team) => team.teamId !== teamId));
    mutate({ teamId, isAccept: false });
  };

  return (
    <Tr key={competitionId}>
      <Td>{competitionTitle}</Td>
      <Td>{teamName}</Td>
      <Td>{leaderName}</Td>
      <Td>{dateChange({ date: startDateTime })}</Td>
      <Td>
        <S.ButtonGroup>
          <Button onClick={handleSuccess} colorScheme="green">
            수락
          </Button>
          <Button onClick={handleReject} colorScheme="red">
            거절
          </Button>
        </S.ButtonGroup>
      </Td>
    </Tr>
  );
};
