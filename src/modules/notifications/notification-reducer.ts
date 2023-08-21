import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./notification-constants";
import {
  TNotificationModuleActions,
  TNotificationModuleState,
} from "./notification-types";

const initialState: TNotificationModuleState = {
  notifications: [],
};

export const notificationReducer = (
  state = initialState,
  action: TNotificationModuleActions
) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          if (notification.id === action.id) {
            return {
              ...notification,
              isVisible: false,
            };
          }
          return notification;
        }),
      };
    }

    default:
      return state;
  }
};
