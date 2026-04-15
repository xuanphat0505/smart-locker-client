import { EPackageStatus } from '@/types/customer.types'
import type { TCustomerPackage } from '@/types/customer.types'

export const MOCK_CUSTOMER_NAME = 'Văn An'

export const MOCK_PACKAGES: TCustomerPackage[] = [
    {
        id:           'pkg-01',
        orderCode:    '#GHN-2948',
        shipperName:  'Giao hàng nhanh',
        slotId:       '03',
        slotLocation: 'Tòa A · Tầng 1 · Sảnh chính',
        arrivedAt:    new Date(Date.now() - 2 * 60 * 60 * 1000),
        status:       EPackageStatus.WAITING,
    },
    {
        id:           'pkg-02',
        orderCode:    '#GHTK-5512',
        shipperName:  'Giao hàng tiết kiệm',
        slotId:       'B3',
        slotLocation: 'Tòa A · Tầng 1 · Sảnh chính',
        arrivedAt:    new Date(Date.now() - 5 * 60 * 60 * 1000),
        status:       EPackageStatus.RECEIVED,
    },
]

export const MOCK_VALID_OTP = '847295'