import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';
export function SectionHeader({ title, action, onAction }) { return <View style={styles.row}><Text style={styles.title}>{title}</Text>{action && <Pressable onPress={onAction} hitSlop={8}><Text style={styles.action}>{action}</Text></Pressable>}</View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, marginTop: 26 }, title: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 23, color: colors.charcoal }, action: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 12, color: colors.brown } });
