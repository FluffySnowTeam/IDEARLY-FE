import { Input } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface IValidationInputContainerProps {
  errors?: {
    message?: string;
  };
}

export const ValidationInputContainer = styled.div<IValidationInputContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 3rem 0rem 3rem;
  margin-bottom: ${(props) => (!props.errors ? "1rem" : "0")};
`;

export const ValidationInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  label {
    font-size: 0.8rem;
    font-weight: bold;
    color: #535353;
    width: 100%;
    text-align: left;
  }
`;

export const ValidationInput = styled(Input)`
  width: 100%;
  font-size: 0.8rem;
`;

export const InputErrorMessage = styled.span`
  display: flex;
  text-align: left;
  padding: 0 3rem 0rem 3rem;
  font-size: 0.8rem;
  margin: 0.2rem 0 0.8rem 0.2rem;
  color: red;
`;
