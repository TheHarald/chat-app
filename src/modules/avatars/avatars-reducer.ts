import {
  AVATARS_FORM_NAME_CHANGE,
  AVATARS_FORM_SRC_CHANGE,
  AVATARS_GET_AVATARS,
  AVATARS_SET_AVATARS,
  AVATARS_SET_IS_LOADING,
} from "./avatars-constants";
import { TAvatarsModuleActions, TAvatarsModuleState } from "./avatars-types";

const initialState: TAvatarsModuleState = {
  forms: {
    avatarName: "",
    src: "",
  },
  avatars: [],
  isLoading: false,
};

export const avatarsReducer = (
  state = initialState,
  action: TAvatarsModuleActions
) => {
  switch (action.type) {
    case AVATARS_SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }

    case AVATARS_SET_AVATARS: {
      return {
        ...state,
        avatars: action.avatars,
      };
    }
    case AVATARS_FORM_NAME_CHANGE: {
      return {
        ...state,
        forms: {
          ...state.forms,
          avatarName: action.avatarName,
        },
      };
    }
    case AVATARS_FORM_SRC_CHANGE: {
      return {
        ...state,
        forms: {
          ...state.forms,
          src: action.src,
        },
      };
    }
    default:
      return state;
  }
};
