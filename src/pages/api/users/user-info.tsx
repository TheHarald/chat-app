import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { protectedRoute } from "../protected-route";
import { parseJwt } from "@/utils/auth-utils/jwt";
import { TRootResponseData, TUserInfo } from "@/types/root-types";

export default protectedRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TRootResponseData<TUserInfo>>
) {
  const { method } = req;

  if (method === "GET") {
    const token = req.cookies.token;

    if (token) {
      const { userId } = parseJwt(token);

      const user = await prisma.users.findFirst({
        where: {
          id: userId,
        },
      });

      if (user) {
        res.send({
          success: true,
          data: {
            name: user.name,
            id: user.id,
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
