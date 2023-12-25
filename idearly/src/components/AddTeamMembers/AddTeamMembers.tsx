import { Input, TagLeftIcon } from "@chakra-ui/react";
import * as S from "./AddTeamMembers.styles";
import { IUserType } from "../../pages/TeamMatchingPage/TeamMatchingPage.types";
import { useEffect, useState } from "react";
import { AddIcon } from '@chakra-ui/icons';
import useDebounce from "../../hooks/useDebounce";
import { useSearchMemberQuery } from "../../hooks/useTeamMatchingMutation";
import { useNavigate } from "react-router-dom";

export const AddTeamMembers = ({ setAddedMembers, isErrorCount}: { setAddedMembers: React.Dispatch<React.SetStateAction<IUserType[]>>, isErrorCount: boolean}) => {
  const navigate = useNavigate();
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  const [userMail, setUserMail] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserType>({   // 받아온 데이터로 상태 관리
    name: '', 
    email: ''
  });
  const debouncedValue = useDebounce(userMail, 400);

  const {data, status, error } = useSearchMemberQuery({competitionId: '123', email: debouncedValue});

  if (status === "error") {
    navigate("/error");
    console.log(error);
  }

  // 데이터가 변경됐을 때, 정보가 있다면 업데이트
  useEffect(() => {
    if(data?.data.data.exist) {
      console.log(data.data.data.exist);
      setIsShowUser(true);
      setUserInfo({name: data.data.data.memberName, email: data.data.data.email});
    } else {
      setIsShowUser(false);
      setUserInfo({
        name: '',
        email: ''
      });
    }
  }, [data])
  
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
