import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./notification-constants";
import {
  TNotificationModukeActions,
  TNotificationModuleState,
} from "./notification-types";

const initialState: TNotificationModuleState = {
  visability: false,
  data: {
    titile: "",
    text: "",
  },
};

export const notificationReducer = (
  state = initialState,
  action: TNotificationModukeActions
) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return {
        ...state,
        visability: true,
        data: {
          titile: action.title,
          text: action.text,
        },
      };
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        visability: false,
        data: {
          titile: "",
          text: "",
        },
      };
    }

    default:
      return state;
  }
};
