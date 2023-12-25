import { Button, Td, Tr } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { dateChange } from "../../../../../../utils/dateChange"
import { ICompetitionProp } from "../../MyPageCurrentTeam.types"

export const CurrentTeamList = ({competition, onOpen, onClickTeamDetail}: PropsWithChildren<ICompetitionProp>) => {
  const {teamId, competitionId, competitionTitle, teamName, leaderName, startDateTime} = competition;
  
  const handleClick = () => {
    onClickTeamDetail!(teamId);
    onOpen!();
  }
  return (
    <Tr key={competitionId}>
      <Td>{competitionTitle}</Td>
      <Td>{teamName}</Td>
      <Td>{leaderName}</Td>
      <Td>{dateChange({ date: startDateTime })}</Td>
      <Td>
        <Button onClick={handleClick}>상세 보기</Button>  
      </Td>
    </Tr>
  )
}