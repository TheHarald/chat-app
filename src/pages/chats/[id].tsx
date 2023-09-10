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
import React, { useEffect, useRef, useState } from "react";
import { ArrowBack } from "styled-icons/ionicons-outline";
import {
  authorizationUserInfoSelector,
  authorizationisAuthorizedSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import { socket } from "../socket";
import {
  chatsMessagesSelector,
  chatsRoomUsersSelector,
} from "@/modules/chat/chat-selectors";
import MessageItem from "@/components/message-item/message-item";
import { soketEmitTs } from "@/utils/socket";
import {
  TSocketJoinLeavePayload,
  TSocketSendMessagePayload,
} from "@/types/root-types";

type TChatProps = {};

function ChatPage(props: TChatProps) {
  const router = useRouter();
  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id || "";

  const dispatch = useDispatch();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    name,
    id: userId,
    avatar,
  } = useSelector(authorizationUserInfoSelector);
  const isAuthorized = useSelector(authorizationisAuthorizedSelector);
  const isLoading = useSelector(authorizationisLoadingSelector);

  const messages = useSelector(chatsMessagesSelector);
  const roomUsers = useSelector(chatsRoomUsersSelector);

  const [message, setMessage] = useState("");

  const backHandler = () => {
    router.back();
  };

  const scrollToBottom = () => {
    console.log("scrol");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    soketEmitTs<TSocketJoinLeavePayload>(CHAT_JOIN_ROOM, {
      roomId,
      userName: name,
      userId,
    });
  };

  const leaveRoomHandler = () => {
    soketEmitTs<TSocketJoinLeavePayload>(CHAT_LEAVE_CHAT, {
      roomId,
      userName: name,
      userId,
    });
  };

  const sendMessageHandler = (e: React.FormEvent) => {
    e.preventDefault();
    soketEmitTs<TSocketSendMessagePayload>(CHAT_SEND_MESSAGE, {
      userName: name,
      roomId,
      authorId: userId,
      text: message,
      avatarSrc: avatar.src,
    });
    setMessage("");
    inputRef.current?.focus();
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
        isEnabled={false}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-4 p-2">
            {messages.map(({ text, author, id, authorId }) => {
              return (
                <MessageItem
                  key={id}
                  text={text}
                  isMy={authorId === userId}
                  userName={author.name}
                  avatar={author.avatar?.src || ""}
                />
              );
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollShadow>
      <form
        onSubmit={sendMessageHandler}
        className="flex flex-row gap-2"
        autoComplete="off"
      >
        <Input
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
        <Button type="submit" color="primary">
          Отправить
        </Button>
      </form>
    </>
  );
}

export default ChatPage;
