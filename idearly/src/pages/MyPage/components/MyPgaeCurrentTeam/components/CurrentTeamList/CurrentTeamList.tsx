import { Button, Td, Tr } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { dateChange } from "../../../../../../utils/dateChange"
import { ICompetitionProp } from "../../MyPageCurrentTeam.types"

export const CurrentTeamList = ({competition}: PropsWithChildren<ICompetitionProp>) => {
  return (
    <Tr key={competition.competitionId}>
      <Td>{competition.competitionTitle}</Td>
      <Td>{competition.teamName}</Td>
      <Td>{competition.leaderName}</Td>
      <Td>{dateChange({ date: competition.startDateTime })}</Td>
      <Td>
        <Button>상세 보기</Button>  
      </Td>
    </Tr>
  )
}