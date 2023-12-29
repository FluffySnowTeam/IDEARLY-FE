import {
  AlgorithmEditor,
  AlgorithmNav,
  AlgorithmProHeader,
  AlgorithmProblem,
  AlgorithmTextChatModal,
} from "./components";
import * as S from "./AlgorithmSolvingPage.styles";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { testResultAtom } from "../../store/Algorithm.atoms";

export const AlgorithmSolvingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [language, setLanguage] = useState("python");
  const { id: competitionId } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("teamId");
  const problemId = queryParams.get("problemId");

  const setTestResult = useSetAtom(testResultAtom);
  useEffect(() => {
    setTestResult([]);
  }, [problemId]);

  return (
    <S.AlgorithmSolvingPageContainer>
      <AlgorithmTextChatModal
        isOpen={isOpen}
        onClose={onClose}
        teamId={teamId}
      />

      <AlgorithmNav onOpen={onOpen} />
      <S.AlgorithmSolvingWrapper>
        <AlgorithmProblem />
        <S.AlgorithmEditorWrapper>
          <AlgorithmProHeader setLanguage={setLanguage} language={language} />
          <AlgorithmEditor
            competitionId={competitionId}
            problemId={problemId}
            teamId={teamId}
          />
        </S.AlgorithmEditorWrapper>
      </S.AlgorithmSolvingWrapper>
    </S.AlgorithmSolvingPageContainer>
  );
};
