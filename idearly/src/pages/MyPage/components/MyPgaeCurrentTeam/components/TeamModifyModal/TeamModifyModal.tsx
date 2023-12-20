import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, TagCloseButton } from "@chakra-ui/react"
import { PropsWithChildren, useState } from "react";
import { ITeamlModal } from "../../MyPageCurrentTeam.types";
import { AddTeamMembers } from "../../../../../../components/AddTeamMembers/AddTeamMembers";
import { IUserType } from "../../../../../TeamMatchingPage/TeamMatchingPage.types";
import * as S from "./TeamModifyModal.styles";
import { CloseIcon } from "@chakra-ui/icons";

export const TeamModifyModal = ({ isOpen, onClose, currentMemberList, inviteMemberList}: PropsWithChildren<ITeamlModal>) => {
  const [addedMembers, setAddedMembers] = useState<IUserType[]>(currentMemberList);
  const MAX_MEMBER = 2;
  const isErrorCount = addedMembers.length !== MAX_MEMBER; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화

  const [addedInviteMembers, setAddedInviteMembers] = useState(inviteMemberList);
  
  console.log('cur: ', addedMembers);
  console.log('invite: ', addedInviteMembers);
  
  const handleCancleMember = (email: string) => {
    // 해당 email을 가지고 있는 유저 삭제
    setAddedInviteMembers(addedInviteMembers.filter(member => member.email !== email));
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>팀 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <S.ModalSubTitle>맴버 추가(2/3)</S.ModalSubTitle>
            <AddTeamMembers addedMembers={addedMembers} setAddedMembers={setAddedMembers} isErrorCount={isErrorCount} />
            <S.ModalSubTitle>수락 대기중인 맴버</S.ModalSubTitle>
            {
              addedInviteMembers.map(member => (
                <S.MemberWrapper key={member.email}>
                  <S.ModalContent key={member.email}>{member.name}({member.email})</S.ModalContent>
                  <S.IconWrapper as={CloseIcon} onClick={() => handleCancleMember(member.email)} />
                </S.MemberWrapper>
              ))
            }
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button colorScheme='blue' onClick={onClose} >
                수정
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}