import { Avatars, Chats } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { protectedRoute } from "../protected-route";
import { TRootResponseData } from "@/types/root-types";

type ResponseDataType = Array<Avatars> | Avatars;

export type AvatarApiRequestBody = {
  label: string;
  src: string;
};

interface AvatarApiRequest extends NextApiRequest {
  body: AvatarApiRequestBody;
}

export default protectedRoute(async function handler(
  req: AvatarApiRequest,
  res: NextApiResponse<TRootResponseData<ResponseDataType>>
) {
  const { method, body } = req;

  if (method === "GET") {
    const avatars = await prisma.avatars.findMany();
    return res.send({
      success: true,
      data: avatars,
    });
  }

  if (method === "POST") {
    const { src, label } = body;

    const existedAvatar = await prisma.avatars.findFirst({
      where: {
        src,
      },
    });

    if (existedAvatar) {
      return res.send({
        success: false,
        message: "Такой аватар уже создан",
      });
    }

    const createdAvatar = await prisma.avatars.create({
      data: {
        src,
        label,
      },
    });
    return res.send({ success: true, data: createdAvatar });
  }
});
