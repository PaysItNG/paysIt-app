import { http } from "@/lib/utils/axiosInstance"
import { ApiResponseType } from "@/lib/utils/typeConfig"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_ROUTE } from "./api_route"
import { AxiosError } from "axios";

// Example of a named export in @/api/kyc
export type KycStatus = {
    status: "pending" | "approved" | "rejected";
    [key:string]: unknown
  };

type SubmitKycType = FormData

export const useGetKycStatus=()=>{
    return useQuery<ApiResponseType>({
        queryKey: ["get_kyc_status"],
        queryFn: async()=>{
            const res = await http.get(API_ROUTE.kyc_verification);
            return res?.data?.data
        }
    })
}

export const useSubmitKyc=()=>{
    const queryClient = useQueryClient();
    return useMutation<ApiResponseType, AxiosError, SubmitKycType>({
        mutationFn: async(payload)=>{
            const res = await http.put(API_ROUTE.kyc_verification, payload)
            return res?.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(
                {
                queryKey: ["get_kyc_status", "user_profile"]
            })
        }
    })
}



export const useGetUserKyc=()=>{
    return useQuery<ApiResponseType>({
        queryKey: ["admin_get_kyc"],
        queryFn: async()=>{
            const res = await http.get(API_ROUTE.admin_get_kyc);
            return res?.data?.data || []
        }
    })
}