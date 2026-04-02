import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginForm } from '@/components/LoginForm'
import { RegisterForm } from '@/components/RegisterForm'
import { EUserRole } from '@/types/user.type.ts'
import { useAuthStore } from '@/store/useAuthStore'
import styles from './AuthPage.module.css'

export function AuthPage() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const location = useLocation()

    const role = location.pathname.startsWith('/shipper')
        ? EUserRole.shipper
        : EUserRole.user

    const [mode, setMode] = useState<'login' | 'register'>(
        location.pathname.includes('register') ? 'register' : 'login'
    )

    if (user) {
        if (user.role === EUserRole.shipper) navigate('/shipper')
        else navigate('/home')
        return null
    }

    const handleSuccess = () => {
        if (role === EUserRole.shipper) navigate('/shipper')
        else navigate('/home')
    }

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <button className={styles.backBtn} onClick={() => navigate('/')}>
                    ← Quay lại
                </button>

                <div className={styles.card}>
                    {mode === 'login' ? (
                        <LoginForm
                            role={role}
                            onSuccess={handleSuccess}
                            onSwitchToRegister={() => setMode('register')}
                        />
                    ) : (
                        <RegisterForm
                            role={role}
                            onSuccess={handleSuccess}
                            onSwitchToLogin={() => setMode('login')}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}