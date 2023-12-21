import { Input, TagLeftIcon } from "@chakra-ui/react";
import * as S from "./AddTeamMembers.styles";
import { IUserType } from "../../pages/TeamMatchingPage/TeamMatchingPage.types";
import { useEffect, useState } from "react";
import { AddIcon } from '@chakra-ui/icons';
import useDebounce from "../../hooks/useDebounce";
import { useSearchMemberQuery } from "../../hooks/useTeamMatchingMutation";

export const AddTeamMembers = ({ setAddedMembers, isErrorCount}: { setAddedMembers: React.Dispatch<React.SetStateAction<IUserType[]>>, isErrorCount: boolean}) => {
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  const [userMail, setUserMail] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserType>({
    name: '',
    email: ''
  });

  const debouncedValue = useDebounce(userMail, 400);
  const data = useSearchMemberQuery({competitionId: '123', email: debouncedValue});

  useEffect(() => {
    if (data?.exist){
      setIsShowUser(true);
      setUserInfo({name: data.memberName, email: data.email});
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

  return (
    <>
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
