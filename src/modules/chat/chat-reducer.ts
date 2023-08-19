import {
  ADD_CHAT,
  CHANGE_CHAT_NAME,
  CHATS_SET_IS_LOADING,
  SET_CHATS,
} from "./chat-constants";
import { TChatModuleActions, TChatModuleState } from "./chat-types";

const initialState: TChatModuleState = {
  chats: [],
  isLoading: false,
  forms: {
    chatName: "",
  },
};

export const chatsReducer = (
  state = initialState,
  action: TChatModuleActions
) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        chats: [...state.chats, action.chat],
      };
    }
    case SET_CHATS: {
      return {
        ...state,
        chats: action.chats,
      };
    }
    case CHATS_SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }

    case CHANGE_CHAT_NAME: {
      return {
        ...state,
        forms: {
          ...state.forms,
          chatName: action.chatName,
        },
      };
    }

    default:
      return state;
  }
};
