import { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { AnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppReducedMotion } from '@/hooks/useAppReducedMotion';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type Props = Omit<PressableProps, 'style'> & { style?: AnimatedProps<PressableProps>['style'] };
export function PressableScale({ children, style, onPressIn, onPressOut, ...props }: PropsWithChildren<Props>) {
  const scale = useSharedValue(1); const reducedMotion = useAppReducedMotion();
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: reducedMotion || props.disabled ? 1 : scale.value }] }));
  return <AnimatedPressable {...props} style={[animated, style]} onPressIn={(e) => { if (!reducedMotion) scale.set(withTiming(.98, { duration:100 })); onPressIn?.(e); }} onPressOut={(e) => { scale.set(reducedMotion ? 1 : withTiming(1, { duration:180 })); onPressOut?.(e); }}>{children}</AnimatedPressable>;
}
