import { Box, Button, FormControl, FormErrorMessage, Input, Stack, TagCloseButton, TagLeftIcon } from '@chakra-ui/react'
import * as S from './TeamMatchingPage.styles';
import { useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import useDebounce from '../../hooks/useDebounce';
import { IUserType } from './TeamMatchingPage.types';

export const TeamMatchingPage = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [userMail, setUserMail] = useState<string>('');
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserType>({
    name: '',
    email: ''
  });
  const [addedMembers, setAddedMembers] = useState<IUserType[]>([
    {
      name: '홍길동',
      email: 'user1@example.com'
    },
    {
      name: '홍길동2',
      email: 'user2@example.com'
    },

  ]);
  const MAX_MEMBER = 2;

  const isErrorName = teamName === '';
  const isErrorCount = addedMembers.length !== MAX_MEMBER; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화
  const isErrorTeamMatching = !isErrorName && !isErrorCount; // 팀 이름이 ''이 아니어야 하고, 맴버가 3명이어야 한다.

  const debouncedValue = useDebounce(userMail, 400);

  useEffect(() => {
    if (debouncedValue === 'user@example.com'){
      setIsShowUser(true);
      setUserInfo({name: '홍길동3', email: 'user4@example.com'}); // 임시
    } else {
      setIsShowUser(false);
      setUserInfo({
        name: '',
        email: ''
      });
    }
  }, [debouncedValue]);

  const handleUserClick = () => {
    setIsShowUser(false);
    setAddedMembers((prev) => [...prev, userInfo]);
    setUserMail('');
  }

  const handleDelete = (email: string) => {
    setAddedMembers(addedMembers.filter((user) => user.email !== email));
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
                <Input
                  placeholder='팀 이름을 입력해주세요.' 
                  value={teamName} 
                  onChange={(e) => setTeamName(e.target.value)}
                />
                {!isErrorName || <FormErrorMessage>팀 이름은 필수입니다.</FormErrorMessage>}
              </FormControl>
            </Box>
            <Box>
              <S.MiniTitle>맴버 추가({addedMembers.length+1}/{MAX_MEMBER+1})</S.MiniTitle>
              <S.HStackWrapper spacing={5}>
                <S.TagWrapper
                  size='lg'
                  borderRadius='full'
                  variant='solid'
                >
                  나
                </S.TagWrapper>
                {addedMembers.map((user) => (
                  <S.TagWrapper
                    size='lg'
                    key={user.email}
                    borderRadius='full'
                    variant='solid'
                  >
                    <S.TagLabelName>{user.name}</S.TagLabelName>
                    <S.TagLabeEmail>({user.email})</S.TagLabeEmail>
                    <TagCloseButton onClick={() => handleDelete(user.email)} />
                  </S.TagWrapper>
                ))}
              </S.HStackWrapper>
              <Input 
                type='email' 
                placeholder='검색할 맴버의 이메일 주소를 입력해주세요.' 
                onChange={(e)=>setUserMail(e.target.value)}
                value={userMail}
                isDisabled={!isErrorCount}
              />
              {/* 유저 보여주는데 버튼을 사용하는게 적절할까요? 처음에는 Tag를 사용해볼까 했는데... */}
              {
                isShowUser
                  &&
                <S.ShowUserBtn colorScheme='gray' onClick={handleUserClick}>
                  <TagLeftIcon boxSize='12px' as={AddIcon} />
                  {userInfo.name}
                  {userInfo.email}
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
