import { http } from "@/lib/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { API_ROUTE } from "./api_route"
import { ApiResponseType } from "@/lib/utils/typeConfig"

export const useUserProfile=()=>{
    return useQuery<ApiResponseType>({
        queryKey: ["user_profile"],
        queryFn: async()=>{
            const res = await http.get<ApiResponseType>(API_ROUTE.profile);
            return {
                data: res?.data?.data,
            };
        },
        // enabled: false,
    retry: false,
    })
}