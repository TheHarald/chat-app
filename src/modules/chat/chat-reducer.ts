import {
  ADD_CHAT,
  ADD_MESSAGE,
  CHANGE_CHAT_NAME,
  CHATS_SET_IS_LOADING,
  SET_CHATS,
  SET_MESSAGES,
  SET_ROOM_USERS,
} from "./chat-constants";
import { TChatModuleActions, TChatModuleState } from "./chat-types";

const initialState: TChatModuleState = {
  chats: [],
  isLoading: false,
  forms: {
    chatName: "",
  },
  messages: [],
  roomUsers: [],
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

    case ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    }

    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      };
    }

    case SET_ROOM_USERS: {
      return {
        ...state,
        roomUsers: action.roomUsers,
      };
    }

    default:
      return state;
  }
};
