import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppButton} from '@/components/Ui/AppButton'
import {AppInput} from '@/components/Ui/AppInput'
import {AppText} from '@/components/Ui/AppText'
import styles from './Changepassword.module.css'

export function ChangePassword() {
    const navigate = useNavigate()
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [form, setForm] = useState({current: '', newPass: '', confirm: ''})
    const [touched, setTouched] = useState({current: false, newPass: false, confirm: false})

    const newPassStrength = (() => {
        const p = form.newPass
        if (!p) return 0
        let score = 0
        if (p.length >= 8) score++
        if (/[A-Z]/.test(p)) score++
        if (/[0-9]/.test(p)) score++
        if (/[^A-Za-z0-9]/.test(p)) score++
        return score
    })()

    const strengthLabel = ['', 'Yếu', 'Trung bình', 'Khá mạnh', 'Mạnh'][newPassStrength]
    const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][newPassStrength]

    const errors = {
        current: touched.current && !form.current ? 'Vui lòng nhập mật khẩu hiện tại' : '',
        newPass: touched.newPass && form.newPass.length < 8 ? 'Mật khẩu tối thiểu 8 ký tự' : '',
        confirm: touched.confirm && form.confirm !== form.newPass ? 'Mật khẩu không khớp' : '',
    }

    const isValid = form.current && form.newPass.length >= 8 && form.newPass === form.confirm

    const EyeIcon = ({open}: { open: boolean }) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
                <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </>
            ) : (
                <>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                </>
            )}
        </svg>
    )

    const lockIcon = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
    )

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                </button>
                <AppText as="h1" variant="body" className={styles.title}>Đổi mật khẩu</AppText>
                <div style={{width: 40}}/>
            </div>

            <div className={styles.body}>
                <div className={styles.illustration}>
                    <div className={styles.lockCircle}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                    </div>
                    <AppText variant="body" className={styles.illustrationText}>Bảo mật tài khoản của bạn</AppText>
                    <AppText variant="caption" className={styles.illustrationSub}>
                        Sử dụng mật khẩu mạnh để bảo vệ tài khoản
                    </AppText>
                </div>

                <div className={styles.card}>
                    <AppInput
                        label="Mật khẩu hiện tại"
                        type={showCurrent ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu hiện tại"
                        value={form.current}
                        onChange={e => setForm(f => ({...f, current: e.target.value}))}
                        onBlur={() => setTouched(t => ({...t, current: true}))}
                        error={errors.current}
                        icon={lockIcon}
                        rightElement={
                            <button className={styles.eyeBtn} onClick={() => setShowCurrent(v => !v)} type="button">
                                <EyeIcon open={showCurrent}/>
                            </button>
                        }
                    />

                    <div className={styles.divider}/>

                    <div className={styles.passwordGroup}>
                        <AppInput
                            label="Mật khẩu mới"
                            type={showNew ? 'text' : 'password'}
                            placeholder="Tối thiểu 8 ký tự"
                            value={form.newPass}
                            onChange={e => setForm(f => ({...f, newPass: e.target.value}))}
                            onBlur={() => setTouched(t => ({...t, newPass: true}))}
                            error={errors.newPass}
                            icon={
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path
                                        d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                                </svg>
                            }
                            rightElement={
                                <button className={styles.eyeBtn} onClick={() => setShowNew(v => !v)} type="button">
                                    <EyeIcon open={showNew}/>
                                </button>
                            }
                        />

                        {form.newPass && (
                            <div className={styles.strengthWrap}>
                                <div className={styles.strengthBars}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div
                                            key={i}
                                            className={styles.strengthBar}
                                            style={{background: i <= newPassStrength ? strengthColor : '#e5e7eb'}}
                                        />
                                    ))}
                                </div>
                                <span className={styles.strengthLabel} style={{color: strengthColor}}>
                                    {strengthLabel}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className={styles.passwordGroup}>
                        <AppInput
                            label="Xác nhận mật khẩu mới"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Nhập lại mật khẩu mới"
                            value={form.confirm}
                            onChange={e => setForm(f => ({...f, confirm: e.target.value}))}
                            onBlur={() => setTouched(t => ({...t, confirm: true}))}
                            error={errors.confirm}
                            icon={
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 11 12 14 22 4"/>
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                                </svg>
                            }
                            rightElement={
                                <button className={styles.eyeBtn} onClick={() => setShowConfirm(v => !v)} type="button">
                                    <EyeIcon open={showConfirm}/>
                                </button>
                            }
                        />
                        {!errors.confirm && form.confirm && form.confirm === form.newPass && (
                            <AppText variant="caption" className={styles.successMsg}>✓ Mật khẩu khớp</AppText>
                        )}
                    </div>
                </div>

                <div className={styles.tipsCard}>
                    <AppText variant="body" className={styles.tipsTitle}>Gợi ý mật khẩu mạnh</AppText>
                    {[
                        'Ít nhất 8 ký tự',
                        'Chứa chữ hoa và chữ thường',
                        'Có ít nhất 1 chữ số',
                        'Thêm ký tự đặc biệt (!@#$...)',
                    ].map(tip => (
                        <AppText key={tip} variant="caption" className={styles.tipItem}>• {tip}</AppText>
                    ))}
                </div>

                <AppButton fullWidth size="lg" disabled={!isValid}>
                    Xác nhận đổi mật khẩu
                </AppButton>
            </div>
        </div>
    )
}
