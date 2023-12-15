import styled from "@emotion/styled";
import { Input, ModalBody } from "@chakra-ui/react";

export const Form = styled.form`
  display: flex;
`;

export const TextInput = styled(Input)`
  width: 350px;
`
export const ModalBodyContainer = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`