import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "@/utils/auth-utils/jwt";
import { NextApiResponse, NextApiRequest } from "next";
import { TRootResponseData } from "@/types/root-types";
import prisma from "@/lib/prisma";

export function protectedRoute(handler: any) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<TRootResponseData>
  ) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.send({
          message: "Пользователь не авторизован",
          success: false,
          code: 401,
        });
      }

      const decodedToken = verifyToken(token);

      const user = await prisma.users.findFirst({
        where: {
          id: decodedToken.userId,
        },
      });

      if (user) {
        return handler(req, res);
      } else {
        return res.send({
          message: "Пользователь не авторизован",
          success: false,
          code: 401,
        });
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.send({
          message: "Невалидный токен",
          success: false,
          code: 401,
        });
      } else if (error instanceof TokenExpiredError) {
        return res.send({
          message: "Время действия токена истекло",
          success: false,
          code: 401,
        });
      } else {
        return res.send({
          message: "Непредвиденная ошибка сервера",
          success: false,
          code: 401,
        });
      }
    }
  };
}
