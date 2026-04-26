import {apiService} from '../controller/service.controller'
import {ApiPath} from '../types/service.enum'
import type {TLockerSlot, TShipperFormData} from "@/types/locker.types.ts";
import {LockerSize} from "@/types/locker.types.ts";
import {TAuthResponse, TAuthSigninRequestParam, TAuthSignupRequestParam} from "@/types/auth.service.types.ts";
import type {
    TConfirmShipmentParam,
    TConfirmShipmentResponse,
    TGetSlotsBySizeParam,
    TGetSlotsResponse,
    TVerifyOtpParam,
    TVerifyOtpResponse
} from "@/types/locker.service.types.ts";
import {MOCK_USERS, mockSignIn} from '@/data/auth.mock.ts'

// export async function signInRequest(params: TAuthSigninRequestParam): Promise<TAuthResponse> {
//     return apiService.post<TAuthResponse>(ApiPath.SignIn, params)
// }
//
// export async function signUpRequest(params: TAuthSignupRequestParam): Promise<TAuthResponse> {
//     return apiService.post<TAuthResponse>(ApiPath.SignUp, params)
// }

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(new Error('Đọc file thất bại'))
        reader.readAsDataURL(file)
    })

export async function signInRequest(params: TAuthSigninRequestParam): Promise<TAuthResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockSignIn(params))
        }, 300)
    })
}

export async function signUpRequest(params: TAuthSignupRequestParam): Promise<TAuthResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const existed = MOCK_USERS.find(
                (item) =>
                    item.email.toLowerCase() === params.email.trim().toLowerCase() &&
                    item.role === params.role,
            )

            if (existed) {
                resolve({
                    success: false,
                    token: '',
                    user: {
                        id: '',
                        name: '',
                        email: '',
                        role: params.role,
                    },
                    message: 'Email đã tồn tại trong mock data',
                })
                return
            }

            resolve({
                success: true,
                token: `mock-token-${params.role.toLowerCase()}-${Date.now()}`,
                user: {
                    id: `mock-${Date.now()}`,
                    name: params.name,
                    email: params.email,
                    phone: params.phone,
                    role: params.role,
                },
                message: 'Đăng ký mock thành công',
            })
        }, 300)
    })
}

export async function getSlots(): Promise<TGetSlotsResponse> {
    return apiService.get<TGetSlotsResponse>(ApiPath.Lockers)
}

export async function getSlotsBySize(size: LockerSize): Promise<TGetSlotsResponse> {
    return apiService.get<TGetSlotsResponse>(ApiPath.Lockers, {size} satisfies TGetSlotsBySizeParam)
}

export async function confirmShipment(
    slot: TLockerSlot,
    form: TShipperFormData,
): Promise<TConfirmShipmentResponse> {
    const photoUrl = form.photoFile ? await toBase64(form.photoFile) : ''

    const body: TConfirmShipmentParam = {
        slotId: slot.id,
        recipientName: form.recipientName,
        recipientPhone: form.recipientPhone,
        note: form.note ?? '',
        photoUrl,
    }

    return apiService.post<TConfirmShipmentResponse>(ApiPath.Shipments, body)
}

export async function verifyOTP(otpCode: string): Promise<TVerifyOtpResponse> {
    return apiService.post<TVerifyOtpResponse>(ApiPath.VerifyOTP, {otpCode} satisfies TVerifyOtpParam)
}