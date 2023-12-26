import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const TestcaseModalContainer = styled(Modal)``;

export const TestcaseModalOverlay = styled(ModalOverlay)``;

export const TestcaseModalContent = styled(ModalContent)``;

export const TestcaseModalHeader = styled(ModalHeader)``;

export const TestcaseModalCloseButton = styled(ModalCloseButton)``;

export const TestcaseModalFooter = styled(ModalFooter)``;

export const TestcaseButton = styled(Button)``;

export const ProblemListBox = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

interface ProblemItemProps {
  isSelected: boolean;
}

export const ProblemItem = styled.div<ProblemItemProps>`
  cursor: pointer;
  margin-bottom: 0.3rem;
  font-weight: ${(props) => (props.isSelected ? "700" : "normal")};
  :hover {
    font-weight: 700;
  }
`;
