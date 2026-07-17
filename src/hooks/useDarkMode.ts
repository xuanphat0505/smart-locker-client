import {useCallback, useEffect, useState} from 'react'

type TTheme = 'light' | 'dark'

const THEME_KEY = 'sl-theme'
const DEFAULT_THEME: TTheme = 'dark'
const listeners = new Set<(theme: TTheme) => void>()

function readTheme(): TTheme {
    try {
        const saved = localStorage.getItem(THEME_KEY)
        return saved === 'light' || saved === 'dark' ? saved : DEFAULT_THEME
    } catch {
        return DEFAULT_THEME
    }
}

function applyTheme(theme: TTheme) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme)
}

function writeTheme(theme: TTheme) {
    try {
        localStorage.setItem(THEME_KEY, theme)
    } catch {
        // localStorage can be unavailable in private or restricted contexts.
    }
}

let currentTheme: TTheme = DEFAULT_THEME

export function initializeDarkMode() {
    currentTheme = readTheme()
    applyTheme(currentTheme)
}

export function setDarkMode(theme: TTheme) {
    currentTheme = theme
    writeTheme(theme)
    applyTheme(theme)
    listeners.forEach((listener) => listener(theme))
}

export function useDarkMode() {
    const [theme, setThemeState] = useState<TTheme>(() => currentTheme)

    useEffect(() => {
        listeners.add(setThemeState)
        setThemeState(currentTheme)
        applyTheme(currentTheme)

        return () => {
            listeners.delete(setThemeState)
        }
    }, [])

    const setTheme = useCallback((nextTheme: TTheme) => {
        setDarkMode(nextTheme)
    }, [])

    const toggle = useCallback(() => {
        setDarkMode(currentTheme === 'dark' ? 'light' : 'dark')
    }, [])

    return {
        theme,
        isDark: theme === 'dark',
        toggle,
        setTheme,
    }
}
