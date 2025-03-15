import { http } from "@/lib/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { API_ROUTE } from "../api_route";

type SignupPayload = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}
type SignupResponse = {
    status: number;
    data: {
        message: string,
        [key: string]: unknown
    }
  };
export const useLoginUser = ()=>{
    return useMutation<SignupResponse, AxiosError, SignupPayload>(
        {
        mutationFn: async (payload) => {
            const response = await http.post<SignupResponse>(API_ROUTE.signup, payload);
      return response.data;  // Simulating a resolved promise
        }
    }
    )
}