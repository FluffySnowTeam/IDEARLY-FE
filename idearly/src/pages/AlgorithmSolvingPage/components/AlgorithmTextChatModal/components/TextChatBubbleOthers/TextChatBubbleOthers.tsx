import type { ChatRecivMessage } from "../../AlgorithmTextChatModal.types"
import * as S from "./TextChatBubbleOthers.styles"

export const TextChatBubbleOthers = ({message}: {message: ChatRecivMessage}) => {
  return (
    <S.BubbleContainer>
        <S.UserNameText>{message.senderName}</S.UserNameText>
        <S.BubbleInnerContainer>
          <S.Bubble size="lg">
            <p>{message.chatMessage}</p>
          </S.Bubble>
          <S.DateText>{message.sendDate}</S.DateText>
        </S.BubbleInnerContainer>
    </S.BubbleContainer>
  )
}
