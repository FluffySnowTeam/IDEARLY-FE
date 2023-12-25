import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { PropsWithChildren, useState } from "react";
import { AddProblem } from "./components/AddProblem/AddProblem";
import type { IAddProblemModal, IFormData } from "./AddProblemModal.types";
import { useAdminProblemMutation } from "../../../../hooks/useAdminCompetitionMutation";
import { useSearchParams } from "react-router-dom";

export const AddProblemModal = ({
  isOpen,
  onClose,
}: PropsWithChildren<IAddProblemModal>) => {
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get("competitionId");
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    description: "",
  });
  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      description: "",
    });
  };

  const { mutate } = useAdminProblemMutation();

  const handleSubmit = () => {
    mutate({ competitionId: Number(competitionId), problemData: formData });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {/* 문제 리스트 불러오고 그 안에서 하나를 선택하면 쿼리스트링으로 문제id state에 저장*/}
        <ModalHeader>문제 추가하기</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <AddProblem formData={formData} setFormData={setFormData} />
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
