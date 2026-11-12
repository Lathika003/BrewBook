import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from '@/context/AppContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
function Navigation() {
    const { colors, isDark } = useTheme();
    const { ready } = useApp();
    // Mount screens after loading preferences to avoid showing the wrong theme.
    if (!ready) return null;
    return <><StatusBar style={isDark ? 'light' : 'dark'}/><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream }, animation: 'fade', animationDuration: 180 }}><Stack.Screen name="(tabs)"/><Stack.Screen name="recipe/[id]"/><Stack.Screen name="search"/><Stack.Screen name="brew-guide"/><Stack.Screen name="settings"/></Stack></>;
}
export default function RootLayout() {
    return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><AppProvider><ThemeProvider><Navigation/></ThemeProvider></AppProvider></SafeAreaProvider></GestureHandlerRootView>;
}
