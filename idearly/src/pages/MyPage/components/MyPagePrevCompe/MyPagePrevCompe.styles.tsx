import { TableContainer } from "@chakra-ui/react";
import styled from "@emotion/styled";


// width: 100% 하면 네비바도 영향을 받는 것 같은데 이유를 아시는 분이 계실까요...?
export const TableContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const MyPagePrevCompeTitleBox = styled.div`
  display: flex;
  padding: 1.2rem 0;
  width: 80%;
`;

export const MyPagePrevCompeTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const MyPagePrevTableContainer= styled(TableContainer)`
  width: 80%;
  border: 1px solid #e9e9e9;
  border-radius: 1rem;
`;