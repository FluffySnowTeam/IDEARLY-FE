import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { ICompetitionInfoList } from "./CompetitionInfoList.styles";
import { useNavigate } from "react-router-dom";

export const CompetitionInfoList = ({
  competition,
  onOpen,
}: PropsWithChildren<ICompetitionInfoList>) => {
  const { id, title, date } = competition;
  const navigate = useNavigate();

  const handleModalOpen = () => {
    navigate(`/admin/competition?id=${id}`);
    onOpen();
  };

  return (
    <Tbody>
      <Tr>
        <Td>{id}</Td>
        <Td>{title}</Td>
        <Td>{date}</Td>
        <Td>
          <Button onClick={handleModalOpen}>문제 수정</Button>
        </Td>
      </Tr>
    </Tbody>
  );
};
