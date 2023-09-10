import { RootState } from "@/redux";

export const avatarsSelector = (s: RootState) => {
  return s.avatars.avatars;
};
export const avatarsIsLoadingSelector = (s: RootState) => {
  return s.avatars.isLoading;
};

export const avatarsFormsSelector = (s: RootState) => {
  return s.avatars.forms;
};
