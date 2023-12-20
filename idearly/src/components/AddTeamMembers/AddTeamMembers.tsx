import { Input, TagCloseButton, TagLeftIcon } from "@chakra-ui/react";
import * as S from "./AddTeamMembers.styles";
import { IUserType } from "../../pages/TeamMatchingPage/TeamMatchingPage.types";
import { useEffect, useState } from "react";
import { AddIcon } from '@chakra-ui/icons';
import useDebounce from "../../hooks/useDebounce";

export const AddTeamMembers = ({addedMembers, setAddedMembers, isErrorCount}: {addedMembers: IUserType[], setAddedMembers: React.Dispatch<React.SetStateAction<IUserType[]>>, isErrorCount: boolean}) => {
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  const [userMail, setUserMail] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserType>({
    name: '',
    email: ''
  });

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
    <>
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
      {
        isShowUser
          &&
        <S.ShowUserTag colorScheme='gray' onClick={handleUserClick}>
          <TagLeftIcon boxSize='12px' as={AddIcon} />
          {userInfo.name}
          {userInfo.email}
        </S.ShowUserTag>
      }
    </>
  )
}
