import { Users, UsersOnChats } from "@prisma/client";

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

export type TSocketSendMessagePayload = {
  userName: string;
  roomId: string;
  authorId: string;
  text: string;
};

export type TSocketJoinLeavePayload = {
  roomId: string;
  userName: string;
  userId: string;
};

export type TSocketJoinUserResponseData = UsersOnChats & {
  user: {
    name: string;
  };
};
