import { Button, Td, Tr } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { IWaitingCompetitionProp } from "../../MyPageCurrentTeam.types"
import { dateChange } from "../../../../../../utils/dateChange"
import * as S from "./WaitingTeamList.styles";
import { useHandleInviteMutation } from "../../../../../../hooks/useMyPageMutation";

export const WaitingTeamList = ({competition}: PropsWithChildren<IWaitingCompetitionProp>) => {
  const {teamId, competitionId, competitionTitle, teamName, leaderName, startDateTime} = competition;

  const {mutate} = useHandleInviteMutation();
  const handleSuccess = () => {
    mutate({teamId, isAccept: true});
  }

  const handleReject = () => {
    mutate({teamId, isAccept: false});
  }
  return (
    <Tr key={competitionId}>
      <Td>{competitionTitle}</Td>
      <Td>{teamName}</Td>
      <Td>{leaderName}</Td>
      <Td>{dateChange({ date: startDateTime })}</Td>
      <Td>
        <S.ButtonGroup>
          <Button onClick={handleSuccess}>수락</Button>  
          <Button onClick={handleReject}>거절</Button>  
        </S.ButtonGroup>
      </Td>
    </Tr>
  )
}
