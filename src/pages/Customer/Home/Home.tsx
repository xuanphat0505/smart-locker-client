import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCustomerStore} from '@/store/useCustomerStore.ts'
import {EPackageStatus} from '@/types/customer.types.ts'
import {MOCK_CUSTOMER_NAME} from "@/data/customer.mock.ts";
import styles from './Home.module.css'

const timeAgo = (d: Date) => {
    const diff = Math.floor((Date.now() - d.getTime()) / 60000)
    if (diff < 60) return `${diff} phút trước`
    if (diff < 1440) return `${Math.floor(diff / 60)} giờ trước`
    return `${Math.floor(diff / 1440)} ngày trước`
}

export function CustomerHome() {
    const navigate = useNavigate()
    const {packages, isLoading, fetchPackages, setActivePackage} = useCustomerStore()

    useEffect(() => {
        void fetchPackages()
    }, [fetchPackages])

    const waiting = packages.filter(p => p.status === EPackageStatus.WAITING)
    const allWaiting = waiting.length

    const handleOpenOtp = (pkg: typeof packages[0]) => {
        setActivePackage(pkg)
        navigate('/customer/open-locker')
    }

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <div className={styles.greeting}>
                    <div>
                        <p className={styles.greetSub}>Xin chào,</p>
                        <h1 className={styles.greetName}>{MOCK_CUSTOMER_NAME}</h1>
                        <p className={styles.greetDate}>
                            {new Date().toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className={styles.avatar}>{MOCK_CUSTOMER_NAME.charAt(0)}</div>
                </div>

                {allWaiting > 0 && (
                    <div className={styles.banner}>
                        <p className={styles.bannerLabel}>HÀNG ĐANG CHỜ BẠN</p>
                        <p className={styles.bannerCount}>{allWaiting} đơn hàng</p>
                        <p className={styles.bannerSub}>
                            Ngăn {waiting[0].slotId} · {waiting[0].slotLocation}
                        </p>
                    </div>
                )}

                <div className={styles.quickWrap}>
                    <p className={styles.sectionTitle}>Truy cập nhanh</p>
                    <div className={styles.quickGrid}>
                        <button className={styles.quickBtn} onClick={() => navigate('/customer/open-locker')}>
                            <span className={styles.quickIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                                </svg>
                            </span>
                            <span className={styles.quickLabel}>Nhập OTP</span>
                            <span className={styles.quickSub}>Mở tủ lấy hàng</span>
                        </button>
                        <button className={styles.quickBtn} onClick={() => navigate('/customer/history')}>
                            <span className={styles.quickIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                            </span>
                            <span className={styles.quickLabel}>Lịch sử</span>
                            <span className={styles.quickSub}>Đơn đã nhận</span>
                        </button>
                    </div>
                </div>

                <div className={styles.listWrap}>
                    <div className={styles.listHeader}>
                        <p className={styles.sectionTitle}>Hàng đang chờ</p>
                        <button className={styles.viewAll}>Xem tất cả</button>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}/>
                        </div>
                    ) : waiting.length === 0 ? (
                        <p className={styles.empty}>Không có hàng đang chờ</p>
                    ) : (
                        waiting.map(pkg => (
                            <button
                                key={pkg.id}
                                className={styles.pkgCard}
                                onClick={() => handleOpenOtp(pkg)}
                            >
                                <div className={styles.pkgSlot}>{pkg.slotId}</div>
                                <div className={styles.pkgInfo}>
                                    <p className={styles.pkgCode}>{pkg.orderCode} · {pkg.shipperName}</p>
                                    <p className={styles.pkgTime}>{timeAgo(pkg.arrivedAt)}</p>
                                </div>
                                <span className={styles.pkgBadge}>Mới</span>
                            </button>
                        ))
                    )}
                </div>
            </div>

        </div>
    )
}