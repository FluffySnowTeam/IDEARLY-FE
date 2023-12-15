import { Select } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AlgorithmContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
`;

export const AlgorithmLanguage = styled(Select)`
  font-size: 0.7rem;
  border: none;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  width: 6rem;
  height: 1.9rem;
  margin-left: auto;
`;
