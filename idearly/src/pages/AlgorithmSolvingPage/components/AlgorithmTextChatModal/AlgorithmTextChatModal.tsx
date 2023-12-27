import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import type { ChatRecivMessage, Prop } from "./AlgorithmTextChatModal.types";
import { useState, useEffect, useRef, FormEvent } from "react";
import * as StompJS from "@stomp/stompjs";
import * as S from "./AlgorithmTextChatModal.styles";
import { TextChatBubbleMe, TextChatBubbleOthers } from "./components";
import { userInfoAtom } from "../../../../store";
import { useAtomValue } from "jotai";

// Response로 올 내용: chatMessage / senderName / senderEmail / sendDate / messageId
// Request에 담겨야할 내용: chatMessage

export const AlgorithmTextChatModal = ({ isOpen, onClose, teamId }: Prop) => {
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState<ChatRecivMessage[]>([]);
  const userInfo = useAtomValue(userInfoAtom);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = useRef<any>(null);
  const msgEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (!msgEndRef.current) return;
    msgEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const connect = () => {
    client.current = new StompJS.Client({
      brokerURL: "wss://idearly.site/ws/chat",
      debug: function (str: string) {
        console.log(str);
      },
      onConnect: () => {
        // 연결됐을때 실행할 함수
        console.log("success");
        subscribe(); // 연결 성공 시 구독하는 로직
      },
      onStompError: (frame: StompJS.Frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    console.log("Trying to connect...");
    client.current.activate(); // client 활성화
  };

  const disconnect = () => {
    if (client.current) {
      console.log("Disconnecting...");
      client.current.deactivate(); // client 비활성화
    }
  };

  // 이 부분 타입 이렇게 냅둬도 괜찮을까요? types 파일에 따로 빼는게 좋을까요?
  const handleSubmit = (e: FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();
    publish(message);
  };

  // 이렇게 매개변수 하나만 있다면 타입 파일에 따로 뺄 필요는 없겠죠?
  const publish = (message: string) => {
    console.log("Publishing message:", message);
    setValue("");

    if (!client.current || !client.current.connected) return;

    client.current.publish({
      destination: `/pub/teams/${teamId}`,
      body: JSON.stringify({ chatMessage: message }),
    });
  };

  const subscribe = () => {
    if (client.current !== null) {
      console.log("Subscribing...");

      client.current.subscribe(
        `/topic/teams/${teamId}`,
        (chatMessage: { body: string }) => {
          console.log("Received message:", chatMessage.body);
          const newChatMessage: ChatRecivMessage = JSON.parse(chatMessage.body);
          setMsg((prev) => [...prev, newChatMessage]);
        }
      );
    } else console.log("Not subscribed. Client not available.");
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
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
                v.senderEmail === userInfo.email ? (
                  <TextChatBubbleMe key={v.messageId} message={v} />
                ) : (
                  <TextChatBubbleOthers key={v.messageId} message={v} />
                )
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
  );
};
