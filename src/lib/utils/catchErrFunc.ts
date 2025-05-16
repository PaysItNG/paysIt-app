import { AxiosError } from "axios";
import { notifier } from "./notifier";

export const catchErrFunc = (err: unknown) => {
  const error = err as AxiosError<{ message: string }>;
  notifier({
    message:
      error?.response?.data?.message ??
      error?.message ??
      "Something went wrong, please try again",
    type: "error",
  });
};
