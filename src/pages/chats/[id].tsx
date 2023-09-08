import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  ADD_MESSAGE,
  CHAT_CONNECT,
  GET_MESSAGES,
  SET_ROOM_USERS,
} from "@/modules/chat/chat-constants";
import {
  CHAT_JOIN_ROOM,
  CHAT_LEAVE_CHAT,
  CHAT_RECIVE_MESSAGE,
  CHAT_SEND_MESSAGE,
  CHAT_USER_CONNECTED,
  CHAT_USER_DISCONNECTED,
} from "@/types/socket-constants";
import {
  Badge,
  Button,
  Chip,
  Input,
  ScrollShadow,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowBack } from "styled-icons/ionicons-outline";
import {
  authorizationUserInfoSelector,
  authorizationisAuthorizedSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import {
  TSocketJoinUserResponseData,
  TSocketSendMessagePayload,
} from "@/types/root-types";
import { socket } from "../socket";
import {
  chatsMessagesSelector,
  chatsRoomUsersSelector,
} from "@/modules/chat/chat-selectors";
import { TChatMessage } from "@/modules/chat/chat-types";
import { useSocket } from "@/hooks/useSocket";

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
  const roomUsers = useSelector(chatsRoomUsersSelector);

  const [message, setMessage] = useState("");

  const backHandler = () => {
    router.back();
  };

  useEffect(() => {
    if (!isAuthorized || !roomId) {
      router.push("/login");
    }

    if (!socket.connected) {
      socket.connect();
    }

    window.addEventListener("unload", leaveRoomHandler);

    joinRoomHandler();

    dispatch({
      type: GET_MESSAGES,
      roomId: roomId || "empty",
    });

    return () => {
      leaveRoomHandler();
      window.removeEventListener("unload", leaveRoomHandler);
    };
  }, []);

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
          {isLoading ? (
            <Spinner />
          ) : (
            roomUsers.map((roomUser, i) => {
              return <Chip key={i}>{roomUser.user.name}</Chip>;
            })
          )}
        </div>
      </div>
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="max-h-[380px]"
      >
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
      </ScrollShadow>
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
