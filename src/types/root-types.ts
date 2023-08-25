import { Users } from "@prisma/client";

export type TRootResponseData<T = void> = {
  message?: string;
  success: boolean;
  code?: number;
  data?: T;
};

export type TJWTCreatePaload = {
  userId: string;
};

export type TJWTPayload = {
  iat: number;
  exp: number;
} & TJWTCreatePaload;

export type TUserInfo = Omit<Users, "password">;
