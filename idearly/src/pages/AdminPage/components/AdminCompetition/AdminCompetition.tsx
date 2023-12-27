import { Table, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import * as S from "./AdminCompetition.styles";
import { AdminCompePageConfig } from "../../../../constants";
import { CompetitionInfoList } from "./components";
import { Pagination } from "../../../../components";
import { useEffect, useState } from "react";
import { AddProblemModal, AddTestCaseModal } from "..";
import { AddCompetitionModal } from "../AddCompetitionModal/AddCompetitionModal";
import { useAdminCompetitionList } from "../../../../hooks/useAdminCompetitionMutation";
import type { ICompetitionResponse } from "../../../../types/admin.types";
import { AddIcon } from "@chakra-ui/icons";

export const AdminCompetition = () => {
  const { id, name, date, edit } = AdminCompePageConfig;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const startIdx = currentPage * itemsPerPage;
  const endIdx = (currentPage + 1) * itemsPerPage;
  const {
    isOpen: isTestcodeModalOpen,
    onOpen: onTestcodeModalOpen,
    onClose: onTestcodeModalClose,
  } = useDisclosure();
  const {
    isOpen: isCompetitionModalOpen,
    onOpen: onCompetitionModalOpen,
    onClose: onCompetitionModalClose,
  } = useDisclosure();
  const {
    isOpen: isProblemModalOpen,
    onOpen: onProblemModalOpen,
    onClose: onProblemModalClose,
  } = useDisclosure();

  const [competitionList, setCompetitionList] =
    useState<ICompetitionResponse[]>();
  const { data, status, error } = useAdminCompetitionList();

  useEffect(() => {
    if (data) {
      setCompetitionList(data.data.result);
      console.log(data.data.result);
    }
  }, [data]);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <S.AdminCompeContainer>
      <AddProblemModal
        isOpen={isProblemModalOpen}
        onClose={onProblemModalClose}
      />
      <AddTestCaseModal
        isOpen={isTestcodeModalOpen}
        onClose={onTestcodeModalClose}
      />
      <AddCompetitionModal
        isOpen={isCompetitionModalOpen}
        onClose={onCompetitionModalClose}
      />
      <S.AdminCompeTitleBox>
        <S.AdminCompeTitle>대회 정보 리스트</S.AdminCompeTitle>
        <S.AdminCompeAddButton
          onClick={onCompetitionModalOpen}
          colorScheme="facebook"
        >
          <AddIcon mr="2" />
          대회 추가하기
        </S.AdminCompeAddButton>
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
            {/**
             * competitionList
             */}
            {competitionList &&
              competitionList
                .slice(startIdx, endIdx)
                .map((competition) => (
                  <CompetitionInfoList
                    key={competition.competitionId}
                    competition={competition}
                    onTestcodeOpen={onTestcodeModalOpen}
                    onProblemlOpen={onProblemModalOpen}
                  />
                ))}
          </Table>
        </S.AdminTableContainer>
      </S.AdminCompeTableContainer>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        dataLength={competitionList ? competitionList.length : 0}
      />
    </S.AdminCompeContainer>
  );
};
