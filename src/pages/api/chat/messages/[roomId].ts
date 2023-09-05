import { Messages } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { TRootResponseData } from "@/types/root-types";
import { protectedRoute } from "../../protected-route";
import prisma from "@/lib/prisma";

type ResponseDataType = Array<Messages>;

export default protectedRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TRootResponseData<ResponseDataType>>
) {
  const { method } = req;
  const query = req.query;
  const { roomId } = query;

  if (method === "GET") {
    if (roomId) {
      const id = Array.isArray(roomId) ? roomId[0] : roomId;

      const messages = await prisma.messages.findMany({
        where: {
          roomId: id,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      return res.send({
        success: true,
        data: messages,
      });
    }
  }
});
