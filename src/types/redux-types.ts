import { TNotificationActions } from "@/modules/notifications/notification-types";
import {
  ADD_ACTION,
  ADD_DELAY_ACTION,
  AUTORIZATION_SET_IS_LOADING,
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "./action-constants";

export type ApplicationState = {
  count: number;
  message: string;
};

export type TAuthorizationState = {
  isLoading: boolean;
};

export type ChangeNumberAction = {
  type: typeof ADD_ACTION;
  number: number;
};
export type ChangeNumberWithDelayAction = {
  type: typeof ADD_DELAY_ACTION;
};

export type LoginAccountAction = {
  type: typeof LOGIN_ACCOUNT_ACTION;
  password: string;
  name: string;
};
export type RegisterAccountAction = {
  type: typeof REGISTER_ACCOUNT_ACTION;
  password: string;
  name: string;
};
export type TAuthorizationSetLoadingActions = {
  type: typeof AUTORIZATION_SET_IS_LOADING;
  isLoading: boolean;
};
export type LogoutAccountAction = {
  type: typeof LOGIN_ACCOUNT_ACTION;
};

export type ApplicationActions =
  | ChangeNumberAction
  | LoginAccountAction
  | RegisterAccountAction
  | LogoutAccountAction
  | TNotificationActions
  | TAuthorizationSetLoadingActions
  | ChangeNumberWithDelayAction;
