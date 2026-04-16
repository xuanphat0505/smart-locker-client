import {useState} from 'react'
import {useAuthStore} from "@/store/useAuthStore.ts";
import {EUserRole} from "@/types/user.types.ts";
import styles from './LoginForm.module.css'
import {useNavigate} from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Props = {
    role: EUserRole
    onSuccess: () => void
    onSwitchToRegister: () => void
}

export function LoginForm({role, onSuccess, onSwitchToRegister}: Props) {
    const {signIn, isLoading, error, clearError} = useAuthStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [localErr, setLocalErr] = useState('')
    const navigate = useNavigate()

    function validate() {
        if (!emailRegex.test(email.trim())) {
            setLocalErr('Email không đúng định dạng');
            return false
        }
        if (password.length < 6) {
            setLocalErr('Mật khẩu phải có ít nhất 6 ký tự');
            return false
        }
        return true
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLocalErr('')
        clearError()
        if (!validate()) return
        const ok = await signIn({email: email.trim(), password, role})
        if (ok) onSuccess()
    }

    const errorMsg = localErr || error

    return (
        <div className={styles.page}>
            <div className={styles.heading}>
                <h1>Đăng nhập tài khoản</h1>
                <p>Chào mừng trở lại! Đăng nhập để tiếp tục sử dụng dịch vụ SmartLocker.</p>
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
                        <label>Email</label>
                        <div className={`${styles.inputRow} ${styles.iconEmail}`}>
                            <input type="email" placeholder="email@vi-du.vn" value={email}
                                   onChange={e => setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Mật khẩu</label>
                        <div className={`${styles.inputRow} ${styles.iconLock}`}>
                            <input type="password" placeholder="••••••••" value={password}
                                   onChange={e => setPassword(e.target.value)} required/>
                        </div>
                    </div>
                </div>

                <button className={styles.submitBtn} type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>

            {role === EUserRole.shipper && (
                <button
                    type="button"
                    className={styles.devBtn}
                    onClick={() => navigate('/shipper')}
                >
                    Đăng nhập làm chóa gì chơi tao để vào shipper
                </button>
            )}
            {role === EUserRole.user && (
                <button
                    type="button"
                    className={styles.devBtn}
                    onClick={() => navigate('/customer')}
                >
                    Đăng nhập làm chóa gì chơi tao để vào customer
                </button>
            )}

            <p className={styles.footer}>
                Chưa có tài khoản?{' '}
                <span onClick={onSwitchToRegister}>Đăng ký ngay</span>
            </p>
        </div>
    )
}