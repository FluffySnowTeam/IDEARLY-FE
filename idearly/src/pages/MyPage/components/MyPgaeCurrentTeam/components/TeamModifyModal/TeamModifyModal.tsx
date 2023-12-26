import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IModifyTeamlModal, ITeamMember } from "../../MyPageCurrentTeam.types";
import { AddTeamMembers } from "../../../../../../components/AddTeamMembers/AddTeamMembers";
import { IUserType } from "../../../../../TeamMatchingPage/TeamMatchingPage.types";
import * as S from "./TeamModifyModal.styles";
import { CloseIcon } from "@chakra-ui/icons";
import { useModifyTeamMembersMutation } from "../../../../../../hooks/useMyPageMutation";
import { IReqTeamMember } from "../../../../../../types";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../../../../store";

export const TeamModifyModal = ({
  isOpen,
  onClose,
  currentMemberList,
  inviteMemberList,
  setCurrentMemberList,
  setInviteMemberList,
  teamId,
}: PropsWithChildren<IModifyTeamlModal>) => {
  const MAX_MEMBER = 3;
  const userInfo = useAtomValue(userInfoAtom);
  const { mutate } = useModifyTeamMembersMutation();
  const totalMemberNum = currentMemberList?.length + inviteMemberList?.length;
  const isFullMember = totalMemberNum !== MAX_MEMBER; // 만약 팀 생성을 눌렀을 때, 인원이 다 안모였다면 활성화

  const handleDropoutMember = (email: string) => {
    setCurrentMemberList(
      currentMemberList.filter((member) => member.email !== email)
    );
  };

  const handleDelete = (email: string) => {
    console.log(email);
    setInviteMemberList(
      inviteMemberList.filter((user) => user.email !== email)
    );
  };

  const handleSubmit = () => {
    const temp: ITeamMember[] = [...inviteMemberList, ...currentMemberList];
    const payload: IReqTeamMember[] = temp
      .map((member) => ({ name: member.name, email: member.email }))
      .filter((member) => member.email !== userInfo.email);
    mutate({ teamId, payload });
    onClose();
  };
  console.log(
    "In modify modal, currentMemberList: ",
    currentMemberList,
    "inviteMemberList:",
    inviteMemberList
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>팀 상세 정보</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <S.ModalSubTitle>
            총 맴버 수({totalMemberNum}/{MAX_MEMBER})
          </S.ModalSubTitle>
          <AddTeamMembers
            setAddedMembers={setInviteMemberList}
            isErrorCount={isFullMember}
          />
          <S.ModalSubTitle>수락 대기중인 맴버</S.ModalSubTitle>

          <S.MemberListWrapper>
            {inviteMemberList?.map((user: IUserType) => (
              <S.MemberWrapper key={user.email}>
                <S.ModalContent key={user.email}>
                  {user.name}({user.email})
                </S.ModalContent>
                <S.IconWrapper
                  as={CloseIcon}
                  onClick={() => handleDelete(user.email)}
                />
              </S.MemberWrapper>
            ))}
          </S.MemberListWrapper>

          <S.ModalSubTitle>맴버 리스트</S.ModalSubTitle>
          <S.ModalContent>나</S.ModalContent>
          <S.MemberListWrapper>
            {currentMemberList
              ?.filter((member) => member.email !== userInfo.email)
              .map((member) => (
                <S.MemberWrapper key={member.email}>
                  <S.ModalContent key={member.email}>
                    {member.name}({member.email})
                  </S.ModalContent>
                  <S.Dropout onClick={() => handleDropoutMember(member.email)}>
                    강퇴
                  </S.Dropout>
                </S.MemberWrapper>
              ))}
          </S.MemberListWrapper>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={isFullMember}
          >
            수정
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
