import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AlgorithmNavContainer = styled(Box)`
  position: sticky;
  top: 7vh;
  z-index: 100;
  border-right: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 93vh;
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
  font-weight: bold;
  :hover {
    background-color: #01228a !important;
    color: white !important;
  }
  position: relative;
`;

export const ExitBtn = styled(Button)`
  font-size: 0.9rem;
  width: 35px;
  font-weight: bold;
`;

export const NavIcons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  margin-top: 15rem;
  span {
    margin-bottom: 1rem;
    transition: color 0.3s;
    :hover {
      color: #9999;
    }
  }
`;

export const CheckIcon = styled(CheckCircleIcon)`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;
