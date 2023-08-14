import createSagaMiddlware from "redux-saga";
import {
  combineReducers,
  configureStore,
  PreloadedState,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { appReducer } from "./reducers/reducer";
import { all, fork } from "redux-saga/effects";
import { loadWorker } from "@/redux/sagas/load-worker";
import { authorizationWorker } from "./sagas/authoriztion-saga";
import { notificationReducer } from "@/modules/notifications/notification-reducer";
import { authorizationReducer } from "./reducers/authorization-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  notifications: notificationReducer,
  authorization: authorizationReducer,
});

function* rootSaga() {
  yield fork(loadWorker);
  yield fork(authorizationWorker);
  // fork(other worker)
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
