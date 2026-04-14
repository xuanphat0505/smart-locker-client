import {useEffect} from 'react'
import {AppRouter} from '@/routes'
import {useShipperStore} from "@/store/userShiperStore.ts";
import './index.css'


function ThemeSync() {
    const theme = useShipperStore((s) => s.theme)

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