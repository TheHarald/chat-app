import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "@/utils/auth-utils/jwt";
import { NextApiResponse, NextApiRequest } from "next";

export function protectedRoute(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies.token;

      console.log(req.cookies);

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decodedToken = verifyToken(token);

      console.log(decodedToken);

      return handler(req, res);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      } else if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}
