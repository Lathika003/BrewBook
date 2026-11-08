import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { cancelAnimation, Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
        duration: variant === 'recipe' ? 400 : 300,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }));
    }
    return () => {
      cancelAnimation(progress);
      progress.set(1);
    };
  }, [progress, reducedMotion, variant]));

  return useAnimatedStyle(() => {
    if (reducedMotion) {
      return { opacity: 1, transform: [{ translateY: 0 }, { scale: 1 }] };
    }

    const recipe = variant === 'recipe';
    const value = progress.value;
    return {
      opacity: interpolate(value, [0, 1], [recipe ? 0.18 : 0.35, 1], Extrapolation.CLAMP),
      transform: [
        { translateY: interpolate(value, [0, 1], [recipe ? 5 : 3, 0]) },
        { scale: interpolate(value, [0, 1], [recipe ? 0.985 : 0.995, 1]) },
      ],
    };
  });
}
