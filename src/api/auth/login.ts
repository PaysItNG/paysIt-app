import { http } from "@/lib/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { API_ROUTE } from "../api_route";

type LoginPayload = {
    email: string,
    password: string
}
type LoginResponse = {
    status: number;
    data: {
        message: string,
        [key: string]: unknown
    }
  };
export const useLoginUser = ()=>{
    return useMutation<LoginResponse, AxiosError, LoginPayload>(
        {
        mutationFn: async (payload) => {
            const response = await http.post<LoginResponse>(API_ROUTE.login, payload);
      return response.data;  // Simulating a resolved promise
        }
    }
    )
}