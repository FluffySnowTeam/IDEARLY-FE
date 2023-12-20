import { Button, Td, Tr } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { ICompetitionProp } from "../../MyPageCurrentTeam.types"
import { dateChange } from "../../../../../../utils/dateChange"
import * as S from "./WaitingTeamList.styles";

export const WaitingTeamList = ({competition}: PropsWithChildren<ICompetitionProp>) => {
  const {competitionId, competitionTitle, teamName, leaderName, startDateTime} = competition;

  return (
    <Tr key={competitionId}>
      <Td>{competitionTitle}</Td>
      <Td>{teamName}</Td>
      <Td>{leaderName}</Td>
      <Td>{dateChange({ date: startDateTime })}</Td>
      <Td>
        <S.ButtonGroup>
          <Button>수락</Button>  
          <Button>거절</Button>  
        </S.ButtonGroup>
      </Td>
    </Tr>
  )
}
