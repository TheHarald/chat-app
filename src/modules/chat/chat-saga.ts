import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import {
  ADD_CHAT,
  CHATS_SET_IS_LOADING,
  CHAT_CONNECT,
  CREATE_CHAT,
  GET_CHATS,
  GET_MESSAGES,
  SET_CHATS,
  SET_MESSAGES,
} from "./chat-constants";
import { typedFetch } from "@/utils/request-utils";
import { TRootResponseData } from "@/types/root-types";
import { callTs, put, selectTs } from "@/redux/sagas/saga-functions";
import { Chats } from "@prisma/client";
import Router from "next/router";
import { SHOW_NOTIFICATION } from "../notifications/notification-constants";
import { chatsFiledsSelector } from "./chat-selectors";
import { uuidv4 } from "@/utils/uuid";
import { Socket, io } from "socket.io-client";
import { TChatMessage, TChatModuleGetMessagesAction } from "./chat-types";

export type TCreateChatRequestData = Omit<Chats, "id" | "creatorId">;

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
async function getSocket() {
  return typedFetch<{}, {}>("/api/socket", "GET");
}
async function getMessages(id: string) {
  return typedFetch<{}, TRootResponseData<Array<TChatMessage>>>(
    `/api/chat/messages/${id}`,
    "GET"
  );
}

export function isValidField(field: string) {
  const wordsMore4 = /^\w{4,}$/;
  return wordsMore4.test(field);
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

function* testSocket(): SagaIterator {
  const socket = yield* callTs(getSocket);
  console.log(socket);
  // yield call(fetch, "/api/socket");
  // socket = io();
}

function* getMessagesWorker(
  action: TChatModuleGetMessagesAction
): SagaIterator {
  yield put({
    type: CHATS_SET_IS_LOADING,
    isLoading: true,
  });
  const response = yield* callTs(getMessages, action.roomId);

  if (response.success && response.data) {
    yield put({
      type: SET_MESSAGES,
      messages: response.data,
    });
  } else {
    yield put({
      type: SHOW_NOTIFICATION,
      notification: {
        title: response.message || "Не удалось сообщения",
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
  yield takeEvery(CHAT_CONNECT, testSocket);
  yield takeEvery(GET_MESSAGES, getMessagesWorker);
}
