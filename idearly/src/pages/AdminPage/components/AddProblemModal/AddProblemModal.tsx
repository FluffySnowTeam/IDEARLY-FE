import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IAddProblemModal } from "./AddProblemModal.types";
import { AddTestCase, ProblemList } from "./components";

export const AddProblemModal = ({
  isOpen,
  onClose,
}: PropsWithChildren<IAddProblemModal>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>문제 리스트</ModalHeader>
        <ModalCloseButton />

        {/* 대회 문제리스트 */}
        <ProblemList />
        <ModalHeader>테스크 케이스 추가</ModalHeader>

        {/* 테스트케이스 관리 */}
        <AddTestCase />
        <ModalFooter>
          <Button colorScheme="blue">수정사항 저장하기</Button>
          <Button variant="ghost" ml={3} onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
