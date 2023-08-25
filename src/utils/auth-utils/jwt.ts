import { TOKEN_EXPIRED_DAYS } from "@/types/root-constants";
import { TJWTCreatePaload, TJWTPayload } from "@/types/root-types";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your-secret-key";

export function signToken(data: TJWTCreatePaload): string {
  return jwt.sign(data, secret, { expiresIn: `${TOKEN_EXPIRED_DAYS}d` });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
export function parseJwt(token: string): TJWTPayload {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
