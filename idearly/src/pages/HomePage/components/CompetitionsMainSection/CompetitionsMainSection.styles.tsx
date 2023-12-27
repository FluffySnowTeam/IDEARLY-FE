import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const MainContainer = styled(Box)`
  display: flex;
  margin: 2rem 2rem 0 10rem;
`;

export const MainImage = styled.img`
  width: 200rem;
  height: 40rem;
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0 0 0 1.5rem;
`;

export const BoldText = styled.span`
  color: #5a84ff;
  font-weight: 800;
`;
