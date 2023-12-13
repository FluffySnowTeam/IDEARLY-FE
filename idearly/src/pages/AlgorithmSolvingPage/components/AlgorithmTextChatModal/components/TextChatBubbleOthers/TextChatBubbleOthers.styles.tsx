import styled from "@emotion/styled";
import { Tag } from "@chakra-ui/react";

export const Bubble = styled(Tag)`

`; 

export const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const UserNameText = styled.p`
  font-size: 0.6rem;
`;

export const DateText = styled.p`
  font-size: 0.6rem;
  // line-height: 24px;
`;

export const BubbleInnerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;