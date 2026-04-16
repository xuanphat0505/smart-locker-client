import type {LockerSize, TLockerSlot, TShipmentResult} from "@/types/locker.types.ts";
import type {TApiResponse} from '@/types/api.types.ts'

export type TGetSlotsResponse = TApiResponse<TLockerSlot[]>
export type TGetSlotsBySizeParam = { size: LockerSize }

export type TConfirmShipmentParam = {
    slotId: string
    recipientName: string
    recipientPhone: string
    note: string
    photoUrl: string
}
export type TConfirmShipmentResponse = TApiResponse<TShipmentResult>

export type TVerifyOtpParam = { otpCode: string }
export type TVerifyOtpResponse = TApiResponse<unknown>