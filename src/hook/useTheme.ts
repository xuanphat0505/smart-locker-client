import { useShipperStore } from "@/store/userShiperStore.ts";

/**
 * Thin hook — chỉ expose theme state + toggleTheme.
 * DOM sync (data-theme) được xử lý bởi ThemeSync trong App.tsx.
 */
export function useTheme() {
    const { theme, isDark, toggleTheme } = useShipperStore()
    return { theme, isDark, toggleTheme }
}
