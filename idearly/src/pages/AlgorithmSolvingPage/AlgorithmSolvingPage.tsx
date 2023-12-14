import {
  AlgorithmEditor,
  AlgorithmNav,
  AlgorithmProblem,
  AlgorithmTextChatModal,
} from "./components";
import * as S from "./AlgorithmSolvingPage.styles";
import { useDisclosure } from "@chakra-ui/react";

export const AlgorithmSolvingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <S.AlgorithmSolvingPageContainer>
      <AlgorithmTextChatModal isOpen={isOpen} onClose={onClose} />
      <AlgorithmNav onOpen={onOpen} />
      <S.AlgorithmSolvingWrapper>
        <AlgorithmProblem />
        <AlgorithmEditor />
      </S.AlgorithmSolvingWrapper>
    </S.AlgorithmSolvingPageContainer>
  );
};
