import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Stack, Tag, TagCloseButton, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import * as S from './TeamMatchingPage.styles';
import { useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';

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
  },
  {
    id:3,
    name: '홍길동2',
    email: 'user3@example.com'
  }
]

export const TeamMatchingPage = () => {
  const [teamName, setTeamName] = useState<string>('');
  // const [userMail, setUserMail] = useState<string>('');
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState('');
  const isErrorName = teamName === '';
  const isErrorCount = addedMembers.length !== 3; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화
  const isErrorTeamMatching = !isErrorName && !isErrorCount; // 팀 이름이 ''이 아니어야 하고, 맴버가 3명이어야 한다.

  let timer: any;

  const debounceSearch = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // setUserMail(value);
      // 여기에서 백엔드로 api 요청 보내기
      if (value === 'user@example.com'){
        setIsShowUser(true);
        setUserInfo('홍길동(user@example.com)');
      } else {
        setIsShowUser(false);
        setUserInfo('');
      }
    }, 400);
  }

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
              <FormControl isInvalid={isErrorName}>
                <Input placeholder='팀 이름을 입력해주세요.' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                {!isErrorName || <FormErrorMessage>팀 이름은 필수입니다.</FormErrorMessage>}
              </FormControl>
            </Box>
            <Box>
              <S.MiniTitle>맴버 추가({addedMembers.length}/3)</S.MiniTitle>
              <S.HStackWrapper spacing={5}>
                {addedMembers.map((user) => (
                  <S.TagWrapper
                    size='lg'
                    key={user.email}
                    borderRadius='full'
                    variant='solid'
                  >
                    <S.TagLabelName>{user.name}</S.TagLabelName>
                    <S.TagLabeEmail>({user.email})</S.TagLabeEmail>
                    <TagCloseButton />
                  </S.TagWrapper>
                ))}
              </S.HStackWrapper>
              <Input 
                type='email' 
                placeholder='검색할 맴버의 이메일 주소를 입력해주세요.' 
                onChange={(e)=>debounceSearch(e.target.value)}
              />
              {/* 유저 보여주는데 버튼을 사용하는게 적절할까요? 처음에는 Tag를 사용해볼까 했는데... */}
              {
                isShowUser
                  &&
                <S.ShowUserBtn colorScheme='gray'>
                  <TagLeftIcon boxSize='12px' as={AddIcon} />
                  {userInfo}
                </S.ShowUserBtn>
              }

            </Box>

          </Stack>
        </S.CardBodySection>
        
        <S.CardFooterSection>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='facebook' variant='solid'>
              취소하기
            </Button>
            <Button colorScheme='facebook' variant='outline' isDisabled={!isErrorTeamMatching}>
              팀 생성하기
            </Button>
          </Stack>
        </S.CardFooterSection>

    </S.CardContainer>
    </S.TeamMathingWrapper>
  );
}
