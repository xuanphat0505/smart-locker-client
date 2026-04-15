export enum EPackageStatus {
    WAITING = 'WAITING',
    OPENED = 'OPENED',
    RECEIVED = 'RECEIVED',
}

export type TCustomerPackage = {
    id: string
    orderCode: string
    shipperName: string
    slotId: string
    slotLocation: string
    arrivedAt: Date
    status: EPackageStatus
}

export type TOpenLockerResult = {
    slotId: string
    orderCode: string
    shipperName: string
    location: string
    otpSentVia: string[]
    openedAt: Date
}