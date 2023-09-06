import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  ADD_MESSAGE,
  CHAT_CONNECT,
  GET_MESSAGES,
} from "@/modules/chat/chat-constants";
import {
  CHAT_JOIN_ROOM,
  CHAT_LEAVE_CHAT,
  CHAT_RECIVE_MESSAGE,
  CHAT_SEND_MESSAGE,
  CHAT_USER_CONNECTED,
  CHAT_USER_DISCONNECTED,
} from "@/types/socket-constants";
import { Badge, Button, Chip, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowBack } from "styled-icons/ionicons-outline";
import {
  authorizationUserInfoSelector,
  authorizationisAuthorizedSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import { TSocketSendMessagePayload } from "@/types/root-types";
import { socket } from "../socket";
import { chatsMessagesSelector } from "@/modules/chat/chat-selectors";
import { TChatMessage } from "@/modules/chat/chat-types";

type TChatProps = {};

function ChatPage(props: TChatProps) {
  const router = useRouter();
  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id;

  const dispatch = useDispatch();

  const { name, id: userId } = useSelector(authorizationUserInfoSelector);
  const isAuthorized = useSelector(authorizationisAuthorizedSelector);
  const isLoading = useSelector(authorizationisLoadingSelector);

  const messages = useSelector(chatsMessagesSelector);

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const backHandler = () => {
    router.back();
  };

  console.log("render");

  useEffect(() => {
    if (!isAuthorized || !roomId) {
      router.push("/login");
    }

    if (!socket.connected) {
      socket.connect();
    }

    console.log("mount");

    joinRoomHandler();

    dispatch({
      type: GET_MESSAGES,
      roomId: roomId || "empty",
    });

    socket.on(CHAT_RECIVE_MESSAGE, (data: TChatMessage) => {
      console.log(data);
      dispatch({
        type: ADD_MESSAGE,
        message: data,
      });
    });

    socket.on(CHAT_USER_CONNECTED, (data) => {
      // console.log(data);
      // setUsers(data);
    });

    socket.on(CHAT_USER_DISCONNECTED, (data) => {
      // console.log(data);
      // setUsers(data);
    });

    return () => {
      leaveRoomHandler();
      socket.disconnect();
    };
  }, [dispatch]);

  const joinRoomHandler = () => {
    socket.emit(CHAT_JOIN_ROOM, {
      roomId,
      userName: name,
      userId,
    });
  };

  const leaveRoomHandler = () => {
    socket.emit(CHAT_LEAVE_CHAT, {
      roomId,
      userName: name,
      userId,
    });
  };

  const sendMessageHandler = () => {
    socket.emit(CHAT_SEND_MESSAGE, {
      userName: name,
      roomId,
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
        <h2 className="text-xl font-semibold">Chat id: {id}</h2>
        <div className="flex flex-row gap-2">
          {users.map((user, i) => {
            return <Chip key={i}>{user}</Chip>;
          })}
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map(({ text, author, id }) => {
            return (
              <div key={id}>
                {author.name} : {text}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessageHandler}>Отправить</Button>
      </div>
    </>
  );
}

export default ChatPage;
