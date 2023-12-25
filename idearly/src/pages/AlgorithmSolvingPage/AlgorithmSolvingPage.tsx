import {
  AlgorithmEditor,
  AlgorithmFooter,
  AlgorithmNav,
  AlgorithmProHeader,
  AlgorithmProblem,
  AlgorithmResult,
  AlgorithmTextChatModal,
} from "./components";
import * as S from "./AlgorithmSolvingPage.styles";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const AlgorithmSolvingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [language, setLanguage] = useState("python");
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {}, [language]);

  const handleInitButton = () => {
    setIsInit(!isInit);
    console.log(isInit);
  };

  const handleExcute = () => {

  }

  const handleSubmit = () => {

  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('teamId');
  
  return (
    <S.AlgorithmSolvingPageContainer>
      <AlgorithmTextChatModal isOpen={isOpen} onClose={onClose} teamId={teamId} />

      <AlgorithmNav onOpen={onOpen} />
      <S.AlgorithmSolvingWrapper>
        <AlgorithmProblem />
        <S.AlgorithmEditorWrapper>
          <AlgorithmProHeader setLanguage={setLanguage} language={language} />
          <AlgorithmEditor />
          <AlgorithmResult />
          <S.EditorButtonWrapper>
            <AlgorithmFooter handleInitButton={handleInitButton} handleExcute={handleExcute} handleSubmit={handleSubmit} />
          </S.EditorButtonWrapper>
        </S.AlgorithmEditorWrapper>
      </S.AlgorithmSolvingWrapper>
    </S.AlgorithmSolvingPageContainer>
  );
};
