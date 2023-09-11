import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { protectedRoute } from "../protected-route";
import { parseJwt } from "@/utils/auth-utils/jwt";
import { TRootResponseData, TUserInfo } from "@/types/root-types";

type TUserInfoChnageAvatarBody = {
  avatarId: string;
};

interface TChnageAvatarApiRequest extends NextApiRequest {
  body: TUserInfoChnageAvatarBody;
}

export default protectedRoute(async function handler(
  req: TChnageAvatarApiRequest,
  res: NextApiResponse<TRootResponseData<TUserInfo>>
) {
  const { method, body } = req;

  if (method === "PATCH") {
    const token = req.cookies.token;

    if (token) {
      const { userId } = parseJwt(token);

      const { avatarId } = body;

      await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          avatarId,
        },
      });

      const user = await prisma.users.findFirst({
        where: {
          id: userId,
        },
        include: {
          avatar: true,
        },
      });

      if (user) {
        res.send({
          success: true,
          data: {
            name: user.name,
            id: user.id,
            avatarId: user.avatarId,
            avatar: user.avatar || {
              // TODO Fix
              id: "",
              src: "",
              label: "",
            },
          },
        });
        return;
      }
      res.send({
        success: false,
        message: "Пользователь не найден",
      });
      return;
    }

    return res.send({
      message: "Пользователь не авторизован",
      success: false,
      code: 401,
    });
  }

  if (method === "GET") {
    const token = req.cookies.token;

    if (token) {
      const { userId } = parseJwt(token);

      const user = await prisma.users.findFirst({
        where: {
          id: userId,
        },
        include: {
          avatar: true,
        },
      });

      if (user) {
        res.send({
          success: true,
          data: {
            name: user.name,
            id: user.id,
            avatarId: user.avatarId,
            avatar: user.avatar || {
              // TODO Fix
              id: "",
              src: "",
              label: "",
            },
          },
        });
        return;
      }
      res.send({
        success: false,
        message: "Пользователь не найден",
      });
      return;
    }

    res.send({
      message: "Пользователь не авторизован",
      success: false,
      code: 401,
    });
  }
});
