import { LockerSize, SlotStatus } from '@/types/locker.types'
import type { TLockerSlot } from '@/types/locker.types'

export const MOCK_SLOTS: TLockerSlot[] = [
    { _id: 'mock-A1', id: 'A1', row: 'A', col: 1, size: LockerSize.SMALL,  status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-A2', id: 'A2', row: 'A', col: 2, size: LockerSize.SMALL,  status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-A3', id: 'A3', row: 'A', col: 3, size: LockerSize.SMALL,  status: SlotStatus.OCCUPIED,    floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-A4', id: 'A4', row: 'A', col: 4, size: LockerSize.SMALL,  status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-A5', id: 'A5', row: 'A', col: 5, size: LockerSize.SMALL,  status: SlotStatus.MAINTENANCE, floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-A6', id: 'A6', row: 'A', col: 6, size: LockerSize.SMALL,  status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },

    { _id: 'mock-B1', id: 'B1', row: 'B', col: 1, size: LockerSize.MEDIUM, status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-B2', id: 'B2', row: 'B', col: 2, size: LockerSize.MEDIUM, status: SlotStatus.OCCUPIED,    floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-B3', id: 'B3', row: 'B', col: 3, size: LockerSize.MEDIUM, status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-B4', id: 'B4', row: 'B', col: 4, size: LockerSize.MEDIUM, status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-B5', id: 'B5', row: 'B', col: 5, size: LockerSize.MEDIUM, status: SlotStatus.OCCUPIED,    floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-B6', id: 'B6', row: 'B', col: 6, size: LockerSize.MEDIUM, status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },

    { _id: 'mock-C1', id: 'C1', row: 'C', col: 1, size: LockerSize.LARGE,  status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-C2', id: 'C2', row: 'C', col: 2, size: LockerSize.LARGE,  status: SlotStatus.OCCUPIED,    floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-C3', id: 'C3', row: 'C', col: 3, size: LockerSize.LARGE,  status: SlotStatus.MAINTENANCE, floor: 'Tầng 1', zone: 'Khu A' },
    { _id: 'mock-C4', id: 'C4', row: 'C', col: 4, size: LockerSize.LARGE,  status: SlotStatus.AVAILABLE,   floor: 'Tầng 1', zone: 'Khu A' },
]