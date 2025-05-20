import { ApiResponseType } from "@/lib/utils/typeConfig";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "../api_route";
import { http } from "@/lib/utils/axiosInstance";

type ParamTypes = {
  [key: string]: unknown;
};

export const useGetTransactions = (params: ParamTypes) => {
  return useQuery<ApiResponseType>({
    queryKey: ["get_transactions"],
    queryFn: async () => {
      const res = await http.get(API_ROUTE.get_transactions, {
        params,
      });
      return res?.data;
    },
  });
};
