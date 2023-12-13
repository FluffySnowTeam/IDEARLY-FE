import styled from "@emotion/styled";
import { Tag } from "@chakra-ui/react";

export const Bubble = styled(Tag)`
  background-color:#A0AEC0;
`; 

export const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
