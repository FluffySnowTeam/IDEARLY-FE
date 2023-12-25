import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react"
import { PropsWithChildren, useState } from "react";
import { IModifyTeamlModal, ITeamMember, ITeamModal } from "../../MyPageCurrentTeam.types";
import { AddTeamMembers } from "../../../../../../components/AddTeamMembers/AddTeamMembers";
import { IUserType } from "../../../../../TeamMatchingPage/TeamMatchingPage.types";
import * as S from "./TeamModifyModal.styles";
import { CloseIcon } from "@chakra-ui/icons";
import { useModifyTeamMembersMutation } from "../../../../../../hooks/useMyPageMutation";
import { IReqTeamMember } from "../../../../../../types";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../../../../store";

export const TeamModifyModal = ({ isOpen, onClose, currentMemberList, inviteMemberList, setCurrentMemberList, setInviteMemberList, teamId}: PropsWithChildren<IModifyTeamlModal>) => {

  const MAX_MEMBER = 2;
  const isErrorCount = currentMemberList?.length !== MAX_MEMBER; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화
  const { mutate } = useModifyTeamMembersMutation();
  console.log('In modify modal, cur:', currentMemberList, 'invite:', inviteMemberList);
  const userInfo = useAtomValue(userInfoAtom);

  const handleDropoutMember = (email: string) => {
    // 해당 email을 가지고 있는 유저 삭제
    setInviteMemberList(inviteMemberList.filter(member => member.email !== email));
  }

  const handleDelete = (email: string) => {
    setCurrentMemberList(currentMemberList.filter((user) => user.email !== email));
  }

  const handleSubmit = () => {
    onClose();

    const temp: ITeamMember[] = [...inviteMemberList, ...currentMemberList]

    const payload: IReqTeamMember[] = temp.map((member) => ({ name: member.name, email: member.email })).filter(member => member.email !== userInfo.email);

    console.log(payload);
    
    mutate({teamId, payload});
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>팀 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <S.ModalSubTitle>총 맴버 수({currentMemberList?.length+inviteMemberList?.length + 1}/{MAX_MEMBER+1})</S.ModalSubTitle>
            <AddTeamMembers setAddedMembers={setCurrentMemberList} isErrorCount={isErrorCount} />
            <S.ModalSubTitle>수락 대기중인 맴버</S.ModalSubTitle>

            <S.MemberListWrapper>
              {currentMemberList?.map((user: IUserType) => (
                <S.MemberWrapper key={user.email}>
                  <S.ModalContent key={user.email}>{user.name}({user.email})</S.ModalContent>
                  <S.IconWrapper as={CloseIcon} onClick={() => handleDelete(user.email)} />
                </S.MemberWrapper>
              ))}
            </S.MemberListWrapper>
            
              
            <S.ModalSubTitle>수락완료한 맴버</S.ModalSubTitle>
            <S.ModalContent>
                나
              </S.ModalContent>
            <S.MemberListWrapper>
            {
              inviteMemberList?.map(member => (
                <S.MemberWrapper key={member.email}>
                  <S.ModalContent key={member.email}>{member.name}({member.email})</S.ModalContent>
                  <S.Dropout onClick={() => handleDropoutMember(member.email)}>강퇴</S.Dropout>
                </S.MemberWrapper>
              ))
            }
            </S.MemberListWrapper>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit} >
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}