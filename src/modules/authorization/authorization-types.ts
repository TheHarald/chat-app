import { TUserInfo } from "@/types/root-types";
import {
  AUTHORIZATION_CHECK_AUTH,
  AUTHORIZATION_GET_USER_INFO,
  AUTHORIZATION_SET_IS_AUTHORIZED,
  AUTHORIZATION_SET_USER_INFO,
  AUTORIZATION_NAME_CHANGE,
  AUTORIZATION_PASSWORD_CHANGE,
  AUTORIZATION_SET_IS_LOADING,
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "./authorization-constants";

export type TAuthorizationModuleState = {
  forms: {
    name: string;
    password: string;
  };
  userInfo: TUserInfo;
  isAuthorized: boolean;
  isLoading: boolean;
};

export type TAuthorizationLoginAccountAction = {
  type: typeof LOGIN_ACCOUNT_ACTION;
};
export type TAuthorizationRegisterAccountAction = {
  type: typeof REGISTER_ACCOUNT_ACTION;
};
export type TAuthorizationSetLoadingAction = {
  type: typeof AUTORIZATION_SET_IS_LOADING;
  isLoading: boolean;
};
export type TAuthorizationSetIsAuthorizedAction = {
  type: typeof AUTHORIZATION_SET_IS_AUTHORIZED;
  isAuthorized: boolean;
};
export type TAuthorizationLogoutAccountAction = {
  type: typeof LOGIN_ACCOUNT_ACTION;
};
export type TAuthorizationCheckAuthAction = {
  type: typeof AUTHORIZATION_CHECK_AUTH;
};
export type TAuthorizationGetUserInfoAction = {
  type: typeof AUTHORIZATION_GET_USER_INFO;
};

export type TAuthorizationPawwordInputChange = {
  type: typeof AUTORIZATION_PASSWORD_CHANGE;
  password: string;
};
export type TAuthorizationSetUserInfoAction = {
  type: typeof AUTHORIZATION_SET_USER_INFO;
  userInfo: TUserInfo;
};
export type TAuthorizationNameInputChange = {
  type: typeof AUTORIZATION_NAME_CHANGE;
  name: string;
};

export type TAuthorizationModuleActions =
  | TAuthorizationLogoutAccountAction
  | TAuthorizationSetLoadingAction
  | TAuthorizationCheckAuthAction
  | TAuthorizationSetLoadingAction
  | TAuthorizationPawwordInputChange
  | TAuthorizationSetIsAuthorizedAction
  | TAuthorizationNameInputChange
  | TAuthorizationRegisterAccountAction
  | TAuthorizationSetUserInfoAction
  | TAuthorizationGetUserInfoAction
  | TAuthorizationLoginAccountAction;
