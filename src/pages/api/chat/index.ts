import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export type ChatApiRequestBody = {
  name: string;
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
    const users = await prisma.chats.findMany();
    res.send(users);
  }
  if (method === "POST") {
    const chat = await prisma.chats.create({
      data: {
        name: body.name,
      },
    });
    res.send(chat);
  }
  if (method === "DELETE") {
  }
}
