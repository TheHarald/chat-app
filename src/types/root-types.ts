export type TRootResponseData<T = void> = {
  message?: string;
  success: boolean;
  data?: T;
};
