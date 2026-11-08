import { PropsWithChildren } from 'react';
import { ScrollViewProps, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useScreenEntrance } from '@/hooks/useScreenEntrance';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

interface Props extends ScrollViewProps { scroll?: boolean; bottomInset?: number }
export function ScreenContainer({ children, scroll = true, bottomInset = 24, contentContainerStyle, style, ...props }: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const entrance = useScreenEntrance();
  if (!scroll) return <SafeAreaView style={styles.safe} edges={['top']}><Animated.View style={[styles.fill, style, entrance]}>{children}</Animated.View></SafeAreaView>;
  return <SafeAreaView style={styles.safe} edges={['top']}><Animated.ScrollView style={[style, entrance]} showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingBottom: bottomInset + insets.bottom }, contentContainerStyle]} {...props}>{children}</Animated.ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe:{ flex:1, backgroundColor:colors.cream }, fill:{ flex:1 }, content:{ paddingHorizontal:20, paddingTop:12 } });
