import { http } from "@/lib/utils/axiosInstance";
import { ApiResponseType } from "@/lib/utils/typeConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "./api_route";
import { AxiosError } from "axios";

type DataPlanParamType = {
  service_id: string;
  service_type: string;
};

type VerifyCardPayloadType = {
  service_id: string;
  service_type: string;
  meter_no?: string;
  card_no?: string;
};

type BuyServiceTypes = {
  [key: string]: unknown;
};

export const useGetDataPlans = () => {
  return useMutation<ApiResponseType, AxiosError, DataPlanParamType>({
    mutationFn: async (payload) => {
      const { service_id, service_type } = payload;
      const res = await http.get(API_ROUTE.get_vtu_services, {
        params: {
          service_id,
          service_type,
        },
      });
      return res?.data;
    },
  });
};
export const useVerifyCardNumber = () => {
  return useMutation<ApiResponseType, AxiosError, VerifyCardPayloadType>({
    mutationFn: async (payload) => {
      const res = await http.post(API_ROUTE.verify_card_number, payload);
      return res?.data;
    },
  });
};

export const useGetCableServices = (service_id: string) => {
  return useQuery({
    queryKey: [`cables_services${service_id}`],
    queryFn: async () => {
      const res = await http.get(API_ROUTE.get_vtu_services, {
        params: {
          service_id,
        },
      });
      return res?.data;
    },
  });
};
export const useBuyUtilityService = () => {
  return useMutation<ApiResponseType, AxiosError, BuyServiceTypes>({
    mutationFn: async (payload) => {
      const res = await http.post(API_ROUTE.buy_utility_service, payload);
      return res?.data;
    },
  });
};
