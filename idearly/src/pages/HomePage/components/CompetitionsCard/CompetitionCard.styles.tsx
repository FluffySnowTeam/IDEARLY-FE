import {
  Button,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const CompeCardContainer = styled(SimpleGrid)`
  padding: 0px 25px 0px 25px;
  margin-top: 20px;
`;

export const CompeCardBox = styled(Card)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 300px;
`;

export const CompeCardHeading = styled(Heading)`
  margin-bottom: 1.8rem;
  font-size: 1.3rem;
`;

export const CompeCardBody = styled(CardBody)``;

export const CompeText = styled(Text)`
  margin-top: 5px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const CompeCardButton = styled(Button)`
  margin-top: 15px;
`;

export const CardDetailButton = styled(Button)`
  margin-top: 1.2rem;
  margin-right: 10px;
  background-color: #5a84ff;
  color: white;
  font-weight: 800;
  transition: background-color 0.3s ease;
  :hover {
    background-color: rgba(1, 34, 138, 0.5);
  }
`;
