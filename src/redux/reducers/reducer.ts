import { ADD_ACTION } from "../../types/action-constants";
import { ApplicationActions, ApplicationState } from "../../types/redux-types";

const initialState: ApplicationState = {
  count: 0,
  message: "",
};

export const appReducer = (
  state = initialState,
  action: ApplicationActions
) => {
  switch (action.type) {
    case ADD_ACTION: {
      return {
        ...state,
        count: state.count + action.number,
      };
    }
    default:
      return state;
  }
};
