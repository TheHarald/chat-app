import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export type ChatApiRequestBody = {
  text: string;
  authorId: string;
  chatId: string;
};

interface ChatApiRequest extends NextApiRequest {
  body: ChatApiRequestBody;
}

export default async function handler(
  req: ChatApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { text, authorId, chatId } = req.body;

  if (method === "GET") {
    const messages = await prisma.messages.findMany();
    const resultMessages = messages.map(async (message) => {
      const user = await prisma.users.findFirst({
        where: {
          id: message.authorId,
        },
      });
      return {
        ...message,
        username: user?.name,
      };
    });
    Promise.all(resultMessages).then((data) => {
      res.send(data);
    });
  }

  if (method === "POST") {
    const chat = await prisma.chats.findFirst({
      where: {
        id: chatId,
      },
    });
    if (!chat) {
      res.send("Chat not found");
      return;
    }

    const userOnChat = await prisma.usersOnChats.findFirst({
      where: {
        userId: authorId,
        chatId,
      },
    });

    if (!userOnChat) {
      res.send("User not in chat");
      return;
    }
    console.log("test");

    const message = await prisma.messages.create({
      data: {
        text,
        authorId,
        chatId,
      },
    });
    res.send(message);
  }
}
