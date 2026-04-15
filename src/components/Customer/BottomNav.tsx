import {useLocation, useNavigate} from 'react-router-dom'
import styles from './BottomNav.module.css'

const NAV = [
    {
        path: '/customer',
        label: 'Trang chủ',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
        ),
    },
    {
        path: '/customer/open-locker',
        label: 'Mở tủ',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
        ),
    },
    {
        path: '/customer/history',
        label: 'Lịch sử',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
        ),
    },
    {
        path: '/customer/profile',
        label: 'Tôi',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        ),
    },
]

export function BottomNav() {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return (
        <nav className={styles.nav}>
            {NAV.map(item => {
                const active = pathname === item.path
                return (
                    <button
                        key={item.path}
                        className={`${styles.item} ${active ? styles.itemActive : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}