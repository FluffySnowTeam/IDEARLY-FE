import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { ICompetitionInfoList } from "./CompetitionInfoList.styles";
import { useNavigate } from "react-router-dom";

export const CompetitionInfoList = ({
  competition,
  onOpen,
}: PropsWithChildren<ICompetitionInfoList>) => {
  const { competitionId, title, startDateTime } = competition;
  const navigate = useNavigate();

  const handleModalOpen = () => {
    navigate(`/admin/competition?id=${competitionId}`);
    onOpen();
  };

  return (
    <Tbody>
      <Tr>
        <Td>{competitionId}</Td>
        <Td>{title}</Td>
        <Td>{startDateTime}</Td>
        <Td>
          <Button onClick={handleModalOpen}>문제 수정</Button>
        </Td>
      </Tr>
    </Tbody>
  );
};
