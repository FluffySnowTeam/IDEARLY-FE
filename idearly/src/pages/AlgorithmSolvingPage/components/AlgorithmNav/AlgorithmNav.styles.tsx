import styled from "@emotion/styled";

export const AlgorithmNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const ProblemNumber = styled.div`
  cursor: pointer;
  border-radius: 8px;
  border-style: solid;
  border-color: #01228a;
  border-width: 1.5px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  width: 35px;
  height: 35px;
  transition: background-color 0.3s;
  :hover {
    background-color: #01228a;
    color: white;
  }
`;
