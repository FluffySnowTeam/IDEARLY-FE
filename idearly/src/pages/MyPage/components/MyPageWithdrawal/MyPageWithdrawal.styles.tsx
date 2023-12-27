import { Button, Tag } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const WithdrawalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5rem 12rem;
`;

export const WithdrawalTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const WithdrawalSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 1.5rem;
`;

export const WithdrawalText = styled.div`
  color: gray;
  padding-left: 2rem;
`;

export const UserTag = styled(Tag)`
  width: 15rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
`;

export const RadioIcon = styled.span`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: gray;
  }
  div {
    font-size: 1.2rem;
    padding-left: 0.7rem;
  }
  align-items: center;
`;

export const WithdrawalBtn = styled(Button)`
  margin-top: 2rem;
`;
