import {
  AlgorithmEditor,
  AlgorithmNav,
  AlgorithmProHeader,
  AlgorithmProblem,
  AlgorithmResult,
  // AlgorithmTextChatModal,
} from "./components";
import * as S from "./AlgorithmSolvingPage.styles";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const AlgorithmSolvingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [language, setLanguage] = useState("python");
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {}, [language]);

  const handleInitButton = () => {
    setIsInit(!isInit);
    console.log(isInit);
  };

  return (
    <S.AlgorithmSolvingPageContainer>
      {/* <AlgorithmTextChatModal isOpen={isOpen} onClose={onClose} /> */}
      <AlgorithmNav onOpen={onOpen} />
      <S.AlgorithmSolvingWrapper>
        <AlgorithmProblem />
        <S.AlgorithmEditorWrapper>
          <AlgorithmProHeader setLanguage={setLanguage} language={language} />
          <AlgorithmEditor />
          <AlgorithmResult />
          <S.EditorButtonWrapper>
            <div>
              <S.EditorButton onClick={handleInitButton}>초기화</S.EditorButton>
              <S.EditorButton>실행</S.EditorButton>
              <S.SubmitButton colorScheme="blue">제출</S.SubmitButton>
            </div>
          </S.EditorButtonWrapper>
        </S.AlgorithmEditorWrapper>
      </S.AlgorithmSolvingWrapper>
    </S.AlgorithmSolvingPageContainer>
  );
};
