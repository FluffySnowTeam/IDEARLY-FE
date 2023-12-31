import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import type { IAddCompetitionModal } from "./AddCompetitionModal.types";
import { CompetitionInfoForm } from "./components";
import { CompetitionRequest } from "../../../../types";
import { useAdminCompetitionMutation } from "../../../../hooks/useAdminCompetitionMutation";
import { formDateChange } from "../../../../utils/dateChange";

export const AddCompetitionModal = ({
  onClose,
  isOpen,
}: PropsWithChildren<IAddCompetitionModal>) => {
  const [formData, setFormData] = useState<CompetitionRequest>({
    title: "",
    startDateTime: "",
    endDateTime: "",
    description: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleCloseModal = () => {
    // formData를 초기 상태로 리셋
    setFormData({
      title: "",
      startDateTime: "",
      endDateTime: "",
      description: "",
    });
    onClose();
  };

  const toast = useToast();
  const { mutate } = useAdminCompetitionMutation();

  // 메인에서 확인 예정
  const handleSubmit = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    if (allFieldsFilled) {
      mutate({
        title: formData.title,
        startDateTime: formDateChange({
          date: formData.startDateTime,
        }) as string,
        endDateTime: formDateChange({ date: formData.endDateTime }) as string,
        description: formData.description,
      });
    } else {
      toast({
        title: "전송 실패",
        description: "모든 필드를 채워주세요",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
    }
  };

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
        <ModalCloseButton onClick={handleCloseModal} />
        <ModalBody>
          <CompetitionInfoForm
            formData={formData}
            handleChange={handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={handleCloseModal}>
            닫기
          </Button>
          <Button onClick={handleSubmit} colorScheme="facebook" mr={3}>
            저장하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
