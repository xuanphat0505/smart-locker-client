import {useState} from 'react'
import {EUserRole} from "@/types/user.types.ts";
import {useAuthStore} from "@/store/useAuthStore.ts";
import styles from './RegisterForm.module.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/

type Props = {
    role: EUserRole
    onSuccess: () => void
    onSwitchToLogin: () => void
}

export function RegisterForm({role, onSuccess, onSwitchToLogin}: Props) {
    const {signUp, isLoading, error, clearError} = useAuthStore()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [localErr, setLocalErr] = useState('')
    const [agreed, setAgreed] = useState(false)  // thêm state terms

    function validate() {
        if (name.trim().length < 2) {
            setLocalErr('Họ tên phải có ít nhất 2 ký tự');
            return false
        }
        if (!emailRegex.test(email.trim())) {
            setLocalErr('Email không đúng định dạng');
            return false
        }
        if (phone && !phoneRegex.test(phone.trim())) {
            setLocalErr('Số điện thoại không đúng định dạng');
            return false
        }
        if (password.length < 6) {
            setLocalErr('Mật khẩu phải có ít nhất 6 ký tự');
            return false
        }
        if (password !== confirm) {
            setLocalErr('Mật khẩu xác nhận không khớp');
            return false
        }
        if (!agreed) {
            setLocalErr('Vui lòng đồng ý với điều khoản dịch vụ');
            return false
        }
        return true
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLocalErr('')
        clearError()
        if (!validate()) return
        const ok = await signUp({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            password,
            role
        })
        if (ok) onSuccess()
    }

    const errorMsg = localErr || error

    return (
        <div className={styles.page}>


            <div className={styles.heading}>
                <h1>Đăng ký tài khoản</h1>
                <p>Tham gia cộng đồng SmartLocker ngay hôm nay để trải nghiệm dịch vụ lưu trữ thông minh.</p>
            </div>

            {errorMsg && (
                <div className={styles.error} onClick={() => {
                    setLocalErr('');
                    clearError()
                }}>
                    {errorMsg} <span>✕</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.field}>
                        <label>Họ và tên</label>
                        <div className={`${styles.inputRow} ${styles.iconUser}`}>
                            <input type="text" placeholder="Nguyễn Văn A" value={name}
                                   onChange={e => setName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Số điện thoại (tuỳ chọn)</label>
                        <div className={`${styles.inputRow} ${styles.iconPhone}`}>
                            <input type="tel" placeholder="090 123 4567" value={phone}
                                   onChange={e => setPhone(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.field}>
                        <label>Email</label>
                        <div className={`${styles.inputRow} ${styles.iconEmail}`}>
                            <input type="email" placeholder="email@vi-du.vn" value={email}
                                   onChange={e => setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Mật khẩu</label>
                        <div className={`${styles.inputRow} ${styles.iconLock}`}>
                            <input type="password" placeholder="Tối thiểu 6 ký tự" value={password}
                                   onChange={e => setPassword(e.target.value)} required/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Xác nhận mật khẩu</label>
                        <div className={`${styles.inputRow} ${styles.iconShield}`}>
                            <input type="password" placeholder="Nhập lại mật khẩu" value={confirm}
                                   onChange={e => setConfirm(e.target.value)} required/>
                        </div>
                    </div>
                </div>

                {/* Terms */}
                <div className={styles.terms}>
                    <input id="terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}/>
                    <label htmlFor="terms">
                        Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a> của
                        SmartLocker.
                    </label>
                </div>

                <button className={styles.submitBtn} type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
            </form>

            <p className={styles.footer}>
                Đã có tài khoản?{' '}
                <span onClick={onSwitchToLogin}>Đăng nhập</span>
            </p>
        </div>
    )
}