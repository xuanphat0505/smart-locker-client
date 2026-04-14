import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import type {TCustomerPackage, TOpenLockerResult} from '@/types/customer.types'
import {EPackageStatus} from '@/types/customer.types'
import {MOCK_PACKAGES, MOCK_VALID_OTP} from '@/data/customer.mock.ts'

type TCustomerState = {
    packages: TCustomerPackage[]
    activePackage: TCustomerPackage | null
    otpDigits: string[]
    openResult: TOpenLockerResult | null

    isLoading: boolean
    isVerifying: boolean
    error: string | null
    otpError: string | null

    fetchPackages: () => Promise<void>
    setActivePackage: (pkg: TCustomerPackage) => void
    inputOtpDigit: (digit: string) => void
    deleteOtpDigit: () => void
    clearOtp: () => void
    submitOtp: () => Promise<void>
    resetOpenResult: () => void
}

export const useCustomerStore = create<TCustomerState>()(
    devtools(
        (set, get) => ({
            packages: [],
            activePackage: null,
            otpDigits: [],
            openResult: null,

            isLoading: false,
            isVerifying: false,
            error: null,
            otpError: null,

            fetchPackages: async () => {
                set({isLoading: true, error: null})
                try {
                    await new Promise(r => setTimeout(r, 400))
                    // TODO: thay bằng API thật
                    // const res = await apiService.get<TApiResponse<TCustomerPackage[]>>(ApiPath.Packages)
                    // if (!res.success || !res.data) throw new Error(res.error)
                    set({packages: MOCK_PACKAGES, isLoading: false})
                } catch (e) {
                    set({
                        error: e instanceof Error ? e.message : 'Không tải được dữ liệu',
                        isLoading: false,
                    })
                }
            },

            setActivePackage: (pkg) =>
                set({activePackage: pkg, otpDigits: [], otpError: null}),

            inputOtpDigit: (digit) => {
                const {otpDigits} = get()
                if (otpDigits.length >= 6) return
                set({otpDigits: [...otpDigits, digit], otpError: null})
            },

            deleteOtpDigit: () => {
                const {otpDigits} = get()
                set({otpDigits: otpDigits.slice(0, -1), otpError: null})
            },

            clearOtp: () => set({otpDigits: [], otpError: null}),

            submitOtp: async () => {
                const {otpDigits, activePackage} = get()

                if (otpDigits.length < 6) {
                    set({otpError: 'Vui lòng nhập đủ 6 chữ số'})
                    return
                }
                if (!activePackage) {
                    set({otpError: 'Không tìm thấy thông tin kiện hàng'})
                    return
                }

                set({isVerifying: true, otpError: null})

                try {
                    await new Promise(r => setTimeout(r, 700))
                    const entered = otpDigits.join('')

                    // TODO: thay bằng API thật
                    // const res = await apiService.post<TApiResponse<TOpenLockerResult>>(
                    //     ApiPath.CustomerVerifyOTP, { otpCode: entered }
                    // )
                    // if (!res.success || !res.data) throw new Error(res.error)

                    if (entered !== MOCK_VALID_OTP) {
                        set({isVerifying: false, otpError: 'Mã OTP không đúng, vui lòng thử lại'})
                        return
                    }

                    set({
                        isVerifying: false,
                        openResult: {
                            slotId: activePackage.slotId,
                            orderCode: activePackage.orderCode,
                            shipperName: activePackage.shipperName,
                            location: activePackage.slotLocation,
                            otpSentVia: ['Zalo', 'SMS'],
                            openedAt: new Date(),
                        },
                        packages: get().packages.map(p =>
                            p.id === activePackage.id
                                ? {...p, status: EPackageStatus.OPENED}
                                : p
                        ),
                    })
                } catch (e) {
                    set({
                        isVerifying: false,
                        otpError: e instanceof Error ? e.message : 'Có lỗi xảy ra, vui lòng thử lại',
                    })
                }
            },

            resetOpenResult: () =>
                set({openResult: null, activePackage: null, otpDigits: []}),
        }),
        {name: 'CustomerStore'},
    ),
)