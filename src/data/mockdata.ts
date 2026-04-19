import type {TLockerSlot} from '@/types/locker.types'
import {LockerSize, SlotStatus} from '@/types/locker.types'

export const MOCK_SLOTS: TLockerSlot[] = [
    {id: 'A1', row: 'A', col: 1, size: LockerSize.SMALL, status: SlotStatus.AVAILABLE, floor: 'Tầng 1', zone: 'Khu A'},
    {id: 'A2', row: 'A', col: 2, size: LockerSize.SMALL, status: SlotStatus.AVAILABLE, floor: 'Tầng 1', zone: 'Khu A'},
    {id: 'A3', row: 'A', col: 3, size: LockerSize.SMALL, status: SlotStatus.OCCUPIED, floor: 'Tầng 1', zone: 'Khu A'},
    {id: 'A4', row: 'A', col: 4, size: LockerSize.SMALL, status: SlotStatus.AVAILABLE, floor: 'Tầng 1', zone: 'Khu A'},
    {
        id: 'A5',
        row: 'A',
        col: 5,
        size: LockerSize.SMALL,
        status: SlotStatus.MAINTENANCE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {id: 'A6', row: 'A', col: 6, size: LockerSize.SMALL, status: SlotStatus.AVAILABLE, floor: 'Tầng 1', zone: 'Khu A'},

    {id: 'B1', row: 'B', col: 1, size: LockerSize.MEDIUM, status: SlotStatus.AVAILABLE, floor: 'Tầng 1', zone: 'Khu A'},
    {id: 'B2', row: 'B', col: 2, size: LockerSize.MEDIUM, status: SlotStatus.OCCUPIED, floor: 'Tầng 1', zone: 'Khu A'},
    {

        id: 'B3',
        row: 'B',
        col: 3,
        size: LockerSize.MEDIUM,
        status: SlotStatus.AVAILABLE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {
        id: 'B4',
        row: 'B',
        col: 4,
        size: LockerSize.MEDIUM,
        status: SlotStatus.AVAILABLE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {

        id: 'B5',
        row: 'B',
        col: 5,
        size: LockerSize.MEDIUM,
        status: SlotStatus.OCCUPIED,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {

        id: 'B6',
        row: 'B',
        col: 6,
        size: LockerSize.MEDIUM,
        status: SlotStatus.AVAILABLE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },

    {

        id: 'C1',
        row: 'C',
        col: 1,
        size: LockerSize.LARGE,
        status: SlotStatus.AVAILABLE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {

        id: 'C2',
        row: 'C',
        col: 2,
        size: LockerSize.LARGE,
        status: SlotStatus.OCCUPIED,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {

        id: 'C3',
        row: 'C',
        col: 3,
        size: LockerSize.LARGE,
        status: SlotStatus.MAINTENANCE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
    {

        id: 'C4',
        row: 'C',
        col: 4,
        size: LockerSize.LARGE,
        status: SlotStatus.AVAILABLE,
        floor: 'Tầng 1',
        zone: 'Khu A'
    },
]