import {Outlet} from 'react-router-dom'
import styles from './CustomerLayout.module.css'
import {BottomNav} from "@/components/Customer/BottomNav.tsx";
import {useTheme} from '@/hooks/useTheme'

const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
)

const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
)

export function CustomerLayout() {
    const {isDark, toggleTheme} = useTheme()

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={`theme-fab ${styles.themeToggle}`}
                onClick={toggleTheme}
                aria-label="Đổi giao diện"
                title="Đổi giao diện"
            >
                {isDark ? <SunIcon/> : <MoonIcon/>}
            </button>

            <Outlet/>
            <BottomNav/>
        </div>
    )
}
