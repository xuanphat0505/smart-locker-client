import {SlotStatus} from '@/types/locker.types'
import {useShipperStore} from '@/store/userShiperStore'
import styles from './LockerGrid.module.css'

const LockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <rect x="5" y="11" width="14" height="10" rx="2"/>
        <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
)

const WrenchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a6 6 0 01-7.5 7.5l-4.5 4.5a1.5 1.5 0 01-2.1-2.1L11 12a6 6 0 017.5-7.5l-3 3-.8-.8z"/>
    </svg>
)

export function LockerGrid() {
    const {slots, selectedSize, selectedSlot, isLoading, setSelectedSlot} = useShipperStore()

    const filteredSlots = slots.filter(s => s.size === selectedSize)

    if (isLoading) return (
        <div className={styles.loading}>
            <div className={styles.spinner}/>
            <p>Đang tải dữ liệu tủ...</p>
        </div>
    )

    const rows = filteredSlots.reduce<Record<string, typeof filteredSlots>>((acc, s) => {
        acc[s.row] = [...(acc[s.row] ?? []), s]
        return acc
    }, {})

    return (
        <div className={styles.wrap}>
            <div className={styles.legend}>
                <span className={styles.legendItem}><span
                    className={`${styles.dot} ${styles.dotAvailable}`}/>Sẵn sàng</span>
                <span className={styles.legendItem}><span
                    className={`${styles.dot} ${styles.dotOccupied}`}/>Đang dùng</span>
                <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotMaintenance}`}/>Bảo trì</span>
            </div>

            <div className={styles.grid}>
                {Object.entries(rows).map(([, slotRow]) =>
                    slotRow.map(slot => {
                        const isSelected = selectedSlot?.id === slot.id
                        const canSelect = slot.status === SlotStatus.AVAILABLE
                        const slotClass = [
                            styles.slot,
                            canSelect ? styles.slotAvail : '',
                            slot.status === SlotStatus.OCCUPIED ? styles.slotOccupied : '',
                            slot.status === SlotStatus.MAINTENANCE ? styles.slotMaintenance : '',
                            isSelected ? styles.slotSelected : '',
                        ].filter(Boolean).join(' ')

                        return (
                            <button
                                key={slot.id}
                                className={slotClass}
                                disabled={!canSelect}
                                onClick={() => canSelect && setSelectedSlot(isSelected ? null : slot)}
                                aria-label={`Ngăn ${slot.id}`}
                            >
                                {slot.status === SlotStatus.AVAILABLE && <span className={styles.availDot}/>}
                                <span className={styles.slotId}>{slot.id}</span>
                                <span className={styles.slotIcon}>
                                    {slot.status === SlotStatus.MAINTENANCE ? <WrenchIcon/> : <LockIcon/>}
                                </span>
                                {isSelected && (
                                    <span className={styles.check}>
                                        <svg width="10" height="10" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8"
                                                  strokeLinecap="round"/>
                                        </svg>
                                    </span>
                                )}
                            </button>
                        )
                    })
                )}
            </div>
        </div>
    )
}