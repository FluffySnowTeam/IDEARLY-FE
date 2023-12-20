import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import type { IAddCompetitionModal } from "./AddCompetitionModal.types";
import { CompetitionInfoForm } from "./components";

export const AddCompetitionModal = ({
  onClose,
  isOpen,
}: PropsWithChildren<IAddCompetitionModal>) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>대회 정보 추가하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CompetitionInfoForm />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            닫기
          </Button>
          <Button colorScheme="blue" mr={3}>
            저장하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
