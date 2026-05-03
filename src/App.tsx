import {useEffect} from 'react'
import {AppRouter} from '@/routes'
import {useThemeStore} from '@/store/useThemeStore'
import './index.css'

function ThemeSync() {
    const theme = useThemeStore((s) => s.theme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('sl-theme', theme)
    }, [theme])

    return null
}

export function App() {
    return (
        <>
            <ThemeSync/>
            <AppRouter/>
        </>
    )
}

export default App
