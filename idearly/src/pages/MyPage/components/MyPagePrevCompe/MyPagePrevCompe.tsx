import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { prevCompetition } from "../../../../mocks/prevCompetition.mocks"
import * as S from "./MyPagePrevCompe.styles";

export const MyPagePrevCompe = () => {

  return (
    <S.TableContainerWrapper>
      <S.MyPagePrevCompeTitleBox>
        <S.MyPagePrevCompeTitle>이전 대회 조회</S.MyPagePrevCompeTitle>
      </S.MyPagePrevCompeTitleBox>
      <S.MyPagePrevTableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>대회 이름</Th>
              <Th>대회 일시</Th>
              <Th>팀원</Th>
              <Th>결과</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              prevCompetition.map((competiton) => {
                return (
                  <Tr key={competiton.competitionId}>
                    <Td>{competiton.competitionId}</Td>
                    <Td>{competiton.competitionTitle}</Td>
                    <Td>{competiton.date}</Td>
                    <Td>
                      {
                        competiton.teamMate.map((mate) =>  <p key={mate.email}>{mate.name}({mate.email})</p>)
                      }
                    </Td>
                    <Td>{competiton.result ? '우승' : '탈락'}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </S.MyPagePrevTableContainer>
    </S.TableContainerWrapper>
  )
}
