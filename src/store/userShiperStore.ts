import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import type {TLockerSlot, TShipmentResult, TShipperFormData} from '@/types/locker.types'
import {LockerSize} from '@/types/locker.types'
import {confirmShipment} from '@/service'
import {MOCK_SLOTS} from '@/data/mockdata.ts'

type TShipperState = {
    slots: TLockerSlot[]
    selectedSize: LockerSize
    selectedSlot: TLockerSlot | null
    formData: TShipperFormData
    shipmentResult: TShipmentResult | null

    isLoading: boolean
    isSubmitting: boolean
    error: string | null

    fetchSlots: () => Promise<void>
    fetchSlotsBySize: (size: LockerSize) => Promise<void>
    submitShipment: () => Promise<void>
    setSelectedSize: (size: LockerSize) => void
    setSelectedSlot: (slot: TLockerSlot | null) => void

    setFormField: <K extends keyof TShipperFormData>(key: K, value: TShipperFormData[K]) => void
    resetForm: () => void
    setShipmentResult: (result: TShipmentResult | null) => void
    setError: (msg: string | null) => void
    resetAll: () => void
}

const INITIAL_FORM: TShipperFormData = {
    recipientName: '',
    recipientPhone: '',
    note: '',
    photoFile: null,
    photoPreviewUrl: '',
}

export const useShipperStore = create<TShipperState>()(
    devtools(
        persist(
            (set, get) => ({
                slots: [],
                selectedSize: LockerSize.MEDIUM,
                selectedSlot: null,
                formData: INITIAL_FORM,
                shipmentResult: null,

                isLoading: false,
                isSubmitting: false,
                error: null,

                fetchSlots: async () => {
                    set({isLoading: true, error: null})
                    try {
                        await new Promise(r => setTimeout(r, 400))
                        set({slots: MOCK_SLOTS, isLoading: false})
                    } catch (e) {
                        set({
                            error: e instanceof Error ? e.message : 'Không tải được dữ liệu',
                            isLoading: false,
                        })
                    }
                },

                fetchSlotsBySize: async (size) => {
                    set({isLoading: true, error: null})
                    try {
                        await new Promise(r => setTimeout(r, 400))
                        set({
                            selectedSize: size,
                            slots: MOCK_SLOTS,
                            isLoading: false,
                        })
                    } catch (e) {
                        set({
                            error: e instanceof Error ? e.message : 'Không tải được dữ liệu',
                            isLoading: false,
                        })
                    }
                },

                submitShipment: async () => {
                    const {selectedSlot, formData} = get()
                    if (!selectedSlot) {
                        set({error: 'Chưa chọn ô locker'})
                        return
                    }

                    set({isSubmitting: true, error: null})
                    try {
                        const res = await confirmShipment(selectedSlot, formData)
                        if (!res.success || !res.data) throw new Error(res.error)
                        set({shipmentResult: res.data, selectedSlot: null})
                        get().resetForm()
                    } catch (e) {
                        set({error: e instanceof Error ? e.message : 'Gửi hàng thất bại'})
                    } finally {
                        set({isSubmitting: false})
                    }
                },

                setSelectedSize: (selectedSize) =>
                    set({selectedSize, selectedSlot: null}),

                setSelectedSlot: (selectedSlot) =>
                    set({selectedSlot}),

                setFormField: (key, value) =>
                    set(s => ({formData: {...s.formData, [key]: value}})),

                resetForm: () => set({formData: INITIAL_FORM}),

                setShipmentResult: (shipmentResult) => set({shipmentResult}),
                setError: (error) => set({error}),

                resetAll: () =>
                    set({
                        selectedSlot: null,
                        formData: INITIAL_FORM,
                        shipmentResult: null,
                        error: null,
                        isSubmitting: false,
                    }),
            }),
            {
                name: 'shipper-store',
                storage: createJSONStorage(() => localStorage),
                partialize: s => ({
                    selectedSize: s.selectedSize,
                }),
            },
        ),
        {name: 'ShipperStore'},
    ),
)
