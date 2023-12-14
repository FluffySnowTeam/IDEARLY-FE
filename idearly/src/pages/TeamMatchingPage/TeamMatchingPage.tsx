import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Stack, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'
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
    <>
      <div>
        <h1>Create a Team</h1>
        <Input placeholder='팀 이름을 입력해주세요.' onChange={(e)=>setTeamName(e.target.value)} />

        <Text mb='8px'>맴버 추가</Text>
        <HStack spacing={5}>
          {addedMembers.map((user) => (
            <Tag
              size='lg'
              key={user.id}
              borderRadius='full'
              variant='solid'
              colorScheme='gray'
            >
              <TagLabel>{user.name}({user.email})</TagLabel>
              <TagCloseButton />
            </Tag>
          ))}
        </HStack>
        <FormControl isInvalid={isErrorCount}>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={input} onChange={handleInputChange} />
          {!isErrorCount || <FormErrorMessage>Email is required.</FormErrorMessage>}
        </FormControl>
        <Input placeholder='검색할 맴버의 이메일 주소를 입력해주세요.' onChange={(e)=>setUserMail(e.target.value)} />
        
        <Text mb='8px'>수락 대기중인 맴버</Text>
        {
          waitMembers.map((user) => {
            return (
              <div style={{display: 'flex'}} key={user.id}>
                <Text>{user.name}</Text>
                <Text>({user.email})</Text>
                <Button variant='link'>취소하기</Button>
              </div>
            )
          })
        }
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='solid'>
            Button
          </Button>
          <Button colorScheme='teal' variant='outline'>
            Button
          </Button>
        </Stack>
      </div>
    </>
  );
}
