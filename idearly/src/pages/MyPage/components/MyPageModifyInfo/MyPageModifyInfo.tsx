import { Button, Card, CardBody, CardFooter, CardHeader, Heading } from "@chakra-ui/react"
import * as S from "./MyPageModifyInfo.styles";

export const MyPageModifyInfo = () => {
  return (
    <S.CardWrapper>
      <Card align='center'>
        <CardHeader>
          <Heading size='md'> 이름 변경</Heading>
        </CardHeader>
        <CardBody>
          <S.ModifyInput placeholder='변경할 이름을 입력해주세요.' />
        </CardBody>
        <CardFooter>
          <Button colorScheme='blue'>수정</Button>
        </CardFooter>
      </Card>
    </S.CardWrapper>
  )
}

