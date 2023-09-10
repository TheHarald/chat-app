import createSagaMiddlware from "redux-saga";
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { fork } from "redux-saga/effects";
import { authorizationWorker } from "../modules/authorization/authoriztion-saga";
import { notificationReducer } from "@/modules/notifications/notification-reducer";
import { authorizationReducer } from "@/modules/authorization/authorization-reducer";
import { chatsReducer } from "@/modules/chat/chat-reducer";
import { chatsWatcher } from "@/modules/chat/chat-saga";
import { avatarsReducer } from "@/modules/avatars/avatars-reducer";
import { avatarsWatcher } from "@/modules/avatars/avatars-saga";

const rootReducer = combineReducers({
  notifications: notificationReducer,
  authorization: authorizationReducer,
  chats: chatsReducer,
  avatars: avatarsReducer,
});

function* rootSaga() {
  yield fork(authorizationWorker);
  yield fork(chatsWatcher);
  yield fork(avatarsWatcher);
}

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const sagaMiddlware = createSagaMiddlware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddlware],
    preloadedState,
  });

  sagaMiddlware.run(rootSaga);

  return store;
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
