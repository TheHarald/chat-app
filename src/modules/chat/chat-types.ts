import { Chats } from "@prisma/client";
import {
  ADD_CHAT,
  CHANGE_CHAT_NAME,
  CHATS_SET_IS_LOADING,
  CREATE_CHAT,
  GET_CHATS,
  SET_CHATS,
} from "./chat-constants";

export type TChatModuleState = {
  chats: Array<Chats>;
  isLoading: boolean;
  forms: {
    chatName: string;
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

export type TChatModuleActions =
  | TGetChatsAction
  | TSetIsLoadingChatAction
  | TSetCahtsAction
  | TCreateCahtAction
  | TChangeChatNameAction
  | TAddChatAction;
