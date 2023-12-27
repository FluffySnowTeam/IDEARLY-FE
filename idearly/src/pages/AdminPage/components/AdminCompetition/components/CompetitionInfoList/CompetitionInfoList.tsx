import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { ICompetitionInfoList } from "./CompetitionInfoList.styles";
import { useNavigate } from "react-router-dom";
import { dateChange } from "../../../../../../utils/dateChange";

export const CompetitionInfoList = ({
  competition,
  onTestcodeOpen,
  onProblemlOpen,
}: PropsWithChildren<ICompetitionInfoList>) => {
  const { competitionId, title, startDateTime, endDateTime } = competition;
  const navigate = useNavigate();

  const handleTestcaseModalOpen = () => {
    navigate(`/admin/competition?competitionId=${competitionId}`);
    onTestcodeOpen();
  };

  const handleProblemModalOpen = () => {
    navigate(`/admin/competition?competitionId=${competitionId}`);
    onProblemlOpen();
  };

  return (
    <Tbody>
      <Tr>
        <Td>{competitionId}</Td>
        <Td>{title}</Td>
        <Td>
          {dateChange({ date: startDateTime })} ~
          {dateChange({ date: endDateTime })}
        </Td>
        <Td>
          <Button
            onClick={handleProblemModalOpen}
            colorScheme="facebook"
            mr="2"
          >
            문제 추가
          </Button>
          <Button onClick={handleTestcaseModalOpen} colorScheme="facebook">
            테스트케이스 추가
          </Button>
        </Td>
      </Tr>
    </Tbody>
  );
};
