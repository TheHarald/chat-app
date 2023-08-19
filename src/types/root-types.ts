export type TRootResponseData<T = void> = {
  message?: string;
  success: boolean;
  code?: number;
  data?: T;
};
