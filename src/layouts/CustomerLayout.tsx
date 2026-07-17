import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import styles from './CustomerLayout.module.css'

const CUSTOMER_NAV = [
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
        path: '/customer/chat-ai',
        label: 'Hỏi AI',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/>
                <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/>
                <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>
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

function isActivePath(pathname: string, itemPath: string) {
    if (itemPath === '/customer') return pathname === itemPath
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
}

function SidebarMenu() {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return (
        <>
            <div className={styles.brand}>SmartLocker</div>
            {CUSTOMER_NAV.map((item) => {
                const active = isActivePath(pathname, item.path)

                return (
                    <button
                        key={item.path}
                        className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                )
            })}
        </>
    )
}

function BottomNavItems() {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return (
        <>
            {CUSTOMER_NAV.map((item) => {
                const active = isActivePath(pathname, item.path)

                return (
                    <button
                        key={item.path}
                        className={`${styles.bottomItem} ${active ? styles.bottomItemActive : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.bottomLabel}>{item.label}</span>
                    </button>
                )
            })}
        </>
    )
}

export default function CustomerLayout() {
    return (
        <div className={styles.wrapper}>
            <aside className={styles.sidebar}>
                <SidebarMenu/>
            </aside>

            <main className={styles.main}>
                <div className={styles.content}>
                    <Outlet/>
                </div>
            </main>

            <nav className={styles.bottomNav}>
                <BottomNavItems/>
            </nav>
        </div>
    )
}

export {CustomerLayout}
