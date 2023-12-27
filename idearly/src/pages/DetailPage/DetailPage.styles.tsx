import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const CompetitionDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: 4rem;
`;

export const CompeDetailTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export const CompeDetailDate = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

export const CompeDetailDescription = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

export const CompeSubmitButton = styled(Button)`
  width: 15rem;
  height: 3rem;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  background-color: #5a84ff;
  color: white;
  transition: background-color 0.3s ease;
  :hover {
    background-color: rgba(1, 34, 138, 0.5);
  }
`;
