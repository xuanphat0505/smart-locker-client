import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useCustomerStore} from '@/store/useCustomerStore.ts'
import styles from './OpenSuccess.module.css'

export function OpenSuccess() {
    const navigate = useNavigate()
    const {openResult, resetOpenResult} = useCustomerStore()
    useEffect(() => {
        return () => {
            resetOpenResult()
        }
    }, [])
    if (!openResult) {
        navigate('/customer');
        return null
    }

    const handleDone = () => {
        resetOpenResult();
        navigate('/customer')
    }

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <div className={styles.splitLayout}>
                    <div className={styles.leftCol}>
                        <div className={styles.animWrapper}>
                            <div className={styles.lockerBox}>
                                <div className={styles.lockerBack}>
                                    <span className={styles.packagePresent}>📦</span>
                                </div>
                                <div className={styles.lockerDoor}>
                                    <span className={styles.slotNumber}>{openResult.slotId}</span>
                                    <div className={styles.lockerHandle}></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.texts}>
                            <h2 className={styles.title}>Ngăn {openResult.slotId} đã mở!</h2>
                            <p className={styles.sub}>Lấy hàng và đóng cửa lại nhé</p>
                        </div>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.detailCard}>
                            {[
                                {label: 'Đơn hàng', value: openResult.orderCode},
                                {label: 'Shipper', value: openResult.shipperName},
                                {label: 'Ngăn', value: openResult.location},
                                {label: 'OTP đã gửi', value: openResult.otpSentVia.join(' + '), badge: true},
                                {label: 'Trạng thái cửa', value: 'Đang mở...', badge: true, open: true},
                            ].map(row => (
                                <div key={row.label} className={styles.detailRow}>
                                    <span className={styles.detailLabel}>{row.label}</span>
                                    {row.badge ? (
                                        <span className={`${styles.badge} ${row.open ? styles.badgeOpen : ''}`}>
                                            {row.value}
                                        </span>
                                    ) : (
                                        <span className={styles.detailVal}>{row.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button className={styles.historyBtn} onClick={() => navigate('/customer/history')}>
                            Xem lịch sử nhận hàng
                        </button>
                    </div>
                </div>
            </div>

            <footer className="page-footer">
                <button className="btn btn--primary" onClick={handleDone}>
                    Về trang chủ
                </button>
            </footer>

        </div>
    )
}