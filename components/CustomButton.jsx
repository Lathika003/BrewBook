import { useThemeStyles } from '@/context/ThemeContext';
import { StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, radius } from '@/constants/theme';
import { PressableScale } from './PressableScale';
export function CustomButton({ label, onPress, icon, variant = 'primary', style }) {
    const { colors, styles } = useThemeStyles(createStyles); return <PressableScale onPress={onPress} accessibilityRole="button" style={[styles.button, variant === 'secondary' && styles.secondary, variant === 'danger' && styles.danger, style]}>{icon && <Ionicons name={icon} size={18} color={variant === 'secondary' ? colors.espresso : variant === 'danger' ? colors.onDanger : colors.onAccent}/>}<Text style={[styles.text, variant === 'secondary' && styles.secondaryText, variant === 'danger' && styles.dangerText]}>{label}</Text></PressableScale>; }
const createStyles = (colors) => StyleSheet.create({ button: { minHeight: 52, paddingHorizontal: 20, borderRadius: radius.md, backgroundColor: colors.espresso, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }, secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }, danger: { backgroundColor: colors.danger }, text: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 14, color: colors.onAccent }, secondaryText: { color: colors.espresso }, dangerText: { color: colors.onDanger } });
