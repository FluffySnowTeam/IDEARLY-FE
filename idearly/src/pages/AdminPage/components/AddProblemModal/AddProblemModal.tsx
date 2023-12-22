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
import { useAtom } from "jotai";
import { testCaseDataAtom } from "../../../../store";

export const AddProblemModal = ({
  isOpen,
  onClose,
}: PropsWithChildren<IAddProblemModal>) => {
  // 테스트 케이스 모달탕에 문제 추가 기능 추가 , 문제 제목 & 문제 설명 통째로 받고 + competitionId

  // + 문제를 1개씩만 업데이트 가능
  // + 해당 문제의 테스트 케이스 추가 가능
  /**
   * competitionId,
   * {
   *   inputValue(string), hidden 여부(boolean), answer(string)
   * },
   *
   */
  const [testCaseData, setTestCaseList] = useAtom(testCaseDataAtom);

  const handleClose = () => {
    setTestCaseList([]); // testCaseDataAtom 초기화
    onClose(); // 원래의 onClose 함수 호출
  };

  const handleSubmit = () => {
    console.log(testCaseData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>문제 리스트</ModalHeader>
        <ModalCloseButton onClick={handleClose} />

        {/* 대회 문제리스트 */}
        <ProblemList />
        <ModalHeader>테스트 케이스 추가</ModalHeader>

        {/* 테스트케이스 관리 */}
        <AddTestCase />
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue">
            수정사항 저장하기
          </Button>
          <Button variant="ghost" ml={3} onClick={handleClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
