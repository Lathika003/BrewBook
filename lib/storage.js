import AsyncStorage from '@react-native-async-storage/async-storage';
const KEYS = { favorites: '@brewbook/favorites', journal: '@brewbook/journal', preferences: '@brewbook/preferences' };
async function read(key, fallback) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    }
    catch {
        return fallback;
    }
}
export const storage = {
    getFavorites: () => read(KEYS.favorites, []),
    setFavorites: (ids) => AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids)),
    getJournal: () => read(KEYS.journal, []),
    setJournal: (entries) => AsyncStorage.setItem(KEYS.journal, JSON.stringify(entries)),
    getPreferences: async () => {
        const saved = await read(KEYS.preferences, {});
        return { reducedMotion: saved?.reducedMotion === true, colorScheme: saved?.colorScheme === 'dark' ? 'dark' : 'light' };
    },
    setPreferences: (preferences) => AsyncStorage.setItem(KEYS.preferences, JSON.stringify(preferences)),
};
