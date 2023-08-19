import { RootState } from "@/redux";

export const chatsSelector = (s: RootState) => {
  return s.chats.chats;
};
export const chatsIsLoadingSelector = (s: RootState) => {
  return s.chats.isLoading;
};
export const chatsFiledsSelector = (s: RootState) => {
  return s.chats.forms;
};
