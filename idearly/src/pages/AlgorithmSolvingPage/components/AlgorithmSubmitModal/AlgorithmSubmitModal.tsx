import * as S from "./AlgorithmSubmitModal.styles";
import { useAtomValue } from "jotai";
import { executeResultAtom } from "../../../../store/Algorithm.atoms";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmSubmitModal = ({
  isOpen,
  onClose,
}: PropsWithChildren<Prop>) => {
  const executeResult = useAtomValue(executeResultAtom);
  console.log("executeResult: ", executeResult);

  const printResult = (data: string) => {
    switch (data) {
      case "pass": {
        return "통과";
      }
      case "failed": {
        return "실패";
      }
      case "error": {
        return "에러";
      }
      case "timeout": {
        return "시간초과";
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>제출 결과</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {executeResult.map((test) => (
              <div key={test.testCaseId}>
                <S.TestCaseContainer>
                  <S.ResultContainer>
                    <S.InfoText>
                      테스트 {test.testCaseId} {">"}
                    </S.InfoText>
                    <S.ValueText>{printResult(test.status)}</S.ValueText>
                  </S.ResultContainer>
                </S.TestCaseContainer>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
