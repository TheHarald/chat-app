import { SagaIterator } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import {
  AVATARS_CHANGE_AVATAR,
  AVATARS_CREATE_AVATAR,
  AVATARS_GET_AVATARS,
  AVATARS_SET_AVATARS,
  AVATARS_SET_IS_LOADING,
} from "./avatars-constants";
import { typedFetch } from "@/utils/request-utils";
import { Avatars } from "@prisma/client";
import { TRootResponseData, TUserInfo } from "@/types/root-types";
import { callTs, put, selectTs } from "@/redux/sagas/saga-functions";
import { SHOW_NOTIFICATION } from "../notifications/notification-constants";
import { uuidv4 } from "@/utils/uuid";
import { avatarsFormsSelector } from "./avatars-selectors";
import { TAvatarsChangeAvatarAction } from "./avatars-types";
import { AUTHORIZATION_SET_USER_INFO } from "../authorization/authorization-constants";

async function getAvatars() {
  return typedFetch<{}, TRootResponseData<Array<Avatars>>>(
    "/api/avatars",
    "GET"
  );
}

type TAvatarsRequestData = {
  label: string;
  src: string;
};

async function createAvatar(data: TAvatarsRequestData) {
  return typedFetch<TAvatarsRequestData, TRootResponseData<Avatars>>(
    "/api/avatars",
    "POST",
    data
  );
}

export function* getAvatarsWorker(): SagaIterator {
  yield put({
    type: AVATARS_SET_IS_LOADING,
    isLoading: true,
  });

  const response = yield* callTs(getAvatars);

  if (response.success && response.data) {
    yield put({
      type: AVATARS_SET_AVATARS,
      avatars: response.data,
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "Не удалось получить автары",
        isVisible: true,
        id: uuidv4(),
      },
    });
  }

  yield put({
    type: AVATARS_SET_IS_LOADING,
    isLoading: false,
  });
}

export function isValidField(field: string) {
  const englishMore4 = /^[A-Za-z0-9]{4,}$/;
  return englishMore4.test(field);
}

export function* createAvatarWorker(): SagaIterator {
  const { src, avatarName } = yield* selectTs(avatarsFormsSelector);

  if (!isValidField(src) && !isValidField(avatarName)) {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: "Поля заполнены неверно, а как думай сам.",
        isVisible: true,
        id: uuidv4(),
      },
    });
    return;
  }

  const response = yield* callTs(createAvatar, {
    label: avatarName,
    src,
  });

  if (response.success) {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: "Аватар успешно создан.",
        isVisible: true,
        id: uuidv4(),
      },
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: "При создании аватара произошла ошибка.",
        isVisible: true,
        id: uuidv4(),
      },
    });
    yield put({
      type: AVATARS_GET_AVATARS,
    });
  }
}

type UpdateAvatarData = {
  avatarId: string;
};

async function updateUserAvatar(data: UpdateAvatarData) {
  return typedFetch<UpdateAvatarData, TRootResponseData<TUserInfo>>(
    "/api/users/user-info",
    "PATCH",
    data
  );
}

export function* editAvatarWorker(
  action: TAvatarsChangeAvatarAction
): SagaIterator {
  console.log(action);
  const { avatarId } = action;
  const response = yield* callTs(updateUserAvatar, { avatarId });
  if (response.success && response.data) {
    yield put({
      type: AUTHORIZATION_SET_USER_INFO,
      userInfo: response.data,
    });
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "Аватар успешно обновлён",
        isVisible: true,
        id: uuidv4(),
      },
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "При обновлении автара что-то пошло не так",
        isVisible: true,
        id: uuidv4(),
      },
    });
  }
}

export function* avatarsWatcher(): SagaIterator {
  yield takeEvery(AVATARS_GET_AVATARS, getAvatarsWorker);
  yield takeEvery(AVATARS_CREATE_AVATAR, createAvatarWorker);
  yield takeEvery(AVATARS_CHANGE_AVATAR, editAvatarWorker);
}
