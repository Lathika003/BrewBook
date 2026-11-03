import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { JournalEntry, Preferences } from '@/types';
import { storage } from '@/lib/storage';

interface AppContextValue {
  ready: boolean; favorites: string[]; journal: JournalEntry[]; preferences: Preferences;
  toggleFavorite: (id: string) => void; clearFavorites: () => void;
  saveEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'> & { id?: string }) => void;
  deleteEntry: (id: string) => void; clearJournal: () => void;
  setReducedMotion: (value: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [preferences, setPreferences] = useState<Preferences>({ reducedMotion: false });

  useEffect(() => { Promise.all([storage.getFavorites(), storage.getJournal(), storage.getPreferences()])
    .then(([f, j, p]) => { setFavorites(f); setJournal(j); setPreferences(p); })
    .finally(() => setReady(true)); }, []);

  const updateFavorites = useCallback((next: string[]) => { setFavorites(next); void storage.setFavorites(next); }, []);
  const toggleFavorite = useCallback((id: string) => updateFavorites(favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]), [favorites, updateFavorites]);
  const clearFavorites = useCallback(() => updateFavorites([]), [updateFavorites]);

  const updateJournal = useCallback((next: JournalEntry[]) => { setJournal(next); void storage.setJournal(next); }, []);
  const saveEntry = useCallback((entry: Omit<JournalEntry, 'id' | 'createdAt'> & { id?: string }) => {
    const existing = entry.id ? journal.find((item) => item.id === entry.id) : undefined;
    const saved: JournalEntry = { ...entry, id: entry.id ?? `entry-${Date.now()}`, createdAt: existing?.createdAt ?? new Date().toISOString() };
    updateJournal(existing ? journal.map((item) => item.id === saved.id ? saved : item) : [saved, ...journal]);
  }, [journal, updateJournal]);
  const deleteEntry = useCallback((id: string) => updateJournal(journal.filter((item) => item.id !== id)), [journal, updateJournal]);
  const clearJournal = useCallback(() => updateJournal([]), [updateJournal]);
  const setReducedMotion = useCallback((reducedMotion: boolean) => { const next = { reducedMotion }; setPreferences(next); void storage.setPreferences(next); }, []);

  const value = useMemo(() => ({ ready, favorites, journal, preferences, toggleFavorite, clearFavorites, saveEntry, deleteEntry, clearJournal, setReducedMotion }), [ready, favorites, journal, preferences, toggleFavorite, clearFavorites, saveEntry, deleteEntry, clearJournal, setReducedMotion]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
