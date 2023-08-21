import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import {
  ADD_CHAT,
  CHATS_SET_IS_LOADING,
  CREATE_CHAT,
  GET_CHATS,
  SET_CHATS,
} from "./chat-constants";
import { typedFetch } from "@/utils/request-utils";
import { TRootResponseData } from "@/types/root-types";
import { callTs, put, selectTs } from "@/redux/sagas/saga-functions";
import { Chats } from "@prisma/client";
import Router from "next/router";
import { SHOW_NOTIFICATION } from "../notifications/notification-constants";
import { chatsFiledsSelector } from "./chat-selectors";
import { uuidv4 } from "@/utils/uuid";

export type TCreateChatRequestData = Omit<Chats, "id">;

async function createChat(data: TCreateChatRequestData) {
  return typedFetch<TCreateChatRequestData, TRootResponseData<Chats>>(
    "/api/chat",
    "POST",
    data
  );
}

async function getChats() {
  return typedFetch<{}, TRootResponseData<Array<Chats>>>("/api/chat", "GET");
}

export function isValidField(field: string) {
  const wordhMore4 = /^\w{4,}$/;
  return wordhMore4.test(field);
}

function* createChatWorker(): SagaIterator {
  const { chatName } = yield* selectTs(chatsFiledsSelector);

  if (!isValidField(chatName)) {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: "Невалидное название чата",
        isVisible: true,
        id: uuidv4(),
      },
    });
    return;
  }

  const response = yield* callTs(createChat, { name: chatName });

  if (response.code === 401) {
    yield call(Router.push, "/login");
    return;
  }

  if (response.data && response.success) {
    yield put({
      type: ADD_CHAT,
      chat: response.data,
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "Не удалось создать чат",
        isVisible: true,
        id: uuidv4(),
      },
    });
  }
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
      notification: {
        title: response.message || "Не удалось получить чаты",
        isVisible: true,
        id: uuidv4(),
      },
    });
  }

  yield put({
    type: CHATS_SET_IS_LOADING,
    isLoading: false,
  });
}

export function* chatsWatcher(): SagaIterator {
  yield takeEvery(GET_CHATS, getChatsWorker);
  yield takeEvery(CREATE_CHAT, createChatWorker);
}
