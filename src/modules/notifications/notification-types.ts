import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./notification-constants";

export type TNotification = {
  id: string;
  title: string;
  text?: string;
  isVisible: boolean;
};

export type TNotificationModuleState = {
  notifications: Array<TNotification>;
};

export type TShowNotificationAction = {
  type: typeof SHOW_NOTIFICATION;
  notification: TNotification;
};
export type THideNotificationAction = {
  type: typeof HIDE_NOTIFICATION;
  id: string;
};

export type TNotificationModuleActions =
  | TShowNotificationAction
  | THideNotificationAction;
