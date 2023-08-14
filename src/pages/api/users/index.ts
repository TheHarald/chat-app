import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export type ChatApiRequestBody = {
  name: string;
  password: string;
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
    const users = await prisma.users.findMany();
    res.send(users);
  }
  if (method === "POST") {
    const user = await prisma.users.create({
      data: {
        password: body.password,
        name: body.name,
      },
    });
    res.send(user);
  }
}
