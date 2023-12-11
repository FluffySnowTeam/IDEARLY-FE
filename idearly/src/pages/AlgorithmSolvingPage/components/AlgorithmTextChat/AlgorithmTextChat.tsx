// import { useState } from 'react';
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { AlgorithmTextChatModal } from '..';

export const AlgorithmTextChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(isOpen);

  return (
    <>
      <span 
        className="material-icons"
        onClick={onOpen}
      >
        chat
      </span>
      <AlgorithmTextChatModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
