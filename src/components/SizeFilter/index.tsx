import { LockerSize, SIZE_META } from '@/types/locker.types'
import { useShipperStore } from '@/store/userShiperStore'
import styles from './SizeFilter.module.css'

const SizeIcons: Record<LockerSize, React.ReactNode> = {
    [LockerSize.SMALL]: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="8" width="10" height="12" rx="1"/>
            <path d="M15 10h3a1 1 0 011 1v9H8"/>
        </svg>
    ),
    [LockerSize.MEDIUM]: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="6" width="12" height="14" rx="1"/>
            <path d="M16 8h3a1 1 0 011 1v11H7"/>
        </svg>
    ),
    [LockerSize.LARGE]: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="14" height="16" rx="1"/>
            <path d="M17 7h3a1 1 0 011 1v12H6"/>
        </svg>
    ),
}

export function SizeFilter() {
    const { selectedSize, setSelectedSize, fetchSlotsBySize } = useShipperStore()

    const handleSelect = (size: LockerSize) => {
        setSelectedSize(size)
        void fetchSlotsBySize(size)
    }

    return (
        <div className={styles.wrap}>
            <p className={styles.label}>KÍCH THƯỚC TỦ</p>
            <div className={styles.grid}>
                {(Object.values(LockerSize) as LockerSize[]).map(size => {
                    const meta   = SIZE_META[size]
                    const active = selectedSize === size
                    return (
                        <button
                            key={size}
                            className={`${styles.btn} ${active ? styles.btnActive : ''}`}
                            onClick={() => handleSelect(size)}
                        >
                            <span className={styles.btnIcon}>{SizeIcons[size]}</span>
                            <span className={styles.btnName}>{meta.label}</span>
                            <span className={styles.btnDim}>{meta.dimensions}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}