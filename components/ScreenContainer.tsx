import { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

interface Props extends ScrollViewProps { scroll?: boolean; bottomInset?: number }
export function ScreenContainer({ children, scroll = true, bottomInset = 24, contentContainerStyle, ...props }: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  if (!scroll) return <SafeAreaView style={styles.safe} edges={['top']}><View style={styles.fill}>{children}</View></SafeAreaView>;
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingBottom: bottomInset + insets.bottom }, contentContainerStyle]} {...props}>{children}</ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe:{ flex:1, backgroundColor:colors.cream }, fill:{ flex:1 }, content:{ paddingHorizontal:20, paddingTop:12 } });
