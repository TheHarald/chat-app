import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your-secret-key";

export function signToken(data: any): string {
  return jwt.sign(data, secret, { expiresIn: "1m" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
