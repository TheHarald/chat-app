import { RootState } from "@/redux";

export const authorizationFormsSelector = (s: RootState) => {
  return s.authorization.forms ?? { password: "", name: "" };
};
export const authorizationisAuthorizedSelector = (s: RootState) => {
  return s.authorization.isAuthorized ?? false;
};
export const authorizationisLoadingSelector = (s: RootState) => {
  return s.authorization.isLoading ?? false;
};
export const authorizationUserInfoSelector = (s: RootState) => {
  return s.authorization.userInfo ?? { name: "", id: "" };
};
