import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export type ChatApiRequestBody = {
  userId: string;
};

interface ChatApiRequest extends NextApiRequest {
  body: ChatApiRequestBody;
}

export default async function handler(
  req: ChatApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "GET") {
    const userOnChats = await prisma.usersOnChats.findMany({
      where: {
        userId: body.userId,
      },
    });

    const myChatsPromises = userOnChats.map(async (userOnChat) => {
      const chat = await prisma.chats.findFirst({
        where: {
          id: userOnChat.chatId,
        },
      });
      return chat;
    });

    Promise.all(myChatsPromises).then((data) => {
      res.send(data);
    });
  }
}
