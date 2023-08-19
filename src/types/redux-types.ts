import { TNotificationModuleActions } from "@/modules/notifications/notification-types";
import { TAuthorizationModuleActions } from "@/modules/authorization/authorization-types";
import { TChatModuleActions } from "@/modules/chat/chat-types";

export type ApplicationActions =
  | TAuthorizationModuleActions
  | TChatModuleActions
  | TNotificationModuleActions;
