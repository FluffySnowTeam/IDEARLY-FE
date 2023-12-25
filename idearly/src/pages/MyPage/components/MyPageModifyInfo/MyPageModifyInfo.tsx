import { Button, Card, CardBody, CardFooter, CardHeader, Heading } from "@chakra-ui/react"
import * as S from "./MyPageModifyInfo.styles";
import { useModifyUerMutation } from "../../../../hooks/useMyPageMutation";
import { useState } from "react";

export const MyPageModifyInfo = () => {
  const [value, setValue] = useState('');
  const { mutate } = useModifyUerMutation();
  
  const handleSubmit = () => {
    mutate(value);
    setValue('');
  }
  return (
    <S.CardWrapper>
      <Card align='center'>
        <CardHeader>
          <Heading size='md'> 이름 변경</Heading>
        </CardHeader>
        {/* 이 부분 form으로 변경해야할까요? */}
        <CardBody>
          <S.ModifyInput placeholder='변경할 이름을 입력해주세요.' value={value} onChange={(e) => setValue(e.target.value)} />
        </CardBody>
        <CardFooter>
          <Button colorScheme='blue' onClick={handleSubmit}>수정</Button>
        </CardFooter>
      </Card>
    </S.CardWrapper>
  )
}

