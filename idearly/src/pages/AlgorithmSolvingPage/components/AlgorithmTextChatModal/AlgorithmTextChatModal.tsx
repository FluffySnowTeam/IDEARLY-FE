import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Prop } from './AlgorithmTextChatModal.types'
export const AlgorithmTextChatModal = ({isOpen, onClose}: Prop) => {
  return (
    // <div>AlgorithmTextChatModal</div>
    <>
       <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={'inside'}
      >
        <ModalContent
          position="fixed"
          bottom="0"
          left="20"
          right="0"
          w="100%"
          h="100%"
        >
          <ModalHeader>Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={15} /> */}
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
