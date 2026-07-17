import { useNavigate } from 'react-router-dom'
import { useShipperStore } from '@/store/userShiperStore'
import { LockerSize } from '@/types/locker.types'
import { CursorGrid } from '@/components/Ui/CursorGrid/CursorGrid'
import styles from './Success.module.css'

const SIZE_SHORT: Record<LockerSize, string> = {
    [LockerSize.SMALL]:  'Size S',
    [LockerSize.MEDIUM]: 'Size M',
    [LockerSize.LARGE]:  'Size L',
}

const formatTime = (d: Date) => {
    const hh = d.getHours().toString().padStart(2, '0')
    const mm = d.getMinutes().toString().padStart(2, '0')
    const dd = d.getDate().toString().padStart(2, '0')
    const mo = (d.getMonth() + 1).toString().padStart(2, '0')
    return `${hh}:${mm} • ${dd}/${mo}/${d.getFullYear()}`
}

export function Success() {
    const navigate = useNavigate()
    const { shipmentResult, resetAll } = useShipperStore()

    if (!shipmentResult) {
        navigate('/shipper')
        return null
    }

    const handleSendMore = () => { resetAll(); navigate('/shipper') }
    const handleDone     = () => { resetAll(); navigate('/') }

    return (
        <div className={`page ${styles.page}`}>
            <CursorGrid />
            <header className={styles.topbar}>
                <div className={styles.brand}>
                    <span className={styles.brandName}>SmartLocker</span>
                    <span className={styles.brandBadge}>SHIPPER</span>
                </div>
                <button className="icon-btn" onClick={handleDone}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </header>

            <div className={styles.body}>
                <div className={styles.splitLayout}>
                    <div className={styles.leftCol}>
                        <div className={styles.anim}>
                            <div className={styles.ring}/>
                            <div className={styles.circle}>
                                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                        </div>

                        <div className={styles.texts}>
                            <h2 className={styles.title}>Gửi hàng thành công!</h2>
                            <p className={styles.sub}>Kiện hàng đã được lưu trữ an toàn trong hệ thống.</p>
                        </div>

                        <div className={`${styles.card} ${styles.cardSlot}`}>
                            <div>
                                <p className={styles.resultLabel}>SỐ TỦ</p>
                                <p className={styles.resultBig}>{shipmentResult.slotId}</p>
                            </div>
                            <div className={styles.lockedBadge}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="5" y="11" width="14" height="10" rx="2"/>
                                    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" fill="none"/>
                                </svg>
                                ĐÃ KHÓA
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.detailsGroup}>
                            <div className={styles.row}>
                                <div className={`${styles.card} ${styles.cardHalf}`}>
                                    <div className={styles.cardIcon}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="8" cy="8" r="2"/><circle cx="16" cy="16" r="2"/>
                                            <path d="M16 8H8a8 8 0 000 16M8 16h8a8 8 0 000-16"/>
                                        </svg>
                                        MÃ OTP KHÁCH
                                    </div>
                                    <p className={styles.otp}>{shipmentResult.otpCode}</p>
                                </div>
                                <div className={`${styles.card} ${styles.cardHalf}`}>
                                    <div className={styles.cardIcon}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                                        </svg>
                                        KÍCH CỠ
                                    </div>
                                    <p className={styles.size}>{SIZE_SHORT[shipmentResult.slotSize]}</p>
                                </div>
                            </div>

                            <div className={`${styles.card} ${styles.cardTime}`}>
                                <div className={styles.timeIcon}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className={styles.resultLabel}>THỜI GIAN</p>
                                    <p className={styles.timeVal}>{formatTime(new Date(shipmentResult.createdAt))}</p>
                                </div>
                                <button className={styles.infoBtn}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" y1="8" x2="12" y2="12"/>
                                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <p className={styles.footer}>🛡 HỆ THỐNG SMARTLOCKER V1.0.0</p>
                    </div>
                </div>
            </div>

            <footer className="page-footer">
                <button className="btn btn--primary" onClick={handleSendMore}>GỬI TIẾP KIỆN KHÁC +</button>
                <button className={styles.btnGhost} onClick={handleDone}>HOÀN TẤT</button>
            </footer>
        </div>
    )
}