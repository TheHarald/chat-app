import { SagaIterator } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { put } from "./saga-functions";
import { ADD_ACTION, ADD_DELAY_ACTION } from "@/types/action-constants";

function* addWithDelayWorker(): SagaIterator {
  console.log("test");
  yield put({
    type: ADD_ACTION,
    number: 3,
  });
}

export function* loadWorker(): SagaIterator {
  yield takeEvery(ADD_DELAY_ACTION, addWithDelayWorker);
}
