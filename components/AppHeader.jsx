import { useThemeStyles } from '@/context/ThemeContext';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { radius } from '@/constants/theme';
import { PressableScale } from './PressableScale';
import { Title, Eyebrow } from './Typography';
export function AppHeader({ title, eyebrow, back, action }) {
    const { colors, styles } = useThemeStyles(createStyles);
    return <View style={styles.row}>{back && <PressableScale accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.icon}><Ionicons name="arrow-back" size={21} color={colors.espresso}/></PressableScale>}<View style={styles.text}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<Title style={styles.title}>{title}</Title></View>{action && <PressableScale accessibilityRole="button" accessibilityLabel={action.label} onPress={action.onPress} style={styles.icon}><Ionicons name={action.icon} size={21} color={colors.espresso}/></PressableScale>}</View>;
}
const createStyles = (colors) => StyleSheet.create({ row: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }, text: { flex: 1 }, title: { fontSize: 29, lineHeight: 34 }, icon: { width: 44, height: 44, borderRadius: radius.pill, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' } });
