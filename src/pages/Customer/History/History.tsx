    import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCustomerStore} from '@/store/useCustomerStore.ts'
import {EPackageStatus} from '@/types/customer.types.ts'
import styles from './History.module.css'

const STATUS_META: Record<EPackageStatus, { label: string; cls: string }> = {
    [EPackageStatus.WAITING]: {label: 'Đang chờ', cls: 'waiting'},
    [EPackageStatus.OPENED]: {label: 'Đã mở', cls: 'opened'},
    [EPackageStatus.RECEIVED]: {label: 'Đã nhận', cls: 'received'},
}

const formatDate = (d: Date) => {
    const date = new Date(d)
    return date.toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

export function History() {
    const navigate = useNavigate()
    const {packages, isLoading, fetchPackages, setActivePackage} = useCustomerStore()

    useEffect(() => {
        void fetchPackages()
    }, [fetchPackages])

    const handleOpenOtp = (pkg: typeof packages[0]) => {
        if (pkg.status !== EPackageStatus.WAITING) return
        setActivePackage(pkg)
        navigate('/customer/open-locker')
    }

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <div className={styles.heading}>
                    <h1 className={styles.title}>Lịch sử nhận hàng</h1>
                    <p className={styles.sub}>{packages.length} đơn hàng</p>
                </div>

                {isLoading ? (
                    <div className={styles.loadingWrap}>
                        <div className={styles.spinner}/>
                    </div>
                ) : packages.length === 0 ? (
                    <div className={styles.empty}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <p>Chưa có đơn hàng nào</p>
                    </div>
                ) : (
                    <div className={styles.list}>
                        {packages.map(pkg => {
                            const meta = STATUS_META[pkg.status]
                            const isWaiting = pkg.status === EPackageStatus.WAITING
                            return (
                                <div key={pkg.id} className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.slotBadge}>{pkg.slotId}</div>
                                        <div className={styles.cardInfo}>
                                            <p className={styles.orderCode}>{pkg.orderCode}</p>
                                            <p className={styles.shipper}>{pkg.shipperName}</p>
                                        </div>
                                        <span className={`${styles.status} ${styles[meta.cls]}`}>
                                            {meta.label}
                                        </span>
                                    </div>

                                    <div className={styles.cardBottom}>
                                        <span className={styles.location}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                                                <circle cx="12" cy="10" r="3"/>
                                            </svg>
                                            {pkg.slotLocation}
                                        </span>
                                        <span className={styles.date}>{formatDate(pkg.arrivedAt)}</span>
                                    </div>

                                    {isWaiting && (
                                        <button
                                            className={styles.otpBtn}
                                            onClick={() => handleOpenOtp(pkg)}
                                        >
                                            Nhập OTP mở tủ →
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

        </div>
    )
}