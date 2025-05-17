import { http } from "@/lib/utils/axiosInstance";
import { ApiResponseType } from "@/lib/utils/typeConfig";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTE } from "./api_route";
import { AxiosError } from "axios";

type DataPlanParamType = {
  service_id: string;
  service_type: string;
};

type BuyServiceTypes = {
  [key: string]: unknown;
};

export const useGetDataPlans = () => {
  return useMutation<ApiResponseType, AxiosError, DataPlanParamType>({
    mutationFn: async (payload) => {
      const { service_id, service_type } = payload;
      const res = await http.get(API_ROUTE.get_data_plans, {
        params: {
          service_id,
          service_type,
        },
      });
      return res?.data;
    },
  });
};
export const useBuyUtilityService = () => {
  return useMutation<ApiResponseType, AxiosError, BuyServiceTypes>({
    mutationFn: async (payload) => {
      const res = await http.get(API_ROUTE.buy_utility_service, payload);
      return res?.data;
    },
  });
};
