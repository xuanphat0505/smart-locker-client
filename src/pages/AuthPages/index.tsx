import {useLocation, useNavigate} from 'react-router-dom'
import {LoginForm} from '@/components/shared/LoginForm'
import {RegisterForm} from '@/components/shared/RegisterForm'
import {EUserRole} from '@/types/user.types.ts'
import {useAuthStore} from '@/store/useAuthStore'
import styles from './AuthPage.module.css'

export function AuthPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useAuthStore()

    const role = location.pathname.startsWith('/shipper')
        ? EUserRole.shipper
        : EUserRole.user

    const isRegister = location.pathname.includes('register')

    if (user) {
        if (user.role === EUserRole.shipper) {
            navigate('/shipper')
        } else {
            navigate('/customer')
        }
        return null
    }

    const handleSuccess = () => {
        if (role === EUserRole.shipper) {
            navigate('/shipper')
        } else {
            navigate('/customer')
        }
    }

    const goToLogin = () => {
        if (role === EUserRole.shipper) {
            navigate('/shipper/login')
        } else {
            navigate('/customer/login')
        }
    }

    const goToRegister = () => {
        if (role === EUserRole.shipper) {
            navigate('/shipper/register')
        } else {
            navigate('/customer/register')
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <button
                    className={styles.backBtn}
                    onClick={() => navigate('/')}
                >
                    ← Quay lại
                </button>

                <div className={styles.card}>
                    {!isRegister ? (
                        <LoginForm
                            role={role}
                            onSuccess={handleSuccess}
                            onSwitchToRegister={goToRegister}
                        />
                    ) : (
                        <RegisterForm
                            role={role}
                            onSuccess={handleSuccess}
                            onSwitchToLogin={goToLogin}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}