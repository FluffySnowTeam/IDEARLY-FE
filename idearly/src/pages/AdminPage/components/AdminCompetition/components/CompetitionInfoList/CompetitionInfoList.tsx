import { Button, Tbody, Td, Tr } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { ICompetitionInfoList } from "./CompetitionInfoList.styles";

export const CompetitionInfoList = ({
  competition,
  onOpen,
}: PropsWithChildren<ICompetitionInfoList>) => {
  const { id, title, date } = competition;
  return (
    <Tbody>
      <Tr>
        <Td>{id}</Td>
        <Td>{title}</Td>
        <Td>{date}</Td>
        <Td>
          <Button onClick={onOpen}>문제 수정</Button>
        </Td>
      </Tr>
    </Tbody>
  );
};
