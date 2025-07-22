import { ApiResponseType } from "@/lib/utils/typeConfig";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { API_ROUTE } from "./api_route";
import { http } from "@/lib/utils/axiosInstance";

type SwapCurrencyPayloadType = {
  from_currency: string;
  to_currency: string;
  amount: number;
};

export const useSwapCurrency = () => {
  return useMutation<ApiResponseType, AxiosError, SwapCurrencyPayloadType>({
    mutationFn: async (payload) => {
      const res = await http.post(API_ROUTE.swap_currency, payload);
      return res?.data;
    },
  });
};
