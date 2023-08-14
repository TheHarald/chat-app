import { ApplicationActions } from "@/types/redux-types";
import {
  Effect,
  PutEffect,
  put as originalPut,
  call as originalCall,
} from "redux-saga/effects";

export type SagaGenerator<RT> = Generator<Effect<any>, RT, any>;

type UnwrapReturnType<R> = R extends SagaGenerator<infer RT>
  ? RT
  : R extends Promise<infer PromiseValue>
  ? PromiseValue
  : R;

export const put: (
  action: ApplicationActions
) => PutEffect<ApplicationActions> = originalPut;

export function* callTs<Args extends any[], R>(
  fn: (...args: Args) => R,
  ...args: Args
): SagaGenerator<UnwrapReturnType<R>> {
  return yield originalCall(fn, ...args);
}
