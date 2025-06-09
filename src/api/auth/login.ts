import { http } from "@/lib/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { API_ROUTE } from "../api_route";
import { ApiResponseType } from "@/lib/utils/typeConfig";

type LoginPayload = {
  email: string;
  password: string;
};

type RefreshPayload = {
  refresh: string;
};

export const useLoginUser = () => {
  return useMutation<ApiResponseType, AxiosError, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await http.post<ApiResponseType>(
        API_ROUTE.login,
        payload
      );
      return response.data;
    },
  });
};

export const useRefreshToken = () => {
  return useMutation<ApiResponseType, AxiosError, RefreshPayload>({
    mutationFn: async (payload) => {
      const response = await http.post<ApiResponseType>(
        API_ROUTE.refreshToken,
        payload
      );
      return response?.data;
    },
  });
};

type GooglgeAuthTokenPayload = {
  access_token: string;
};

export const useGoogleAuthToken = () => {
  return useMutation<ApiResponseType, AxiosError, GooglgeAuthTokenPayload>({
    mutationFn: async (payload) => {
      const response = await http.post<ApiResponseType>(
        API_ROUTE.google_auth,
        payload
      );
      return response.data;
    },
  });
};
