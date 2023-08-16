import { text } from "stream/consumers";
import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./notification-constants";
import {
  TNotificationActions,
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
  action: TNotificationActions
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