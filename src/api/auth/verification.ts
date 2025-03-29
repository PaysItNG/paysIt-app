import { http } from "@/lib/utils/axiosInstance"
import { ApiResponseType } from "@/lib/utils/typeConfig"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { API_ROUTE } from "../api_route"

type ActivateAccountPayloadType = {
    otp: string,
    email: string
}

export const useActivateAccount=()=>{
   return useMutation<ApiResponseType, AxiosError, ActivateAccountPayloadType>({
        mutationFn: async(payload)=>{
            const response = await http.post<ApiResponseType>(API_ROUTE.activate_account, payload);
            return response?.data
        }
   })
}