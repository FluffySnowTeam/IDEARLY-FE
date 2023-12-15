import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const LoginTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  margin: 5rem 0 1rem 0;
`;

export const Title = styled.div`
  font-weight: bold;
`;

export const SiteName = styled.div`
  margin-left: 0.3rem;
`;

export const LoginWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
`;

export const CardContainer = styled(Card)`
  width: 38rem;
`;
export const CardHeaderSection = styled(CardHeader)``;
export const CardHeading = styled(Heading)``;
export const CardBodySection = styled(CardBody)`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
`;
export const CardFooterSection = styled(CardFooter)``;
export const SubmitButton = styled(Button)`
  ${(props) =>
    props.disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;
