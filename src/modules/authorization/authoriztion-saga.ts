import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import { callTs, put, selectTs } from "../../redux/sagas/saga-functions";
import { typedFetch } from "@/utils/request-utils";
import { setCookie } from "@/utils/cookie-utils";
import { SHOW_NOTIFICATION } from "@/modules/notifications/notification-constants";
import { TRootResponseData, TUserInfo } from "@/types/root-types";
import {
  AUTHORIZATION_CHECK_AUTH,
  AUTHORIZATION_GET_USER_INFO,
  AUTHORIZATION_SET_IS_AUTHORIZED,
  AUTHORIZATION_SET_USER_INFO,
  AUTORIZATION_SET_IS_LOADING,
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "./authorization-constants";
import { authorizationFormsSelector } from "./authorization-selectors";
import Router from "next/router";
import { uuidv4 } from "@/utils/uuid";

type LoginRequestData = {
  name: string;
  password: string;
};

type RegisterRequestData = {
  name: string;
  password: string;
};

async function logIn(data: LoginRequestData) {
  return typedFetch<LoginRequestData, TRootResponseData>(
    "/api/login",
    "POST",
    data
  );
}
async function registerAccount(data: RegisterRequestData) {
  return typedFetch<RegisterRequestData, TRootResponseData>(
    "/api/register",
    "POST",
    data
  );
}

async function checkAuth() {
  return typedFetch<{}, TRootResponseData>("/api/check-auth", "GET");
}
async function getUserInfo() {
  return typedFetch<{}, TRootResponseData<TUserInfo>>(
    "/api/users/user-info",
    "GET"
  );
}

export function isValidField(field: string) {
  const englishMore4 = /^[A-Za-z0-9]{4,}$/;
  return englishMore4.test(field);
}

function* LogInWorker(): SagaIterator {
  const { name, password } = yield* selectTs(authorizationFormsSelector);

  if (!isValidField(name) && !isValidField(password)) {
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

  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: true,
  });

  const response = yield* callTs(logIn, { name, password });

  if (response.data && response.success) {
    setCookie("token", response.data);
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "Авторизация прошла успешно",
        isVisible: true,
        id: uuidv4(),
      },
    });
    yield call(Router.push, "/");
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "Ошибка при авторизации",
        isVisible: true,
        id: uuidv4(),
      },
    });
  }
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: false,
  });
  yield put({
    type: AUTHORIZATION_SET_IS_AUTHORIZED,
    isAuthorized: true,
  });
}

function* RegisterWorker(): SagaIterator {
  const { name, password } = yield* selectTs(authorizationFormsSelector);

  if (!isValidField(name) && !isValidField(password)) {
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

  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: true,
  });

  const response = yield* callTs(registerAccount, { name, password });
  yield put({
    type: SHOW_NOTIFICATION,
    notification: {
      title: response.message || "Регистрация прошла успешно",
      isVisible: true,
      id: uuidv4(),
    },
  });
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: false,
  });
}

function* checkAuthWorker(): SagaIterator {
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: true,
  });

  const response = yield* callTs(checkAuth);

  if (response.success) {
    yield put({
      type: AUTHORIZATION_SET_IS_AUTHORIZED,
      isAuthorized: true,
    });
  } else {
    yield put({
      type: AUTHORIZATION_SET_IS_AUTHORIZED,
      isAuthorized: false,
    });

    yield call(Router.push, "/login");
  }

  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: false,
  });
}

function* getUserInfoWorker(): SagaIterator {
  yield put({
    type: AUTORIZATION_SET_IS_LOADING,
    isLoading: true,
  });

  const response = yield* callTs(getUserInfo);

  if (response.success && response.data) {
    yield put({
      type: AUTHORIZATION_SET_USER_INFO,
      userInfo: response.data,
    });

    yield put({
      type: AUTHORIZATION_SET_IS_AUTHORIZED,
      isAuthorized: true,
    });
  } else {
    yield put({
      type: AUTHORIZATION_SET_IS_AUTHORIZED,
      isAuthorized: false,
    });

    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title:
          response.message ||
          "При получении данных пользователя что-то пошло не так",
        isVisible: true,
        id: uuidv4(),
      },
    });
  }
}

export function* authorizationWorker(): SagaIterator {
  yield takeEvery(LOGIN_ACCOUNT_ACTION, LogInWorker);
  yield takeEvery(REGISTER_ACCOUNT_ACTION, RegisterWorker);
  yield takeEvery(AUTHORIZATION_CHECK_AUTH, checkAuthWorker);
  yield takeEvery(AUTHORIZATION_GET_USER_INFO, getUserInfoWorker);
}
