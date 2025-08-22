import { http } from "@/lib/utils/axiosInstance";
import { ApiResponseType } from "@/lib/utils/typeConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { API_ROUTE } from "./api_route";

type GetEphemeralKeyPayloadProp = {
  card_id: string;
  nonce: string;
};

export const useCreateVirtualCard = () => {
  return useMutation<ApiResponseType, AxiosError>({
    mutationFn: async () => {
      const res = await http.post(API_ROUTE.create_virtual_card, {});
      return res?.data;
    },
  });
};
export const useGetEphemeralKeys = () => {
  return useMutation<ApiResponseType, AxiosError, GetEphemeralKeyPayloadProp>({
    mutationFn: async (payload) => {
      const res = await http.post(API_ROUTE.get_ephemeral_keys, payload);
      return res?.data;
    },
  });
};
