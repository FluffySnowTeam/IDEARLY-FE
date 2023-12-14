import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Stack, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'
import * as S from './TeamMatchingPage.styles';
import { useState } from 'react';

export const TeamMatchingPage = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');

  const [input, setInput] = useState('')

  const handleInputChange = (e:any) => setInput(e.target.value)
  const isErrorName = false;
  const isErrorCount = input === ''; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화
  const waitMembers = [
    {
      id: 1,
      name: '홍길동',
      email: 'user1@example.com'
    },
    {
      id: 2,
      name: '홍길동2',
      email: 'user2@example.com'
    }
  ]
  const addedMembers = [
    {
      id:1,
      name: '홍길동',
      email: 'user1@example.com'
    },
    {
      id:2,
      name: '홍길동2',
      email: 'user2@example.com'
    }
  ]

  return (
    <S.TeamMathingWrapper>
      <S.CardContainer>
        <S.CardHeaderSection>
          <S.TeamMatchingTitle>Create a Team</S.TeamMatchingTitle>
        </S.CardHeaderSection>

        <S.CardBodySection>
          <Stack spacing='8'>
            <Box>
              <S.MiniTitle>팀 이름</S.MiniTitle>
              <Input placeholder='팀 이름을 입력해주세요.' onChange={(e)=>setTeamName(e.target.value)} />
            </Box>
            <Box>
              <S.MiniTitle>맴버 추가</S.MiniTitle>
              <S.HStackWrapper spacing={5}>
                {addedMembers.map((user) => (
                  <S.TagWrapper
                    size='lg'
                    key={user.id}
                    borderRadius='full'
                    variant='solid'
                  >
                    <S.TagLabelName>{user.name}</S.TagLabelName>
                    <S.TagLabeEmail>({user.email})</S.TagLabeEmail>
                    <TagCloseButton />
                  </S.TagWrapper>
                ))}
              </S.HStackWrapper>
              <FormControl isInvalid={isErrorCount}>
                {/* <FormLabel>Email</FormLabel> */}
                <Input type='email' value={input} onChange={handleInputChange} />
                {!isErrorCount || <FormErrorMessage>Email is required.</FormErrorMessage>}
              </FormControl>
              <Input placeholder='검색할 맴버의 이메일 주소를 입력해주세요.' onChange={(e)=>setUserMail(e.target.value)} />
            </Box>

            <Box>
              <S.MiniTitle>수락 대기중인 맴버</S.MiniTitle>
              {
                waitMembers.map((user) => {
                  return (
                    <S.WatingWrapper key={user.id}>
                      <S.MemberText>{user.name}({user.email})</S.MemberText>
                      <Button variant='link'>취소하기</Button>
                    </S.WatingWrapper>
                  )
                })
              }
            </Box>

          </Stack>
        </S.CardBodySection>
        
        <S.CardFooterSection>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='facebook' variant='solid'>
              취소하기
            </Button>
            <Button colorScheme='facebook' variant='outline'>
              팀 생성하기
            </Button>
          </Stack>
        </S.CardFooterSection>

    </S.CardContainer>
    </S.TeamMathingWrapper>
  );
}
