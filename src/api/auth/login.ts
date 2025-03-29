import { http } from "@/lib/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { API_ROUTE } from "../api_route";
import { ApiResponseType } from "@/lib/utils/typeConfig";

type LoginPayload = {
    email: string,
    password: string
}

export const useLoginUser = ()=>{
    return useMutation<ApiResponseType, AxiosError, LoginPayload>(
        {
        mutationFn: async (payload) => {
            const response = await http.post<ApiResponseType>(API_ROUTE.login, payload);
            return response.data;
        }
    }
    )
}
