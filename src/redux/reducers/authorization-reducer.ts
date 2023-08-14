import {
  ADD_ACTION,
  AUTORIZATION_SET_IS_LOADING,
} from "../../types/action-constants";
import {
  ApplicationActions,
  ApplicationState,
  TAuthorizationState,
} from "../../types/redux-types";

const initialState: TAuthorizationState = {
  isLoading: false,
};

export const authorizationReducer = (
  state = initialState,
  action: ApplicationActions
) => {
  switch (action.type) {
    case AUTORIZATION_SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
};
