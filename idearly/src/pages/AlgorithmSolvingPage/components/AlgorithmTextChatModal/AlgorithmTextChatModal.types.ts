export interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatRecivMessage {
  messageId: string,
  chatMessage: string,
  senderName: string,
  senderEmail: string,
  sendDate: string
}




