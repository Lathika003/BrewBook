import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry, Preferences } from '@/types';

const KEYS = { favorites: '@brewbook/favorites', journal: '@brewbook/journal', preferences: '@brewbook/preferences' } as const;

async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch { return fallback; }
}

export const storage = {
  getFavorites: () => read<string[]>(KEYS.favorites, []),
  setFavorites: (ids: string[]) => AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids)),
  getJournal: () => read<JournalEntry[]>(KEYS.journal, []),
  setJournal: (entries: JournalEntry[]) => AsyncStorage.setItem(KEYS.journal, JSON.stringify(entries)),
  getPreferences: () => read<Preferences>(KEYS.preferences, { reducedMotion: false }),
  setPreferences: (preferences: Preferences) => AsyncStorage.setItem(KEYS.preferences, JSON.stringify(preferences)),
};
