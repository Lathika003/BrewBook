import { useThemeStyles } from '@/context/ThemeContext';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function RatingSelector({ value, onChange }) {
    const { colors, styles } = useThemeStyles(createStyles); return <View style={styles.row}>{[1, 2, 3, 4, 5].map(n => <Pressable key={n} hitSlop={5} onPress={() => onChange(n)} accessibilityRole="button" accessibilityLabel={`${n} star rating`}><Ionicons name={n <= value ? 'star' : 'star-outline'} size={31} color={n <= value ? colors.brown : colors.caramel}/></Pressable>)}</View>; }
const createStyles = (colors) => StyleSheet.create({ row: { flexDirection: 'row', gap: 8 } });
