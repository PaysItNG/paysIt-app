export type ApiResponseType = {
    status?: number;
    message?: string;
    data?: {
        message?: string,
        [key: string]: unknown
    }
    [key: string]: unknown
  };