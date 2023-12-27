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
import { useNavigate } from "react-router-dom";

interface IExitModalProp {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmExitModal = ({ isOpen, onClose }: IExitModalProp) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleExit = () => {
    onClose();
    toast({
      title: "문제풀이를 종료하였습니다.",
      description: "종료 페이지로 이동합니다.",
      status: "success",
      duration: 800,
      isClosable: true,
    });
    setTimeout(() => {
      navigate("/complete");
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>문제풀이를 종료하시겠습니까?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>모든 답안이 제출되었는지 확인해주세요.</p>
          <p>종료 후 다시 접속하실 수 없습니다.</p>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleExit}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
