import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const HeaderContainer = styled(Box)`
  cursor: pointer;
  border-bottom: 1px solid #cccccc;
  padding: 10px;
  height: 7vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
`;

export const HeaderNavContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  div {
    margin-right: 10px;
    font-weight: bold;
  }
`;

export const HeaderText = styled.div`
  :hover {
    color: #13228a;
    font-weight: bold;
  }
`;
