import styled from "@emotion/styled";

export const AlgorithmResultContainer = styled.div`
  width: 100%;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  height: 18vh;
  overflow: auto;
`;

export const TestCase = styled.div``;

export const InfoText = styled.div`
  width: 8rem;
  text-align: right;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 2rem;
  color: #44576c;
`;

interface StatusProps {
  status: string;
}

export const ValueText = styled.div<StatusProps>`
  margin-left: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(props) => (props.status === "pass" ? "#438BFF" : "#F4483C")};
`;

export const TestCaseContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  fiex-direction: row;
  // background-color: red;
`;
