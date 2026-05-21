import {useDarkMode} from '@/hooks/useDarkMode'

export function useTheme() {
    const {theme, isDark, toggle, setTheme} = useDarkMode()

    return {
        theme,
        isDark,
        toggleTheme: toggle,
        setTheme,
    }
}
