import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Stack, Tag, TagCloseButton, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import * as S from './TeamMatchingPage.styles';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';

export const TeamMatchingPage = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');

  const [input, setInput] = useState('')

  const handleInputChange = (e:any) => setTeamName(e.target.value)
  const isErrorName = false;
  const isErrorCount = teamName === ''; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화
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
  console.log('teamName:', teamName);
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
              <FormControl isInvalid={isErrorCount}>
                <Input placeholder='팀 이름을 입력해주세요.' value={teamName} onChange={handleInputChange} />
                {!isErrorCount || <FormErrorMessage>팀 이름은 필수입니다.</FormErrorMessage>}
              </FormControl>
            </Box>
            <Box>
              <S.MiniTitle>맴버 추가({addedMembers.length}/3)</S.MiniTitle>
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
              <Input type='email' placeholder='검색할 맴버의 이메일 주소를 입력해주세요.' onChange={(e)=>setUserMail(e.target.value)} />
              {/* 유저 보여주는데 버튼을 사용하는게 적절할까요? 처음에는 Tag를 사용해볼까 했는데... */}
              <S.ShowUserBtn colorScheme='gray'>
                <TagLeftIcon boxSize='12px' as={AddIcon} />
                홍길동(user@example.com)
              </S.ShowUserBtn>
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
