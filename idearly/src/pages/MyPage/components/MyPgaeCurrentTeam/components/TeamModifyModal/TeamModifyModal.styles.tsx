import { Icon } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const ModalSubTitle = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1.5rem;
`;

export const ModalContent = styled.div`
  color: gray;
  padding-left: 0.5rem;
`;

export const MemberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15rem;
  align-items: center;
`;

export const IconWrapper = styled(Icon)`
  color: gray;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const Dropout = styled.div`
  color: gray;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const MemberListWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;