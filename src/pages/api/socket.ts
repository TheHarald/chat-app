import prisma from "@/lib/prisma";
import {
  CHAT_JOIN_ROOM,
  CHAT_LEAVE_CHAT,
  CHAT_RECIVE_MESSAGE,
  CHAT_SEND_MESSAGE,
  CHAT_USER_CONNECTED,
  CHAT_USER_DISCONNECTED,
} from "@/types/socket-constants";
import { NextApiRequest, NextApiResponse } from "next/types";
import { Server, Socket } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import {
  TSocketJoinLeavePayload,
  TSocketSendMessagePayload,
} from "@/types/root-types";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

let users: Array<string> = [];

export default function SocketHandler(
  _: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });

  io.sockets.on("connection", (socket: Socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on(CHAT_SEND_MESSAGE, async (payload: TSocketSendMessagePayload) => {
      console.log("send payload", payload);

      const { roomId, authorId, text, userName } = payload;

      const message = await prisma.messages.create({
        data: {
          roomId,
          authorId,
          text,
        },
      });

      io.sockets.in(roomId).emit(CHAT_RECIVE_MESSAGE, payload);
    });

    socket.on(CHAT_JOIN_ROOM, async (payload: TSocketJoinLeavePayload) => {
      console.log("join payload", payload);
      const { roomId, userId } = payload;

      socket.join(payload.roomId);

      const joinedUser = await prisma.usersOnChats.create({
        data: {
          roomId,
          userId,
        },
      });

      socket.emit(CHAT_USER_CONNECTED, users); // заменить на бд
    });
    socket.on(CHAT_LEAVE_CHAT, async (payload: TSocketJoinLeavePayload) => {
      console.log("leave payload", payload);

      const { roomId, userId } = payload;

      socket.leave(payload.roomId);

      const leavedUser = await prisma.usersOnChats.delete({
        where: {
          userId_roomId: {
            userId,
            roomId,
          },
        },
      });

      socket.emit(CHAT_USER_DISCONNECTED, users);
    });

    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
    });
  });

  res.socket.server.io = io;

  console.log("Setting up socket");
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
