import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '@/context/AppContext';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  return <GestureHandlerRootView style={{ flex:1 }}><SafeAreaProvider><AppProvider><StatusBar style="dark"/><Stack screenOptions={{ headerShown:false, contentStyle:{backgroundColor:colors.cream}, animation:'fade_from_bottom' }}><Stack.Screen name="(tabs)"/><Stack.Screen name="recipe/[id]" options={{animation:'slide_from_right'}}/><Stack.Screen name="search" options={{animation:'slide_from_right'}}/><Stack.Screen name="brew-guide" options={{animation:'slide_from_right'}}/><Stack.Screen name="settings" options={{animation:'slide_from_right'}}/></Stack></AppProvider></SafeAreaProvider></GestureHandlerRootView>;
}
