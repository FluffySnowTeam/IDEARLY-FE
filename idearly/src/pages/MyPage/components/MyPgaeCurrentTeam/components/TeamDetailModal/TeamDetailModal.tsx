import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import * as S from "./TeamDetailModal.styles";
import { PropsWithChildren } from "react";
import { ITeamlModal } from "../../MyPageCurrentTeam.types";

export const TeamDetailModal = ({ isOpen, onClose, currentMemberList, inviteMemberList}: PropsWithChildren<ITeamlModal>) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>팀 상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <S.ModalSubTitle>현재 맴버(2/3)</S.ModalSubTitle>
            {
              currentMemberList.map(member => (
                <S.ModalContent key={member.email}>{member.name}({member.email})</S.ModalContent>
              ))
            }
            <S.ModalSubTitle>수락 대기중인 맴버</S.ModalSubTitle>
            {
              inviteMemberList.map(member => (
                <S.ModalContent key={member.email}>{member.name}({member.email})</S.ModalContent>
              ))
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}