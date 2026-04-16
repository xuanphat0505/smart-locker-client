import {useNavigate} from 'react-router-dom'
import {PhotoUpload} from "@/components/Shipper/PhotoUpload";
import {useShipperStore} from '@/store/userShiperStore'
import styles from './PackageInfo.module.css'

const SIZE_LABEL: Record<string, string> = {SMALL: 'Nhỏ', MEDIUM: 'Vừa', LARGE: 'Lớn'}

const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
)

export function PackageInfo() {
    const navigate = useNavigate()
    const {
        selectedSlot,
        formData,
        isSubmitting,
        error,
        setFormField,
        submitShipment,
        toggleTheme,
    } = useShipperStore()

    if (!selectedSlot) {
        navigate('/shipper')
        return null
    }

    const handleSubmit = async () => {
        await submitShipment()
        // chỉ navigate khi không có lỗi – store set error nếu thất bại
        const {error: currentError, shipmentResult} = useShipperStore.getState()
        if (!currentError && shipmentResult) navigate('/shipper/success')
    }

    return (
        <div className={`page ${styles.page}`}>
            <header className="page-header">
                <button className="back-btn" onClick={() => navigate('/shipper')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <h1 className="page-header__title">SmartLocker</h1>
                <button className="icon-btn" onClick={toggleTheme}>
                    <SunIcon/>
                </button>
            </header>

            <div className="page-body">
                <div className={styles.titleBlock}>
                    <h2 className={styles.title}>Thông tin bưu kiện</h2>
                    <p className={styles.sub}>Vui lòng nhập đầy đủ thông tin để tiếp tục.</p>
                </div>

                <div className={styles.formCard}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>TÊN NGƯỜI NHẬN</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.inputIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <input
                                className={styles.fieldInput}
                                type="text"
                                placeholder="Nhập tên người nhận"
                                value={formData.recipientName}
                                onChange={e => setFormField('recipientName', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>SỐ ĐIỆN THOẠI</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.inputIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path
                                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 12 19.79 19.79 0 01.44 3.37 2 2 0 012.42 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.4a16 16 0 006.72 6.72l.72-.72a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                                </svg>
                            </span>
                            <input
                                className={styles.fieldInput}
                                type="tel"
                                placeholder="0xxx xxx xxx"
                                value={formData.recipientPhone}
                                onChange={e => setFormField('recipientPhone', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <PhotoUpload/>

                <div className={styles.assignedCard}>
                    <div className={styles.assignedIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                    </div>
                    <div className={styles.assignedInfo}>
                        <p className={styles.assignedLabel}>LOCKER ASSIGNED</p>
                        <p className={styles.assignedVal}>
                            {selectedSlot.id} Ready
                            <span className={styles.assignedSize}> · {SIZE_LABEL[selectedSlot.size]}</span>
                        </p>
                    </div>
                    <div className={styles.assignedCheck}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                </div>

                {error && <div className={styles.errorBanner}>{error}</div>}
            </div>

            <footer className="page-footer">
                <button
                    className="btn btn--primary"
                    onClick={() => {
                        void handleSubmit()
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <span className={styles.spinner}/> : 'XÁC NHẬN GỬI HÀNG →'}
                </button>
            </footer>
        </div>
    )
}