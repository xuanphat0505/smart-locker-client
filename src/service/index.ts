import {apiService} from '../controller/service.controller'
import {ApiPath} from '../types/service.enum'
import type {TAuthResponse, TAuthSigninRequestParam, TAuthSignupRequestParam} from "@/types/auth.service.types.ts";
import type {TLockerSlot, TShipperFormData} from "@/types/locker.types.ts";
import {LockerSize} from "@/types/locker.types.ts";
import type {
    TConfirmShipmentParam,
    TConfirmShipmentResponse,
    TGetSlotsBySizeParam,
    TGetSlotsResponse,
    TVerifyOtpParam,
    TVerifyOtpResponse
} from "@/types/locker.service.types.ts";

export async function signInRequest(params: TAuthSigninRequestParam): Promise<TAuthResponse> {
    return apiService.postRequest<TAuthResponse>(ApiPath.SignIn, params)
}

export async function signUpRequest(params: TAuthSignupRequestParam): Promise<TAuthResponse> {
    return apiService.postRequest<TAuthResponse>(ApiPath.SignUp, params)
}

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(new Error('Đọc file thất bại'))
        reader.readAsDataURL(file)
    })


export async function getSlots(): Promise<TGetSlotsResponse> {
    return apiService.getRequest<TGetSlotsResponse>(ApiPath.Lockers)
}

export async function getSlotsBySize(size: LockerSize): Promise<TGetSlotsResponse> {
    return apiService.getRequest<TGetSlotsResponse>(ApiPath.Lockers, {size} satisfies TGetSlotsBySizeParam)
}

export async function confirmShipment(
    slot: TLockerSlot,
    form: TShipperFormData,
): Promise<TConfirmShipmentResponse> {
    const photoUrl = form.photoFile ? await toBase64(form.photoFile) : ''

    const body: TConfirmShipmentParam = {
        slotId: slot._id ?? slot.id,
        recipientName: form.recipientName,
        recipientPhone: form.recipientPhone,
        note: form.note ?? '',
        photoUrl,
    }

    return apiService.postRequest<TConfirmShipmentResponse>(ApiPath.Shipments, body)
}

export async function verifyOTP(otpCode: string): Promise<TVerifyOtpResponse> {
    return apiService.postRequest<TVerifyOtpResponse>(ApiPath.VerifyOTP, {otpCode} satisfies TVerifyOtpParam)
}