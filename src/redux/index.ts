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

const rootReducer = combineReducers({
  notifications: notificationReducer,
  authorization: authorizationReducer,
});

function* rootSaga() {
  yield fork(authorizationWorker);
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
