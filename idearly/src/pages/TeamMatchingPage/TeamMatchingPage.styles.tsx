import styled from "@emotion/styled";
import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";

export const TeamMathingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardContainer = styled(Card)`
  margin-top: 3rem;
  padding: 1.5rem;
  width: 38rem;
`;

export const CardHeaderSection = styled(CardHeader)`
  text-align: center;
`;

export const TeamMatchingTitle = styled(Heading)`
`;

export const CardBodySection = styled(CardBody)`
`;

export const CardFooterSection = styled(CardFooter)`
  display: flex;
  justify-content: center;
`;

export const MiniTitle = styled(Text)`
  font-weight: bold;
  margin-bottom: 8px;
`