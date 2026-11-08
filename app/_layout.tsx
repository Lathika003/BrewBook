import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '@/context/AppContext';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  return <GestureHandlerRootView style={{ flex:1 }}><SafeAreaProvider><AppProvider><StatusBar style="dark"/><Stack screenOptions={{ headerShown:false, contentStyle:{backgroundColor:colors.cream}, animation:'fade', animationDuration:220 }}><Stack.Screen name="(tabs)"/><Stack.Screen name="recipe/[id]"/><Stack.Screen name="search"/><Stack.Screen name="brew-guide"/><Stack.Screen name="settings"/></Stack></AppProvider></SafeAreaProvider></GestureHandlerRootView>;
}
