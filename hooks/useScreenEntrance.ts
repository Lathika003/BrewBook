import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppReducedMotion } from './useAppReducedMotion';

type ScreenEntranceVariant = 'page' | 'recipe';

export function useScreenEntrance(variant: ScreenEntranceVariant = 'page') {
  const reducedMotion = useAppReducedMotion();
  const progress = useSharedValue(reducedMotion ? 1 : 0);
  useFocusEffect(useCallback(() => {
    cancelAnimation(progress);
    if (reducedMotion) {
      progress.set(1);
    } else {
      progress.set(0);
      progress.set(withTiming(1, {
        duration: variant === 'recipe' ? 680 : 520,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      }));
    }
    return () => {
      cancelAnimation(progress);
      progress.set(1);
    };
  }, [progress, reducedMotion, variant]));

  return useAnimatedStyle(() => {
    if (reducedMotion) {
      return { opacity: 1, transform: [{ perspective: 1200 }, { translateX: 0 }, { translateY: 0 }, { rotateY: '0deg' }, { rotateX: '0deg' }, { scale: 1 }] };
    }

    const recipe = variant === 'recipe';
    const value = progress.value;
    return {
      opacity: interpolate(value, [0, 0.24, 1], [0, 1, 1]),
      transform: [
        { perspective: recipe ? 900 : 1200 },
        { translateX: interpolate(value, [0, 1], [recipe ? 54 : 24, 0]) },
        { translateY: interpolate(value, [0, 1], [recipe ? 22 : 12, 0]) },
        { rotateY: `${interpolate(value, [0, 1], [recipe ? 9 : 4.5, 0])}deg` },
        { rotateX: `${interpolate(value, [0, 1], [recipe ? -2.5 : -1.2, 0])}deg` },
        { scale: interpolate(value, [0, 1], [recipe ? 0.9 : 0.97, 1]) },
      ],
    };
  });
}
