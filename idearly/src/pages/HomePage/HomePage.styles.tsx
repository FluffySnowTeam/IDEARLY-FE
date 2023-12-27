import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const HomeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
`;

export const MainContainer = styled(Box)`
  width: 80%;
  display: flex;
  margin: 2rem 2rem 0 2rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0 0 0 1.5rem;
`;

export const BoldText = styled.span`
  color: #5a84ff;
  font-weight: 800;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 50rem;
`;
