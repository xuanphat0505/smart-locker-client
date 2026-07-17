import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCustomerStore} from '@/store/useCustomerStore.ts'
import styles from './OpenLocker.module.css'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

export function OpenLocker() {
    const navigate = useNavigate()
    const {
        activePackage, otpDigits, isVerifying, otpError,
        inputOtpDigit, deleteOtpDigit, clearOtp, submitOtp, openResult,
    } = useCustomerStore()

    useEffect(() => {
        if (openResult) navigate('/customer/open-success')
    }, [openResult, navigate])

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate('/customer')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    Quay lại
                </button>
                <h1 className={styles.title}>Mở tủ bằng OTP</h1>
            </header>

            <div className={styles.body}>
                <div className={styles.splitLayout}>
                    <div className={styles.leftCol}>
                        {activePackage && (
                            <div className={styles.pkgCard}>
                                <div className={styles.pkgSlot}>{activePackage.slotId}</div>
                                <div className={styles.pkgInfo}>
                                    <p className={styles.pkgCode}>{activePackage.orderCode} · {activePackage.shipperName}</p>
                                    <p className={styles.pkgLoc}>{activePackage.slotLocation}</p>
                                    <span className={styles.pkgBadge}>Nhận hàng</span>
                                </div>
                            </div>
                        )}

                        <div className={styles.guideCard}>
                            <h3 className={styles.guideTitle}>Quy trình lấy hàng</h3>
                            
                            <div className={styles.stepsGrid}>
                                <div className={styles.stepItem}>
                                    <div className={`${styles.stepIcon} ${styles.bellRingIcon}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                        </svg>
                                    </div>
                                    <div className={styles.stepText}>
                                        <h4 className={styles.stepTitle}>1. Nhận mã OTP</h4>
                                        <p className={styles.stepDesc}>Nhận tin nhắn Zalo/SMS chứa mã xác thực 6 số.</p>
                                    </div>
                                </div>

                                <div className={styles.stepItem}>
                                    <div className={`${styles.stepIcon} ${styles.lockIcon}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <div className={styles.stepText}>
                                        <h4 className={styles.stepTitle}>2. Nhập mã số</h4>
                                        <p className={styles.stepDesc}>Bấm mã OTP trực tiếp vào bàn phím số bên phải.</p>
                                    </div>
                                </div>

                                <div className={styles.stepItem}>
                                    <div className={`${styles.stepIcon} ${styles.boxIcon}`}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                                            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                                        </svg>
                                    </div>
                                    <div className={styles.stepText}>
                                        <h4 className={styles.stepTitle}>3. Nhận bưu kiện</h4>
                                        <p className={styles.stepDesc}>Ngăn tủ tương ứng sẽ tự động mở khóa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statusBox}>
                            <p className={styles.otpHint}>Nhập mã OTP 6 số đã gửi qua Zalo</p>
                            <div className={styles.countdown}>Hết hạn sau 08:12</div>
                        </div>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.otpRow}>
                            {Array.from({length: 6}, (_, i) => (
                                <div
                                    key={i}
                                    className={`${styles.otpBox} ${i === otpDigits.length ? styles.otpBoxActive : ''} ${otpError ? styles.otpBoxError : ''}`}
                                >
                                    {otpDigits[i] ?? ''}
                                </div>
                            ))}
                        </div>

                        {otpError && <p className={styles.otpError}>{otpError}</p>}

                        <div className={styles.numpad}>
                            {DIGITS.map((d, i) => {
                                if (d === '') return <div key={i}/>
                                if (d === '⌫') return (
                                    <button key={i} className={`${styles.key} ${styles.keyDel}`} onClick={deleteOtpDigit} aria-label="Xóa">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                             strokeWidth="2">
                                            <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/>
                                            <line x1="18" y1="9" x2="12" y2="15"/>
                                            <line x1="12" y1="9" x2="18" y2="15"/>
                                        </svg>
                                    </button>
                                )
                                return (
                                    <button key={i} className={styles.key} onClick={() => inputOtpDigit(d)}>
                                        {d}
                                    </button>
                                )
                            })}
                        </div>

                        <button className={styles.resend} onClick={clearOtp}>Gửi lại</button>
                    </div>
                </div>
            </div>

            <footer className={styles.footer}>
                <button
                    className={styles.submitBtn}
                    onClick={() => void submitOtp()}
                    disabled={otpDigits.length < 6 || isVerifying}
                >
                    {isVerifying
                        ? <span className={styles.spinner}/>
                        : 'Mở tủ ngay'}
                </button>
            </footer>

        </div>
    )
}