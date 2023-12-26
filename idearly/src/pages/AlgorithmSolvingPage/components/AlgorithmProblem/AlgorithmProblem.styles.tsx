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

export const MarkdownContainer = styled(ReactMarkdown)`
  overflow: auto;
  height: 90vh;
`;
