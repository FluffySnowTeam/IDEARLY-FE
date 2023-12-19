// sockJS + STOMPJS
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import type { ChatRecivMessage, Prop } from './AlgorithmTextChatModal.types'
import { useState, useEffect, useRef, FormEvent } from 'react';
import SockJS from 'sockjs-client';
// import * as StompJS from '@stomp/stompjs';
import { fakeChatMsg } from '../../../../mocks/chat.mocks';
import * as S from './AlgorithmTextChatModal.styles';
import { TextChatBubbleMe, TextChatBubbleOthers } from './components';
import { userInfoAtom } from '../../../../store';
import { useAtomValue } from "jotai";
import { CompatClient, Stomp } from "@stomp/stompjs";

// Response로 올 내용: chatMessage / senderName / senderEmail / sendDate / messageId
// Request에 담겨야할 내용: chatMessage

export const AlgorithmTextChatModal = ({isOpen, onClose}: Prop) => {
  const [value, setValue] = useState('');
  const [msg, setMsg] = useState<ChatRecivMessage[]>(fakeChatMsg);
  const userInfo = useAtomValue(userInfoAtom);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const client = useRef<any>(null);
  const client = useRef<CompatClient>();

  const msgEndRef = useRef<HTMLDivElement | null>(null);
  const teamId = 1;

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [])

  useEffect(() => {
    if (!msgEndRef.current) return;
    msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msg])

  const connect = () => {
    const socket = new SockJS("https://idearly.site/ws/chat")
    client.current = Stomp.over(socket);

    client.current.connect(
      () => {
        // callback 함수 설정, 대부분 여기에 sub 함수 씀
        subscribe();
      }
    );
  }

  const disconnect = () => {
    if (client.current) {
      console.log('Disconnecting...');
      client.current.deactivate(); // client 비활성화
    }
  }

  // 이 부분 타입 이렇게 냅둬도 괜찮을까요? types 파일에 따로 빼는게 좋을까요?
  const handleSubmit = (e: FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();
    publish(message);
  }

  // 이렇게 매개변수 하나만 있다면 타입 파일에 따로 뺄 필요는 없겠죠?
  const publish = (message: string) => {
    console.log('Publishing message:', message);
    setMsg((prev) => [
      ...prev,
      {
        messageId: '12',
        senderName: userInfo.name,
        senderEmail: userInfo.email,
        chatMessage: message,
        sendDate: '2023-12-13',
      }
    ])
    setValue('');

    if (!client.current || !client.current.connected) return;

    client.current.send(
      `/pub/teams/${teamId}`,
      {},
      JSON.stringify({chatMessage: message}),
    );
  }

  const subscribe = () => {
    if(client.current !== null){
      console.log('Subscribing...');

      client.current?.subscribe(`/topic/teams/${teamId}`, (chatMessage: { body: string; }) => {
        console.log('Received message:', chatMessage.body);
        const newChatMessage: ChatRecivMessage = JSON.parse(chatMessage.body);
        setMsg((prev) => [...prev, newChatMessage]);
      });
    }
    else console.log('Not subscribed. Client not available.');
  };

  return (
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
          <S.ModalBodyContainer>
            {
              // senderName을 보고 컴포넌트 선택
              msg.map((v) => 
                v.senderEmail === userInfo.email ? <TextChatBubbleMe message={v} /> : <TextChatBubbleOthers message={v} />
              )
            }
            <div ref={msgEndRef}></div>
          </S.ModalBodyContainer>
          <ModalFooter>
            <S.Form onSubmit={(e) => handleSubmit(e, value)}>
              <S.TextInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button type="submit">입력</Button>
            </S.Form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
