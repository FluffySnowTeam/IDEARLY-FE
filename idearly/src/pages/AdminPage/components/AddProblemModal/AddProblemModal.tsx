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
import { AddProblem } from "./components/AddProblem/AddProblem";

export interface IAddProblemModal {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProblemModal = ({
  isOpen,
  onClose,
}: PropsWithChildren<IAddProblemModal>) => {
  //   const [problemData, setProblemData] = useAtom(problemDataAtom);

  const handleClose = () => {
    // setProblemData([]);
    onClose();
  };

  const handleSubmit = () => {
    // console.log(problemData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {/* 문제 리스트 불러오고 그 안에서 하나를 선택하면 쿼리스트링으로 문제id state에 저장*/}
        <ModalHeader>문제 추가하기</ModalHeader>
        <ModalCloseButton onClick={handleClose} />

        <AddProblem />
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue">
            저장하기
          </Button>
          <Button variant="ghost" ml={3} onClick={handleClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
