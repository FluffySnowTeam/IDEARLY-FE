import { TableContainer } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const SearchTeamWrapper = styled.div`
  width: 100%;
  // background-color: red;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // padding-top: 4rem;
  // // padding-left: 5rem;
  padding: 4rem 5rem;
`;

export const SearchTeamTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const SearchTeamSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2rem;
`;

export const SearchTeamTableContainer = styled(TableContainer)`
  border: 1px solid #cccccc;
  border-radius: 1rem;
  padding: 0.5rem;
  margin-top: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;