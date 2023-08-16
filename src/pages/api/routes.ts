import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "@/utils/auth-utils/jwt";
import { NextApiResponse, NextApiRequest } from "next";
import { TRootResponseData } from "@/types/root-types";

export function protectedRoute(handler: any) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<TRootResponseData>
  ) => {
    try {
      const token = req.cookies.token;

      console.log(req.cookies);

      if (!token) {
        return res.send({
          message: "Пользователь не авторизован",
          success: false,
        });
      }

      const decodedToken = verifyToken(token);

      console.log(decodedToken);

      return handler(req, res);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.send({ message: "Невалидный токен", success: false });
      } else if (error instanceof TokenExpiredError) {
        return res.send({
          message: "Время действия токена истекло",
          success: false,
        });
      } else {
        return res.status(500).json({
          message: "Непредвиденная ошибка сервера",
          success: false,
        });
      }
    }
  };
}
