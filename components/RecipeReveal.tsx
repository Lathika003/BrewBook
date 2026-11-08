import { PropsWithChildren, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Animated, { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { useAppReducedMotion } from '@/hooks/useAppReducedMotion';

type Props = PropsWithChildren<{
  delay?: number;
  variant?: 'title' | 'icon';
  style?: StyleProp<ViewStyle>;
}>;

/** Focus-driven, finite reveals; no layout changes or sideways movement. */
export function RecipeReveal({ children, delay = 0, variant = 'icon', style }: Props) {
  const reducedMotion = useAppReducedMotion();
  const progress = useSharedValue(reducedMotion ? 1 : 0);

  useFocusEffect(useCallback(() => {
    cancelAnimation(progress);
    progress.set(reducedMotion ? 1 : 0);
    if (!reducedMotion) {
      progress.set(withDelay(delay, withTiming(1, {
        duration: variant === 'title' ? 650 : 620,
        easing: Easing.inOut(Easing.cubic),
      })));
    }
    return () => {
      cancelAnimation(progress);
      progress.set(1);
    };
  }, [delay, progress, reducedMotion, variant]));

  const reveal = useAnimatedStyle(() => {
    const value = reducedMotion ? 1 : progress.value;
    return {
      opacity: interpolate(value, [0, 0.5, 1], [0, 1, 1]),
      transform: [{ scale: variant === 'title'
        ? interpolate(value, [0, 1], [0.98, 1])
        : interpolate(value, [0, 0.65, 1], [0.72, 1.06, 1]) }],
    };
  });

  return <Animated.View style={[style, reveal]}>{children}</Animated.View>;
}
