import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./notification-constants";

export type TNotificationModuleState = {
  visability: boolean;
  data: {
    titile: string;
    text?: string;
  };
};

export type TShowNotificationAction = {
  type: typeof SHOW_NOTIFICATION;
  title: string;
  text?: string;
};
export type THideNotificationAction = {
  type: typeof HIDE_NOTIFICATION;
};

export type TNotificationActions =
  | TShowNotificationAction
  | THideNotificationAction;
