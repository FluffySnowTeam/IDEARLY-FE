import { Button, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const ModifyWrapper = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
`;

export const ModifyInput = styled(Input)`
  width: 300px;
  margin-left: 100px;
  margin-top: 20px;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const InfosWrapper = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  width: 30rem;
  margin-top: 5rem;
  gap: 4rem;
`;

export const Info = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const ModifyBtn = styled(Button)`
  margin-left: 10px;
`;

export const InputErrorMessage = styled.span`
  display: flex;
  text-align: left;
  padding: 0 3rem 0rem 6rem;
  font-size: 0.8rem;
  margin: 0.2rem 0 0.8rem 0.2rem;
  color: red;
`;
