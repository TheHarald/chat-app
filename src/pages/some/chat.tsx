import {
  CHAT_JOIN_ROOM,
  CHAT_LEAVE_CHAT,
  CHAT_RECIVE_MESSAGE,
  CHAT_SEND_MESSAGE,
} from "@/types/socket-constants";
import { Chats } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useSound from "use-sound";

let socket: Socket;

type Message = {
  username: string;
  authorId: string;
  chatId: string;
  text: string;
  id: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [chatId, setChatId] = useState("");
  const [currentChatId, setCurrentChatId] = useState("");
  const [allMessages, setAllMessages] = useState<Array<Message>>([]);
  const [userId, setUserId] = useState("");
  const [chats, setChats] = useState<Array<Chats>>([]);

  const [play] = useSound("../../gnome.mp3");

  const playSound = () => {
    play();
    console.log(chatId);
  };

  useEffect(() => {
    socketInitializer();

    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        // setAllMessages(data);
      })
      .catch((error) => console.log(error));

    fetch("api/chat")
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
      })
      .catch((error) => console.log(error));

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId]);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on(CHAT_RECIVE_MESSAGE, (data) => {
      if (data.authorId !== userId) {
        playSound();
      }
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    socket.emit(CHAT_SEND_MESSAGE, {
      username,
      chatId: currentChatId,
      authorId: userId,
      text: message,
    });

    setMessage("");
  }

  function createAccount() {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User created:", data);
        setUserId(data.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function connectToChat() {
    socket.emit(CHAT_JOIN_ROOM, chatId);
    setCurrentChatId(chatId);
  }

  function leaveFromChat() {
    socket.emit(CHAT_LEAVE_CHAT, chatId);
    // setChatId("");
  }

  function selectChat(id: string) {
    setChatId(id);
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>
      <p>userId: {userId}</p>
      <p>chatId: {chatId}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={createAccount}>Создать аккаунт</button>
          <br />
          <input value={chatId} onChange={(e) => setChatId(e.target.value)} />
          <button disabled={!userId} onClick={connectToChat}>
            Войти в комнату
          </button>
          <button onClick={leaveFromChat}>Выйти из комнаты</button>
          <br />
          <button onClick={playSound}>Звук</button>
          <br />

          <div>
            {allMessages.map(({ username, text, id }) => (
              <div key={id}>
                {username}: {text}
              </div>
            ))}

            <br />

            <form>
              <input
                name="message"
                placeholder="enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete={"off"}
              />
              <button disabled={!userId} onClick={handleSend}>
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <h1>Chats List</h1>
        <br />
        {chats.map(({ name, id }) => (
          <div onClick={() => selectChat(id)} key={id}>
            {name}
          </div>
        ))}
        <br />
      </div>
    </div>
  );
}
