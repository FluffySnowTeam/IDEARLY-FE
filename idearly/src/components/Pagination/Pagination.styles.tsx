import { Button, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 2rem 0;
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PaginationButton = styled(Button)`
  padding: 0.1rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3rem;
  font-weight: bold;
  background-color: ${(props) => (props.isActive ? "#01228A" : "white")};
  color: ${(props) => (props.isActive ? "white" : "black")};
`;

export const PaginationIconButton = styled(IconButton)`
  margin: 0.3rem;
`;
