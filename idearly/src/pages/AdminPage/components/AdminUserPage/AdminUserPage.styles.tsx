import { TableContainer } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AdminUserContainer = styled.div`
  width: 100%;
`;

export const AdminUserTitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const AdminUserTitle = styled.div`
  margin-left: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const AdminUserSelect = styled.div`
  margin-right: 2rem;
`;

export const AdminUserTableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const AdminTableContainer = styled(TableContainer)`
  width: 80%;
  border: 1px solid #e9e9e9;
  border-radius: 1rem;
`;
