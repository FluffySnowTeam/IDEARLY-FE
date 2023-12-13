export interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatRecivMessage {
  chatMessage: string,
  senderName: string,
  sendDate: string
}