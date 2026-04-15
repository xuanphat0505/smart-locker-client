import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCustomerStore} from '@/store/useCustomerStore.ts'
import {BottomNav} from "@/components/Customer/BottomNav.tsx";
import styles from './OpenLocker.module.css'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

export function OpenLocker() {
    const navigate = useNavigate()
    const {
        activePackage, otpDigits, isVerifying, otpError,
        inputOtpDigit, deleteOtpDigit, clearOtp, submitOtp, openResult,
    } = useCustomerStore()

    // navigate khi mở thành công
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
                {/* Package info */}
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

                {/* OTP hint */}
                <p className={styles.otpHint}>Nhập mã OTP 6 số đã gửi qua Zalo</p>

                {/* OTP boxes */}
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

                {/* Countdown */}
                <div className={styles.countdown}>Hết hạn sau 08:12</div>

                {/* Numpad */}
                <div className={styles.numpad}>
                    {DIGITS.map((d, i) => {
                        if (d === '') return <div key={i}/>
                        if (d === '⌫') return (
                            <button key={i} className={`${styles.key} ${styles.keyDel}`} onClick={deleteOtpDigit}>
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

                {/* Resend */}
                <button className={styles.resend} onClick={clearOtp}>Gửi lại</button>
            </div>

            {/* Submit */}
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

            <BottomNav/>
        </div>
    )
}