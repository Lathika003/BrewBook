import { useThemeStyles } from '@/context/ThemeContext';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, View } from 'react-native';
import { fonts } from '@/constants/theme';
const icons = {
    index: ['cafe', 'cafe-outline'],
    favorites: ['heart', 'heart-outline'],
    journal: ['book', 'book-outline'],
};
function CoffeeBeanIcon({ focused, color }) {
    const { colors, styles } = useThemeStyles(createStyles);
    return <View style={[styles.bean, { borderColor: color }, focused && { backgroundColor: color }]}><View style={[styles.beanSeam, { borderRightColor: focused ? colors.sand : color }]}/></View>;
}
export default function TabLayout() {
    const { colors, styles } = useThemeStyles(createStyles); return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.espresso, tabBarInactiveTintColor: colors.muted, tabBarLabelStyle: { fontFamily: fonts.sansMedium, fontSize: 10, fontWeight: '600', marginTop: 2 }, tabBarStyle: { height: Platform.OS === 'ios' ? 86 : 72, paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 24 : 10, backgroundColor: colors.surface, borderTopColor: colors.line }, tabBarIcon: ({ focused, color, size }) => { const pair = icons[route.name]; return <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>{route.name === 'explore' ? <CoffeeBeanIcon focused={focused} color={String(color)}/> : <Ionicons name={(pair?.[focused ? 0 : 1] ?? 'cafe-outline')} size={focused ? size - 1 : size - 2} color={String(color)}/>}</View>; } })}><Tabs.Screen name="index" options={{ title: 'Home' }}/><Tabs.Screen name="explore" options={{ title: 'Explore' }}/><Tabs.Screen name="favorites" options={{ title: 'Favorites' }}/><Tabs.Screen name="journal" options={{ title: 'Journal' }}/></Tabs>; }
const createStyles = (colors) => StyleSheet.create({
    iconWrap: {
        width: 38,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapActive: {
        backgroundColor: colors.sand,
    },
    bean: {
        width: 16,
        height: 23,
        borderWidth: 1.8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '32deg' }],
    },
    beanSeam: {
        width: 7,
        height: 17,
        borderRightWidth: 1.8,
        borderRadius: 8,
        transform: [{ rotate: '8deg' }],
    },
});
