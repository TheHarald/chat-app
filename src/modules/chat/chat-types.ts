import { Chats } from "@prisma/client";
import {
  ADD_CHAT,
  CHATS_SET_IS_LOADING,
  GET_CHATS,
  SET_CHATS,
} from "./chat-constants";

export type TChatModuleState = {
  chats: Array<Chats>;
  isLoading: boolean;
};

export type TGetCahtsAction = {
  type: typeof GET_CHATS;
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

export type TChatModuleActions =
  | TGetCahtsAction
  | TSetIsLoadingChatAction
  | TSetCahtsAction
  | TAddChatAction;
