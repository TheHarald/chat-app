import { TOKEN_EXPIRED_DAYS } from "@/types/root-constants";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your-secret-key";

export function signToken(data: any): string {
  return jwt.sign(data, secret, { expiresIn: `${TOKEN_EXPIRED_DAYS}d` });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
