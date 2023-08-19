import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import { CHATS_SET_IS_LOADING, GET_CHATS, SET_CHATS } from "./chat-constants";
import { typedFetch } from "@/utils/request-utils";
import { TRootResponseData } from "@/types/root-types";
import { callTs, put } from "@/redux/sagas/saga-functions";
import { Chats } from "@prisma/client";
import Router from "next/router";
import { SHOW_NOTIFICATION } from "../notifications/notification-constants";

async function getChats() {
  return typedFetch<{}, TRootResponseData<Array<Chats>>>("/api/chat", "GET");
}

function* getChatsWorker(): SagaIterator {
  yield put({
    type: CHATS_SET_IS_LOADING,
    isLoading: true,
  });

  const response = yield* callTs(getChats);

  if (response.code === 401) {
    yield call(Router.push, "/login");
    return;
  }

  if (response.data && response.success) {
    yield put({
      type: SET_CHATS,
      chats: response.data,
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      title: response.message || "Не удалось получить чаты",
    });
  }

  yield put({
    type: CHATS_SET_IS_LOADING,
    isLoading: false,
  });
}

export function* chatsWatcher(): SagaIterator {
  yield takeEvery(GET_CHATS, getChatsWorker);
}
