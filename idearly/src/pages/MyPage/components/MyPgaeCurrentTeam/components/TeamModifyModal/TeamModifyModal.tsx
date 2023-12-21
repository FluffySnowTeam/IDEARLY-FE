import { Button, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, TagCloseButton, TagLeftIcon } from "@chakra-ui/react"
import { PropsWithChildren, useEffect, useState } from "react";
import { ITeamMember, ITeamlModal } from "../../MyPageCurrentTeam.types";
import { AddTeamMembers } from "../../../../../../components/AddTeamMembers/AddTeamMembers";
import { IUserType } from "../../../../../TeamMatchingPage/TeamMatchingPage.types";
import * as S from "./TeamModifyModal.styles";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { ShowUserTag } from "../../../../../../components/AddTeamMembers/AddTeamMembers.styles";
import useDebounce from "../../../../../../hooks/useDebounce";

export const TeamModifyModal = ({ isOpen, onClose, currentMemberList, inviteMemberList}: PropsWithChildren<ITeamlModal>) => {
  const [addedMembers, setAddedMembers] = useState<ITeamMember[]>(currentMemberList);
  const [isShowUser, setIsShowUser] = useState<boolean>(false);
  const [userMail, setUserMail] = useState<string>('');
  (currentMemberList);
  const [userInfo, setUserInfo] = useState<IUserType>({
    name: '',
    email: ''
  });
  const MAX_MEMBER = 2;
  const isErrorCount = addedMembers.length !== MAX_MEMBER; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화

  const [addedInviteMembers, setAddedInviteMembers] = useState(inviteMemberList);

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
  
  const handleDropoutMember = (email: string) => {
    // 해당 email을 가지고 있는 유저 삭제
    setAddedInviteMembers(addedInviteMembers.filter(member => member.email !== email));

    // 강퇴 api 
  }

  const handleUserClick = () => {
    setIsShowUser(false);
    setAddedMembers((prev) => [...prev, userInfo]);
    setUserMail('');
  }

  const handleDelete = (email: string) => {
    setAddedMembers(addedMembers.filter((user) => user.email !== email));
  }

  const handleSubmit = () => {
    onClose();
    // 맴버 추가 리스트 백엔드로 보내기
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>팀 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <S.ModalSubTitle>맴버 추가(2/3)</S.ModalSubTitle>
            {/* <AddTeamMembers addedMembers={addedMembers} setAddedMembers={setAddedMembers} isErrorCount={isErrorCount} /> */}
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
              <ShowUserTag colorScheme='gray' onClick={handleUserClick}>
                <TagLeftIcon boxSize='12px' as={AddIcon} />
                {userInfo.name}
                {userInfo.email}
              </ShowUserTag>
            }

              <S.ModalContent>
                나
              </S.ModalContent>
              {addedMembers.map((user: IUserType) => (
                <S.MemberWrapper key={user.email}>
                  <S.ModalContent key={user.email}>{user.name}({user.email})</S.ModalContent>
                  <S.IconWrapper as={CloseIcon} onClick={() => handleDelete(user.email)} />
                </S.MemberWrapper>
              ))}
              
            <S.ModalSubTitle>수락 대기중인 맴버</S.ModalSubTitle>
            {
              addedInviteMembers.map(member => (
                <S.MemberWrapper key={member.email}>
                  <S.ModalContent key={member.email}>{member.name}({member.email})</S.ModalContent>
                  <S.IconWrapper as={CloseIcon} onClick={() => handleDropoutMember(member.email)} />
                </S.MemberWrapper>
              ))
            }
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button colorScheme='blue' onClick={handleSubmit} >
                수정
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}