import {AppRouter} from '@/routes'
import {useDarkMode} from '@/hooks/useDarkMode'
import './index.css'

function ThemeSync() {
    useDarkMode()
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
