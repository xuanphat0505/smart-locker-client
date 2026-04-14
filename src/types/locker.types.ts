export enum SlotStatus {
    AVAILABLE = 'available',
    OCCUPIED = 'occupied',
    MAINTENANCE = 'maintenance',
}

export enum LockerSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

export type TLockerSlot = {
    id: string
    row: string
    col: number
    size: LockerSize
    status: SlotStatus
    floor?: string
    zone?: string
}

export type TShipperFormData = {
    recipientName: string
    recipientPhone: string
    note?: string
    photoFile?: File | null
    photoPreviewUrl?: string
}

export type TShipmentResult = {
    slotId: string
    slotSize: LockerSize
    otpCode: string
    createdAt: Date
    recipientName: string
    recipientPhone: string
}

export type TSizeMeta = {
    label: string
    dimensions: string
    icon: string
}

export const SIZE_META: Record<LockerSize, TSizeMeta> = {
    [LockerSize.SMALL]: {label: 'Small', dimensions: '40×20×30 cm', icon: 'small'},
    [LockerSize.MEDIUM]: {label: 'Medium', dimensions: '50×40×45 cm', icon: 'medium'},
    [LockerSize.LARGE]: {label: 'Large', dimensions: '80×60×50 cm', icon: 'large'},
}