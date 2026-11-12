import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '@/lib/storage';
const AppContext = createContext(null);
export function AppProvider({ children }) {
    const [ready, setReady] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [journal, setJournal] = useState([]);
    const [preferences, setPreferences] = useState({ reducedMotion: false, colorScheme: 'light' });
    useEffect(() => {
        Promise.all([storage.getFavorites(), storage.getJournal(), storage.getPreferences()])
            .then(([f, j, p]) => { setFavorites(f); setJournal(j); setPreferences(p); })
            .finally(() => setReady(true));
    }, []);
    const updateFavorites = useCallback((next) => { setFavorites(next); void storage.setFavorites(next); }, []);
    const toggleFavorite = useCallback((id) => updateFavorites(favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]), [favorites, updateFavorites]);
    const clearFavorites = useCallback(() => updateFavorites([]), [updateFavorites]);
    const updateJournal = useCallback((next) => { setJournal(next); void storage.setJournal(next); }, []);
    const saveEntry = useCallback((entry) => {
        const existing = entry.id ? journal.find((item) => item.id === entry.id) : undefined;
        const saved = { ...entry, id: entry.id ?? `entry-${Date.now()}`, createdAt: existing?.createdAt ?? new Date().toISOString() };
        updateJournal(existing ? journal.map((item) => item.id === saved.id ? saved : item) : [saved, ...journal]);
    }, [journal, updateJournal]);
    const deleteEntry = useCallback((id) => updateJournal(journal.filter((item) => item.id !== id)), [journal, updateJournal]);
    const clearJournal = useCallback(() => updateJournal([]), [updateJournal]);
    // Persist the complete preference object so one setting never resets another.
    useEffect(() => { if (ready) void storage.setPreferences(preferences).catch(() => {}); }, [preferences, ready]);
    const setReducedMotion = useCallback((reducedMotion) => setPreferences(current => ({ ...current, reducedMotion })), []);
    const setColorScheme = useCallback((colorScheme) => setPreferences(current => ({ ...current, colorScheme: colorScheme === 'dark' ? 'dark' : 'light' })), []);
    const value = useMemo(() => ({ ready, favorites, journal, preferences, toggleFavorite, clearFavorites, saveEntry, deleteEntry, clearJournal, setReducedMotion, setColorScheme }), [ready, favorites, journal, preferences, toggleFavorite, clearFavorites, saveEntry, deleteEntry, clearJournal, setReducedMotion, setColorScheme]);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
    const context = useContext(AppContext);
    if (!context)
        throw new Error('useApp must be used within AppProvider');
    return context;
}
