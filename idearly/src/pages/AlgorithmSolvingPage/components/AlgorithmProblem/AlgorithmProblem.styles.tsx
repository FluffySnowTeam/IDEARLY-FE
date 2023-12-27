import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";

export const AlgorithmContainer = styled(Box)`
  border-right: 1px solid #cccccc;
  padding: 1rem;
  max-width: 35rem;
  width: 100%;
  overflow-y: scroll;
`;

export const AlgorithmTitle = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const MarkdownContainer = styled(ReactMarkdown)`
  overflow: auto;
  height: 90vh;
`;
