import { SagaIterator } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import {
  AUTORIZATION_SET_IS_LOADING,
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "@/types/action-constants";
import { LoginAccountAction, RegisterAccountAction } from "@/types/redux-types";
import { callTs, put } from "./saga-functions";
import { typedFetch } from "@/utils/request-utils";
import { setCookie } from "@/utils/cookie-utils";
import { SHOW_NOTIFICATION } from "@/modules/notifications/notification-constants";

type LoginRequestData = {
  name: string;
  password: string;
};

type LoginResponseData<T> = {
  message: string;
  data?: T;
};

type RegisterRequestData = {
  name: string;
  password: string;
};

type RegisterResponseData<T = void> = {
  message: string;
  data?: T;
};

async function logIn(data: LoginRequestData) {
  return typedFetch<LoginRequestData, LoginResponseData<string>>(
    "/api/login",
    "POST",
    data
  );
}
async function registerAccount(data: RegisterRequestData) {
  return typedFetch<RegisterRequestData, RegisterResponseData>(
    "/api/register",
    "POST",
    data
  );
}

function* LogInWorker(action: LoginAccountAction): SagaIterator {
  const { name, password } = action;
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: true,
  });
  const response = yield* callTs(logIn, { name, password });
  if (response.data) {
    setCookie("token", response.data, 1);
    yield put({
      type: SHOW_NOTIFICATION,
      title: "Авторизация прошла успешно",
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      title: "Ошибка при авторизации",
    });
  }
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: false,
  });
}

function* RegisterWorker(action: RegisterAccountAction): SagaIterator {
  const { name, password } = action;
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: true,
  });
  const response = yield* callTs(registerAccount, { name, password });
  yield put({
    type: SHOW_NOTIFICATION,
    title: "Регистрация прошла успешно",
  });
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: false,
  });
}

export function* authorizationWorker(): SagaIterator {
  yield takeEvery(LOGIN_ACCOUNT_ACTION, LogInWorker);
  yield takeEvery(REGISTER_ACCOUNT_ACTION, RegisterWorker);
}
