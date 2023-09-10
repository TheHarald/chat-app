import { Avatars } from "@prisma/client";
import {
  AVATARS_CREATE_AVATAR,
  AVATARS_FORM_NAME_CHANGE,
  AVATARS_FORM_SRC_CHANGE,
  AVATARS_GET_AVATARS,
  AVATARS_SET_AVATARS,
  AVATARS_SET_IS_LOADING,
} from "./avatars-constants";

export type TAvatarsModuleState = {
  forms: {
    avatarName: string;
    src: string;
  };
  avatars: Array<Avatars>;
  isLoading: boolean;
};

export type TAvatarsSetIsLoadingAction = {
  type: typeof AVATARS_SET_IS_LOADING;
  isLoading: boolean;
};

export type TAvatarsGetAvatarsAction = {
  type: typeof AVATARS_GET_AVATARS;
};
export type TAvatarsCreateAvatarsAction = {
  type: typeof AVATARS_CREATE_AVATAR;
};

export type TAvatarsSetAvatarsAction = {
  type: typeof AVATARS_SET_AVATARS;
  avatars: Array<Avatars>;
};
export type TAvatarsFromNameChangeAction = {
  type: typeof AVATARS_FORM_NAME_CHANGE;
  avatarName: string;
};
export type TAvatarsFromSrcChangeAction = {
  type: typeof AVATARS_FORM_SRC_CHANGE;
  src: string;
};

export type TAvatarsModuleActions =
  | TAvatarsSetIsLoadingAction
  | TAvatarsFromNameChangeAction
  | TAvatarsFromSrcChangeAction
  | TAvatarsCreateAvatarsAction
  | TAvatarsSetAvatarsAction
  | TAvatarsGetAvatarsAction;
