import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AdminNavContainer = styled(Box)`
  border-right: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 15vw;
  height: 93vh;
  position: sticky;
  top: 7vh;
`;

export const AdminNavTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const AdminNavSubTitle = styled.div`
  cursor: pointer;
  margin-bottom: 1.4rem;
  font-size: 1rem;
`;
