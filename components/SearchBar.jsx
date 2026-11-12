import { useThemeStyles } from '@/context/ThemeContext';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, radius } from '@/constants/theme';
export function SearchBar({ value, onChangeText, onFocus, placeholder = 'Search recipes or ingredients' }) {
    const { colors, styles, isDark } = useThemeStyles(createStyles); return <View style={styles.wrap}><Ionicons name="search" size={20} color={colors.brown}/><TextInput keyboardAppearance={isDark ? "dark" : "light"} selectionColor={colors.espresso} value={value} onChangeText={onChangeText} onFocus={onFocus} placeholder={placeholder} placeholderTextColor={colors.muted} style={styles.input} returnKeyType="search" accessibilityLabel={placeholder}/>{value.length > 0 && <Ionicons onPress={() => onChangeText('')} name="close-circle" size={19} color={colors.muted}/>}</View>; }
const createStyles = (colors) => StyleSheet.create({ wrap: { height: 54, borderRadius: radius.md, backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 10, borderWidth: 1, borderColor: colors.line }, input: { flex: 1, fontFamily: fonts.sans, fontSize: 14, color: colors.charcoal } });
