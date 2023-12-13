import { AlgorithmNav, AlgorithmTextChatModal } from "./components";
import * as S from "./AlgorithmSolvingPage.styles";
import { useDisclosure } from "@chakra-ui/react";

export const AlgorithmSolvingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <S.AlgorithmSolvingPageContainer>
      <AlgorithmTextChatModal isOpen={isOpen} onClose={onClose} />
      <AlgorithmNav onOpen={onOpen} />
      <div>hi</div>
    </S.AlgorithmSolvingPageContainer>
  );
};
