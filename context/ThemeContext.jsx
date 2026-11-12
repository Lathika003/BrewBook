import { createContext, useContext, useEffect, useMemo } from 'react';
import { Appearance } from 'react-native';
import { darkColors, lightColors } from '@/constants/theme';
import { useApp } from './AppContext';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const { preferences, ready, setColorScheme } = useApp();
    const isDark = preferences.colorScheme === 'dark';
    useEffect(() => {
        if (ready) Appearance.setColorScheme(isDark ? 'dark' : 'light');
    }, [isDark, ready]);
    const value = useMemo(() => ({
        colors: isDark ? darkColors : lightColors,
        isDark,
        setColorScheme,
    }), [isDark, setColorScheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const theme = useContext(ThemeContext);
    if (!theme) throw new Error('useTheme must be used within ThemeProvider');
    return theme;
}

// Each factory creates only two style sheets, shared by all instances.
const styleCache = new WeakMap();
export function useThemeStyles(factory) {
    const theme = useTheme();
    let cache = styleCache.get(factory);
    if (!cache) {
        cache = new Map();
        styleCache.set(factory, cache);
    }
    if (!cache.has(theme.colors)) cache.set(theme.colors, factory(theme.colors));
    return { ...theme, styles: cache.get(theme.colors) };
}
