import { apiService } from '../controller/service.controller'
import { ApiPath } from '../types/service.enum'
import type {
    TAuthSigninRequestParam,
    TAuthSignupRequestParam,
    TAuthResponse
} from "@/types/auth.service.type.ts";

export async function signInRequest(params: TAuthSigninRequestParam): Promise<TAuthResponse> {
    return apiService.postRequest<TAuthResponse>(ApiPath.SignIn, params)
}

export async function signUpRequest(params: TAuthSignupRequestParam): Promise<TAuthResponse> {
    return apiService.postRequest<TAuthResponse>(ApiPath.SignUp, params)
}