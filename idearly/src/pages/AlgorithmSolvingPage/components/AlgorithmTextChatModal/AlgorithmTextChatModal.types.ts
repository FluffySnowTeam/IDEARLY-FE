export interface Prop {
  isOpen: boolean;
  onClose: () => void;
  teamId: string | null;
}

export interface ChatRecivMessage {
  messageId: string,
  chatMessage: string,
  senderName: string,
  senderEmail: string,
  sendDate: string
}




