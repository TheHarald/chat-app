import prisma from "@/lib/prisma";
import {
  CHAT_JOIN_ROOM,
  CHAT_LEAVE_CHAT,
  CHAT_RECIVE_MESSAGE,
  CHAT_SEND_MESSAGE,
} from "@/types/socket-constants";
import { NextApiRequest, NextApiResponse } from "next/types";
import { Server, Socket } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default function SocketHandler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket: Socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on(CHAT_SEND_MESSAGE, async (obj) => {
      const { authorId, text, chatId } = obj;
      console.log("obj", obj);
      const createdMessage = await prisma.messages.create({
        data: {
          authorId,
          text,
          chatId,
        },
      });
      console.log("createdMessage", createdMessage);
      io.to(chatId).emit(CHAT_RECIVE_MESSAGE, {
        ...obj,
        id: createdMessage.id,
      });
    });

    socket.on(CHAT_JOIN_ROOM, (chatId: string) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    socket.on(CHAT_LEAVE_CHAT, (currentChatId: string) => {
      socket.leave(currentChatId);
      console.log(`User left room: ${currentChatId}`);
    });

    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
    });
  });

  console.log("Setting up socket");
  res.end();
}
