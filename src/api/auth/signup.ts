import { http } from "@/lib/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { API_ROUTE } from "../api_route";
import { ApiResponseType } from "@/lib/utils/typeConfig";

type SignupPayload = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export const useSignupUser = ()=>{
    return useMutation<ApiResponseType, AxiosError, SignupPayload>(
        {
        mutationFn: async (payload) => {
            const response = await http.post<ApiResponseType>(API_ROUTE.signup, payload);
      return response.data;  // Simulating a resolved promise
        }
    }
    )
}