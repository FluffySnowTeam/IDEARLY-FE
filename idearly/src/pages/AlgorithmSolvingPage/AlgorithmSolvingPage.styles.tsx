import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AlgorithmSolvingPageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AlgorithmSolvingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between; // 자식 요소들 간의 간격을 균등하게 분배
`;

export const AlgorithmEditorWrapper = styled.div`
  width: 100%;
`;

export const EditorButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.45rem;
`;

export const EditorButton = styled(Button)`
  font-size: 0.9rem;
  padding: 0.1rem;
  width: 3.8rem;
  height: 2rem;
  margin-right: 0.5rem;
`;

export const SubmitButton = styled(Button)`
  font-size: 0.9rem;
  padding: 0.1rem;
  width: 3.8rem;
  height: 2rem;
  margin-right: 1rem;
`;
