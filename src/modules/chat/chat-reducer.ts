import { ADD_CHAT, CHATS_SET_IS_LOADING, SET_CHATS } from "./chat-constants";
import { TChatModuleActions, TChatModuleState } from "./chat-types";

const initialState: TChatModuleState = {
  chats: [],
  isLoading: false,
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

    default:
      return state;
  }
};
