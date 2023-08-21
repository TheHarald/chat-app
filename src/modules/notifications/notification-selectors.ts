import { RootState } from "@/redux";

export const notificationsSelector = (s: RootState) => {
  return s.notifications.notifications;
};
