import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '@/constants/theme';
export function Title({ children, style, ...props }) { return <Text style={[styles.title, style]} {...props}>{children}</Text>; }
export function Body({ children, style, ...props }) { return <Text style={[styles.body, style]} {...props}>{children}</Text>; }
export function Eyebrow({ children, style, ...props }) { return <Text style={[styles.eyebrow, style]} {...props}>{children}</Text>; }
const styles = StyleSheet.create({ title: { fontFamily: fonts.serif, color: colors.charcoal, fontSize: 32, lineHeight: 38, fontWeight: '600' }, body: { fontFamily: fonts.sans, color: colors.muted, fontSize: 15, lineHeight: 22 }, eyebrow: { fontFamily: fonts.sansMedium, color: colors.brown, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '700' } });
