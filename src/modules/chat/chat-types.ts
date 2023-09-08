import { Chats, Messages } from "@prisma/client";
import {
  ADD_CHAT,
  ADD_MESSAGE,
  CHANGE_CHAT_NAME,
  CHATS_SET_IS_LOADING,
  CHAT_CONNECT,
  CHAT_DISCONNECT,
  CREATE_CHAT,
  GET_CHATS,
  GET_MESSAGES,
  SET_CHATS,
  SET_MESSAGES,
  SET_ROOM_USERS,
} from "./chat-constants";
import { TSocketJoinUserResponseData } from "@/types/root-types";

export type TChatModuleState = {
  chats: Array<Chats>;
  isLoading: boolean;
  forms: {
    chatName: string;
  };
  messages: Array<TChatMessage>;
  roomUsers: Array<TSocketJoinUserResponseData>;
};

export type TChatMessage = Messages & {
  author: {
    name: string;
  };
};

export type TGetChatsAction = {
  type: typeof GET_CHATS;
};
export type TCreateCahtAction = {
  type: typeof CREATE_CHAT;
};
export type TSetCahtsAction = {
  type: typeof SET_CHATS;
  chats: Array<Chats>;
};

export type TAddChatAction = {
  type: typeof ADD_CHAT;
  chat: Chats;
};
export type TSetIsLoadingChatAction = {
  type: typeof CHATS_SET_IS_LOADING;
  isLoading: boolean;
};
export type TChangeChatNameAction = {
  type: typeof CHANGE_CHAT_NAME;
  chatName: string;
};

export type TSocketChatConnect = {
  type: typeof CHAT_CONNECT;
};
export type TSocketChatDisconnect = {
  type: typeof CHAT_DISCONNECT;
};

export type TChatModuleSetMessagesAction = {
  type: typeof SET_MESSAGES;
  messages: Array<TChatMessage>;
};
export type TChatModuleAddMessagesAction = {
  type: typeof ADD_MESSAGE;
  message: TChatMessage;
};

export type TChatModuleGetMessagesAction = {
  type: typeof GET_MESSAGES;
  roomId: string;
};
export type TChatModuleSetUsersAction = {
  type: typeof SET_ROOM_USERS;
  roomUsers: Array<TSocketJoinUserResponseData>;
};

export type TChatModuleActions =
  | TGetChatsAction
  | TSetIsLoadingChatAction
  | TSetCahtsAction
  | TCreateCahtAction
  | TChangeChatNameAction
  | TSocketChatConnect
  | TSocketChatDisconnect
  | TChatModuleSetMessagesAction
  | TChatModuleAddMessagesAction
  | TChatModuleGetMessagesAction
  | TChatModuleSetUsersAction
  | TAddChatAction;
