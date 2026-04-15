import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SizeFilter } from '@/components/SizeFilter'
import { LockerGrid } from '@/components/LockerGrid'
import { useShipperStore } from '@/store/userShiperStore'
import styles from './SelectLocker.module.css'

const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
)
const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
)

const SIZE_LABEL: Record<string, string> = { SMALL: 'Nhỏ', MEDIUM: 'Vừa', LARGE: 'Lớn' }

export function SelectLocker() {
    const navigate = useNavigate()
    const {
        selectedSlot,
        selectedSize,
        isDark,
        toggleTheme,
        fetchSlots,
    } = useShipperStore()

    // load toàn bộ slots (mock) khi mount
    useEffect(() => { void fetchSlots() }, [fetchSlots])

    return (
        <div className={`page ${styles.page}`}>
            <header className="page-header">
                <button className="back-btn" onClick={() => navigate('/')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className="page-header__title">Chọn ô tủ gửi hàng</h1>
                <button className="icon-btn" onClick={toggleTheme}>
                    {isDark ? <SunIcon/> : <MoonIcon/>}
                </button>
            </header>

            <div className="page-body">
                <SizeFilter/>
                <LockerGrid/>

                {selectedSlot && (
                    <div className={styles.summary}>
                        <div className={styles.summaryBadge}>{selectedSlot.id}</div>
                        <div className={styles.summaryInfo}>
                            <p className={styles.summaryName}>Locker {selectedSlot.id}</p>
                            <p className={styles.summaryMeta}>
                                {SIZE_LABEL[selectedSlot.size]} • {selectedSlot.floor} • {selectedSlot.zone}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <footer className="page-footer">
                <button
                    className="btn btn--primary"
                    disabled={!selectedSlot}
                    onClick={() => navigate('/shipper/package-info')}
                >
                    XÁC NHẬN GỬI HÀNG →
                </button>
            </footer>
        </div>
    )
}