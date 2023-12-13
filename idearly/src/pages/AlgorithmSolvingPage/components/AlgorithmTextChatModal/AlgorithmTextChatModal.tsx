import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { ChatRecivMessage, Prop } from './AlgorithmTextChatModal.types'
import { useState, useEffect, useRef, FormEvent } from 'react';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import { fakeChatMsg } from '../../../../mocks/chat.mocks';
import * as S from './AlgorithmTextChatModal.styles';
import { TextChatBubbleMe, TextChatBubbleOthers } from '..';

// Response로 올 내용: chatMessage / senderName / sendDate
// Request에 담겨야할 내용: chatMessage

export const AlgorithmTextChatModal = ({isOpen, onClose}: Prop) => {
  const [value, setValue] = useState('');
  const [msg, setMsg] = useState<ChatRecivMessage[]>(fakeChatMsg);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = useRef<any>(null);
  const teamId = 1;

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [])

  const connect = () => {
    client.current = new StompJS.Client({
      brokerURL: 'ws://localhost:3000/ws/chat',
      // webSocketFactory: () => new SockJS("http://localhost:3000/ws/chat"),
      debug: function (str: string) {
        console.log(str);
      },
      onConnect: () => {   // 연결됐을때 실행할 함수
        subscribe(); // 연결 성공 시 구독하는 로직
      }, 
      onStompError: (frame: StompJS.Frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
    });

    // 만약 Websocket을 지원하지 않는 브라우저에서는 SockJS 사용
    if (typeof WebSocket !== 'function') {
      client.current.webSocketFactory = function () {
        return new SockJS('http://localhost:3000/stomp');
      };
    }
    console.log('Trying to connect...');
    client.current.activate(); // client 활성화
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

    if (!client.current || !client.current.connected) return;

    client.current.publish({
      destination: `/pub/teams/${teamId}`,
      body: JSON.stringify({chatMessage: message}),
    })

    setValue('');
  }

  const subscribe = () => {
    if(client.current !== null){
      console.log('Subscribing...');

      client.current.subscribe(`/topic/teams/${teamId}`, (chatMessage: { body: string; }) => {
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
                v.senderName === '강윤지' ? <TextChatBubbleMe message={v} /> : <TextChatBubbleOthers message={v} />
              )
            }
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