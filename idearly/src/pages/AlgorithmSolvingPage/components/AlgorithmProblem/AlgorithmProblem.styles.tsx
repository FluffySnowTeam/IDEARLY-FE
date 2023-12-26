import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";

export const AlgorithmContainer = styled(Box)`
  border-right: 1px solid #cccccc;
  padding: 1rem;
  width: 35rem;
  overflowy: scroll;
`;

export const MarkdownContainer = styled(ReactMarkdown)`
  overflow: auto;
  height: 90vh;
`;
