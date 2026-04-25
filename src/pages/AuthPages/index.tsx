import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {LoginForm} from '@/components/shared/LoginForm'
import {RegisterForm} from '@/components/shared/RegisterForm'
import {useAuthStore} from '@/store/useAuthStore'
import {getDefaultLoginPath, getDefaultRegisterPath, getHomePathByRole, getRoleFromPath} from "@/util/auth.ts";
import styles from './Authpage.module.css'

export function AuthPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useAuthStore()

    const role = getRoleFromPath(location.pathname)
    const isRegister = location.pathname.includes('register')

    useEffect(() => {
        if (!user) return
        navigate(getHomePathByRole(user.role), {replace: true})
    }, [navigate, user])

    const handleSuccess = () => {
        const signedInUser = useAuthStore.getState().user
        if (!signedInUser) return
        navigate(getHomePathByRole(signedInUser.role), {replace: true})
    }

    if (user) {
        return null
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
                            onSwitchToRegister={() => navigate(getDefaultRegisterPath(role))}
                        />
                    ) : (
                        <RegisterForm
                            role={role}
                            onSuccess={handleSuccess}
                            onSwitchToLogin={() => navigate(getDefaultLoginPath(role))}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
