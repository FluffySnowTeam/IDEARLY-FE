import { Table, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import * as S from "./AdminCompetition.styles";
import { AdminCompePageConfig } from "../../../../constants";
import { CompetitionInfoList } from "./components";
import { fakeAllCompetitions } from "../../../../mocks/competition.mocks";
import { Pagination } from "../../../../components";
import { useState } from "react";
import { AddProblemModal } from "..";

export const AdminCompetition = () => {
  const { id, name, date, edit } = AdminCompePageConfig;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const startIdx = currentPage * itemsPerPage;
  const endIdx = (currentPage + 1) * itemsPerPage;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <S.AdminCompeContainer>
      <AddProblemModal isOpen={isOpen} onClose={onClose} />
      <S.AdminCompeTitleBox>
        <S.AdminCompeTitle>대회 정보 리스트</S.AdminCompeTitle>
      </S.AdminCompeTitleBox>
      <S.AdminCompeTableContainer>
        <S.AdminTableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>{id}</Th>
                <Th>{name}</Th>
                <Th>{date}</Th>
                <Th>{edit}</Th>
              </Tr>
            </Thead>
            {fakeAllCompetitions.slice(startIdx, endIdx).map((competition) => (
              <CompetitionInfoList
                key={competition.competitionId}
                competition={competition}
                onOpen={onOpen}
              />
            ))}
          </Table>
        </S.AdminTableContainer>
      </S.AdminCompeTableContainer>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        dataLength={fakeAllCompetitions.length}
      />
    </S.AdminCompeContainer>
  );
};
