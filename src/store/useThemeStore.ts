import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export type TTheme = 'light' | 'dark'

type TThemeState = {
    theme: TTheme
    isDark: boolean
    setTheme: (theme: TTheme) => void
    toggleTheme: () => void
}

const getInitialTheme = (): TTheme => {
    try {
        const saved = localStorage.getItem('sl-theme')
        if (saved === 'dark' || saved === 'light') return saved

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    } catch {
        return 'light'
    }
}

const initialTheme = getInitialTheme()

export const useThemeStore = create<TThemeState>()(
    persist(
        (set) => ({
            theme: initialTheme,
            isDark: initialTheme === 'dark',

            setTheme: (theme) =>
                set({
                    theme,
                    isDark: theme === 'dark',
                }),

            toggleTheme: () =>
                set((state) => {
                    const nextTheme: TTheme = state.theme === 'dark' ? 'light' : 'dark'
                    return {
                        theme: nextTheme,
                        isDark: nextTheme === 'dark',
                    }
                }),
        }),
        {
            name: 'theme-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                theme: state.theme,
            }),
        },
    ),
)
