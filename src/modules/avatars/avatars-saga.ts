import { SagaIterator } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import {
  AVATARS_CREATE_AVATAR,
  AVATARS_GET_AVATARS,
  AVATARS_SET_AVATARS,
  AVATARS_SET_IS_LOADING,
} from "./avatars-constants";
import { typedFetch } from "@/utils/request-utils";
import { Avatars } from "@prisma/client";
import { TRootResponseData } from "@/types/root-types";
import { callTs, put, selectTs } from "@/redux/sagas/saga-functions";
import { SHOW_NOTIFICATION } from "../notifications/notification-constants";
import { uuidv4 } from "@/utils/uuid";
import { avatarsFormsSelector } from "./avatars-selectors";

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

export function* createAwatarWorker(): SagaIterator {
  const { src, avatarName } = yield* selectTs(avatarsFormsSelector);
  console.log({ src, avatarName });

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
        title: "при создании аватара произошла ошибка.",
        isVisible: true,
        id: uuidv4(),
      },
    });
    yield put({
      type: AVATARS_GET_AVATARS,
    });
  }
}

export function* avatarsWatcher(): SagaIterator {
  yield takeEvery(AVATARS_GET_AVATARS, getAvatarsWorker);
  yield takeEvery(AVATARS_CREATE_AVATAR, createAwatarWorker);
}
