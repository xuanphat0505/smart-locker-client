import {useThemeStore} from '@/store/useThemeStore'

export function useTheme() {
    const {theme, isDark, toggleTheme, setTheme} = useThemeStore()

    return {
        theme,
        isDark,
        toggleTheme,
        setTheme,
    }
}
