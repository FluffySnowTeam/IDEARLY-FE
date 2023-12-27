import { Button, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const TestCaseList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TestCaseDeleteButton = styled(IconButton)`
  border-radius: 100%;
  margin-left: 0.4rem;
`;

export const TestCaseAddButton = styled(Button)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

export const TestCaseListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
