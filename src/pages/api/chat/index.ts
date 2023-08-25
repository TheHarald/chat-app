import { Chats } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { protectedRoute } from "../protected-route";
import { TRootResponseData } from "@/types/root-types";
import { parseJwt } from "@/utils/auth-utils/jwt";

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
  const token = req.cookies.token;

  if (method === "GET") {
    const chats = await prisma.chats.findMany();
    return res.send({ data: chats, success: true });
  }
  if (method === "POST") {
    if (token) {
      const userInfo = parseJwt(token);
      const chat = await prisma.chats.create({
        data: {
          name: body.name,
          creatorId: userInfo.userId,
        },
      });
      return res.send({ data: chat, success: true });
    }
  }
  if (method === "DELETE") {
  }
});
