import { Avatars, Users, UsersOnChats } from "@prisma/client";

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

export type TUserInfo = Omit<Users, "password"> & {
  avatar: Avatars;
};
export type TSocketSendMessagePayload = {
  userName: string;
  roomId: string;
  authorId: string;
  text: string;
  avatarSrc: string;
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
