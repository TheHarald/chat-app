import {
  AUTHORIZATION_SET_IS_AUTHORIZED,
  AUTHORIZATION_SET_USER_INFO,
  AUTORIZATION_NAME_CHANGE,
  AUTORIZATION_PASSWORD_CHANGE,
  AUTORIZATION_SET_IS_LOADING,
} from "./authorization-constants";
import {
  TAuthorizationModuleActions,
  TAuthorizationModuleState,
} from "./authorization-types";

const initialState: TAuthorizationModuleState = {
  forms: {
    password: "",
    name: "",
  },
  userInfo: {
    name: "",
    id: "",
  },
  isAuthorized: false,
  isLoading: false,
};

export const authorizationReducer = (
  state = initialState,
  action: TAuthorizationModuleActions
) => {
  switch (action.type) {
    case AUTORIZATION_PASSWORD_CHANGE: {
      return {
        ...state,
        forms: {
          ...state.forms,
          password: action.password,
        },
      };
    }
    case AUTORIZATION_NAME_CHANGE: {
      return {
        ...state,
        forms: {
          ...state.forms,
          name: action.name,
        },
      };
    }
    case AUTORIZATION_SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case AUTHORIZATION_SET_IS_AUTHORIZED: {
      return {
        ...state,
        isAuthorized: action.isAuthorized,
      };
    }
    case AUTHORIZATION_SET_USER_INFO: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          id: action.userInfo.id,
          name: action.userInfo.name,
        },
      };
    }

    default:
      return state;
  }
};
