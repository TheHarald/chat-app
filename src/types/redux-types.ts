import { TNotificationModuleActions } from "@/modules/notifications/notification-types";
import { TAuthorizationModuleActions } from "@/modules/authorization/authorization-types";

export type ApplicationActions =
  | TAuthorizationModuleActions
  | TNotificationModuleActions;
