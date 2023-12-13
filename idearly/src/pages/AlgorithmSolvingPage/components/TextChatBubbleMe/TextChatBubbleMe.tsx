import { ChatRecivMessage } from "../AlgorithmTextChatModal/AlgorithmTextChatModal.types"
import * as S from "./TextChatBubbleMe.styles"

export const TextChatBubbleMe = ({message}: {message: ChatRecivMessage}) => {
  return (
    <S.BubbleContainer>
        <S.UserNameText>{message.senderName}</S.UserNameText>
        <S.BubbleInnerContainer>
          <S.DateText>{message.sendDate}</S.DateText>
          <S.Bubble size="lg">
            <p>{message.chatMessage}</p>
          </S.Bubble>
        </S.BubbleInnerContainer>
    </S.BubbleContainer>
  )
}
