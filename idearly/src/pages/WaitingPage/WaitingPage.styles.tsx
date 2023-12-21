import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const WaitingCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

export const WaitingCardBox = styled(Card)`
  width: 68rem;
  height: 32rem;
`;

export const WaitingCardImage = styled(Image)``;

export const WaitingCardStack = styled(Stack)``;

export const WaitingCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WaitingCardHeading = styled(Heading)`
  font-size: 1.5rem;
  margin-bottom: 1.4rem;
`;

export const WaitingCardSubHeading = styled(Heading)`
  color: #555555;
`;

export const WaitingCardText = styled(Text)`
  padding: 1.5rem 4rem 0rem 4rem;
  font-size: 0.95rem;
`;

export const WaitingCardButton = styled(Button)`
  margin: 2.3rem 0rem 2.3rem 0rem;
  background-color: #5a84ff;
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;
