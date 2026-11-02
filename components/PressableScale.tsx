import { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useApp } from '@/context/AppContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export function PressableScale({ children, style, onPressIn, onPressOut, ...props }: PropsWithChildren<PressableProps>) {
  const scale = useSharedValue(1); const { preferences } = useApp();
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return <AnimatedPressable {...props} style={[animated, style]} onPressIn={(e) => { if (!preferences.reducedMotion) scale.set(withTiming(.975, { duration:100 })); onPressIn?.(e); }} onPressOut={(e) => { scale.set(withTiming(1, { duration:140 })); onPressOut?.(e); }}>{children}</AnimatedPressable>;
}
