import { Button, Td, Tr } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { ICompetitionProp } from "../../MyPageCurrentTeam.types"
import { dateChange } from "../../../../../../utils/dateChange"
import * as S from "./WaitingTeamList.styles";

export const WaitingTeamList = ({competition}: PropsWithChildren<ICompetitionProp>) => {
  return (
    <Tr key={competition.competitionId}>
      <Td>{competition.competitionTitle}</Td>
      <Td>{competition.teamName}</Td>
      <Td>{competition.leaderName}</Td>
      <Td>{dateChange({ date: competition.startDateTime })}</Td>
      <Td>
        <S.ButtonGroup>
          <Button>수락</Button>  
          <Button>거절</Button>  
        </S.ButtonGroup>
      </Td>
    </Tr>
  )
}
