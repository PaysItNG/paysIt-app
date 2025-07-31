import { http } from "@/lib/utils/axiosInstance";
import { ApiResponseType } from "@/lib/utils/typeConfig";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { API_ROUTE } from "./api_route";

export const useCreateVirtualCard = () => {
  return useMutation<ApiResponseType, AxiosError>({
    mutationFn: async () => {
      const res = await http.post(API_ROUTE.create_virtual_card, {});
      return res?.data;
    },
  });
};
