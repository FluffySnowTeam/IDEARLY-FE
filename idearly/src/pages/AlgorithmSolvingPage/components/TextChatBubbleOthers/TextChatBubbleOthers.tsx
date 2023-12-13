import { ChatRecivMessage } from "../AlgorithmTextChatModal/AlgorithmTextChatModal.types"

export const TextChatBubbleOthers = ({message}: {message: ChatRecivMessage}) => {
  return (
    <>
      <p>{message.senderName}</p>
      <p>{message.chatMessage}</p>
      <p>{message.sendDate}</p>
    </>
  )
}
