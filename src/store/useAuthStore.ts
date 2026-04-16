import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {apiService} from '../controller/service.controller'
import {signInRequest, signUpRequest} from "@/service";
import {TUserInfo} from "../types/user.types.ts";
import {TAuthSigninRequestParam, TAuthSignupRequestParam} from "@/types/auth.service.types.ts";

type TAuthStore = {
    user: TUserInfo | null
    token: string | null
    isLoading: boolean
    error: string | null
    signIn: (params: TAuthSigninRequestParam) => Promise<boolean>
    signUp: (params: TAuthSignupRequestParam) => Promise<boolean>
    signOut: () => void
    clearError: () => void
}

export const useAuthStore = create<TAuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            signIn: async (params) => {
                set({isLoading: true, error: null})
                try {
                    const res = await signInRequest(params)
                    if (!res.success) {
                        set({error: res.message ?? 'Đăng nhập thất bại', isLoading: false})
                        return false
                    }
                    apiService.token = res.token
                    set({
                        user: {...res.user, token: res.token},
                        token: res.token,
                        isLoading: false,
                    })
                    return true
                } catch {
                    set({error: 'Lỗi kết nối server', isLoading: false})
                    return false
                }
            },

            signUp: async (params) => {
                set({isLoading: true, error: null})
                try {
                    const res = await signUpRequest(params)
                    if (!res.success) {
                        set({error: res.message ?? 'Đăng ký thất bại', isLoading: false})
                        return false
                    }
                    apiService.token = res.token
                    set({
                        user: {...res.user, token: res.token},
                        token: res.token,
                        isLoading: false,
                    })
                    return true
                } catch {
                    set({error: 'Lỗi kết nối server', isLoading: false})
                    return false
                }
            },

            signOut: () => {
                apiService.token = undefined
                set({user: null, token: null})
            },

            clearError: () => set({error: null}),
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({token: s.token, user: s.user}),
            onRehydrateStorage: () => (state) => {
                if (state?.token) {
                    apiService.token = state.token
                }
            },
        },
    ),
)