import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export type ChatApiRequestBody = {
  userId: string;
  chatId: string;
};

interface ChatApiRequest extends NextApiRequest {
  body: ChatApiRequestBody;
}

export default async function handler(
  req: ChatApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "POST") {
    const chat = await prisma.chats.findFirst({
      where: {
        id: body.chatId,
      },
    });
    if (!chat) {
      res.send("Chat not found");
      return;
    }

    const user = await prisma.users.findFirst({
      where: {
        id: body.userId,
      },
    });
    if (!user) {
      res.send("User not found");
      return;
    }

    const existUserOnChat = await prisma.usersOnChats.findFirst({
      where: {
        chatId: body.chatId,
        userId: body.userId,
      },
    });

    if (existUserOnChat) {
      res.send("You already joined");
    }

    const userOnChat = await prisma.usersOnChats.create({
      data: {
        chatId: body.chatId,
        userId: body.userId,
      },
    });
    res.send(userOnChat);
  }
}
