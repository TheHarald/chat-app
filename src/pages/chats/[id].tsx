import { useDispatch, useSelector } from "@/hooks/hooks";
import { CHAT_CONNECT } from "@/modules/chat/chat-constants";
import {
  CHAT_JOIN_ROOM,
  CHAT_LEAVE_CHAT,
  CHAT_RECIVE_MESSAGE,
  CHAT_SEND_MESSAGE,
  CHAT_USER_CONNECTED,
  CHAT_USER_DISCONNECTED,
} from "@/types/socket-constants";
import { Badge, Button, Chip, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowBack } from "styled-icons/ionicons-outline";
import {
  authorizationUserInfoSelector,
  authorizationisAuthorizedSelector,
} from "@/modules/authorization/authorization-selectors";
import { TSocketSendMessagePayload } from "@/types/root-types";
import { socket } from "../socket";

type TChatProps = {};

function ChatPage(props: TChatProps) {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const { name, id: userId } = useSelector(authorizationUserInfoSelector);
  const isAuthorized = useSelector(authorizationisAuthorizedSelector);

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<TSocketSendMessagePayload>>(
    []
  );

  const backHandler = () => {
    leaveRoomHandler();
    router.back();
  };

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    joinRoomHandler();

    socket.on(CHAT_RECIVE_MESSAGE, (data) => {
      console.log(data);
      setMessages((pre) => [...pre, data]);
    });

    socket.on(CHAT_USER_CONNECTED, (data) => {
      console.log(data);
      setUsers(data);
    });

    socket.on(CHAT_USER_DISCONNECTED, (data) => {
      console.log(data);
      setUsers(data);
    });

    return () => {
      socket.disconnect();
      leaveRoomHandler();
    };
  }, []);

  const joinRoomHandler = () => {
    socket.emit(CHAT_JOIN_ROOM, {
      roomId: id,
      userName: name,
      userId,
    });
  };

  const leaveRoomHandler = () => {
    socket.emit(CHAT_LEAVE_CHAT, {
      roomId: id,
      userName: name,
      userId,
    });
  };

  const sendMessageHandler = () => {
    socket.emit(CHAT_SEND_MESSAGE, {
      userName: name,
      roomId: id,
      authorId: userId,
      text: message,
    });
    setMessage("");
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <Button
          color="primary"
          variant="light"
          className="w-min"
          onClick={backHandler}
          startContent={<ArrowBack size={24} />}
        >
          Назад
        </Button>
        <div className="flex flex-row gap-2">
          {users.map((user, i) => {
            return <Chip key={i}>{user}</Chip>;
          })}
        </div>
      </div>
      <h2 className="text-xl font-semibold">Chat id: {id}</h2>
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessageHandler}>Отправить</Button>
      </div>
      <div className="flex flex-col gap-2">
        {messages.map(({ text, userName }, i) => {
          return (
            <div key={i}>
              {userName} : {text}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChatPage;
