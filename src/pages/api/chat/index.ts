import { Chats } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { protectedRoute } from "../routes";
import { TRootResponseData } from "@/types/root-types";

export type ChatApiRequestBody = {
  name: string;
};

interface ChatApiRequest extends NextApiRequest {
  body: ChatApiRequestBody;
}

type ResponseDataType = Array<Chats> | Chats;

export default protectedRoute(async function handler(
  req: ChatApiRequest,
  res: NextApiResponse<TRootResponseData<ResponseDataType>>
) {
  const { method, body } = req;

  if (method === "GET") {
    const chats = await prisma.chats.findMany();
    res.send({ data: chats, success: true });
  }
  if (method === "POST") {
    const chat = await prisma.chats.create({
      data: {
        name: body.name,
      },
    });
    res.send({ data: chat, success: true });
  }
  if (method === "DELETE") {
  }
});
