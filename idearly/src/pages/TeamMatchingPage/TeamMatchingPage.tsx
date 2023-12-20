import { Box, Button, FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react'
import * as S from './TeamMatchingPage.styles';
import { useState } from 'react';
import { IUserType } from './TeamMatchingPage.types';
import { AddTeamMembers } from '../../components/AddTeamMembers/AddTeamMembers';

export const TeamMatchingPage = () => {
  const [teamName, setTeamName] = useState<string>('');
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
              <AddTeamMembers addedMembers={addedMembers} setAddedMembers={setAddedMembers} isErrorCount={isErrorCount} />
            </Box>
          </Stack>
        </S.CardBodySection>
        
        <S.CardFooterSection>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='facebook' variant='solid'>
              취소하기
            </Button>
            <Button colorScheme='facebook' variant='outline' isDisabled={!isErrorTeamMatching} onClick={() => console.log(addedMembers)}>
              팀 생성하기
            </Button>
          </Stack>
        </S.CardFooterSection>
      </S.CardContainer>
    </S.TeamMathingWrapper>
  );
}
