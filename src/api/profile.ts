import { http } from "@/lib/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE } from "./api_route";
import { ApiResponseType } from "@/lib/utils/typeConfig";
import { AxiosError } from "axios";

export const useUserProfile = () => {
  return useQuery<ApiResponseType>({
    queryKey: ["user_profile"],
    queryFn: async () => {
      const res = await http.get<ApiResponseType>(API_ROUTE.profile);
      return {
        data: res?.data?.data,
      };
    },
    // retry: false,
  });
};

type UpdateProfileType = FormData;
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponseType, AxiosError, UpdateProfileType>({
    mutationFn: async (payload) => {
      const res = await http.put(API_ROUTE.admin_update_profile, payload);
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};
