import { useThemeStyles } from '@/context/ThemeContext';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { PressableScale } from './PressableScale';
import { useAppReducedMotion } from '@/hooks/useAppReducedMotion';
export function FavoriteButton({ recipeId, floating = false }) {
    const { colors, styles } = useThemeStyles(createStyles);
    const { favorites, toggleFavorite } = useApp();
    const active = favorites.includes(recipeId);
    const reducedMotion = useAppReducedMotion();
    const scale = useSharedValue(1);
    const heartStyle = useAnimatedStyle(() => ({
        transform: [{ scale: reducedMotion ? 1 : scale.value }],
    }));
    useEffect(() => {
        // Reset when motion is disabled or a recycled button changes recipes.
        cancelAnimation(scale);
        scale.set(1);
        return () => cancelAnimation(scale);
    }, [reducedMotion, recipeId, scale]);
    return (<PressableScale accessibilityRole="button" accessibilityLabel={active ? 'Remove from favorites' : 'Add to favorites'} accessibilityState={{ selected: active }} onPress={(event) => {
            event.stopPropagation();
            cancelAnimation(scale);
            scale.set(1);
            if (!active && !reducedMotion) {
                scale.set(withSequence(withTiming(1.24, { duration: 120, easing: Easing.out(Easing.cubic) }), withTiming(1, { duration: 200, easing: Easing.inOut(Easing.cubic) })));
            }
            void Haptics.selectionAsync().catch(() => { });
            toggleFavorite(recipeId);
        }} style={[styles.button, floating && styles.floating]}>
      <Animated.View style={heartStyle} pointerEvents="none">
        <Ionicons name={active ? 'heart' : 'heart-outline'} size={21} color={active ? colors.danger : colors.espresso}/>
      </Animated.View>
    </PressableScale>);
}
const createStyles = (colors) => StyleSheet.create({ button: { width: 42, height: 42, borderRadius: radius.pill, backgroundColor: colors.pale, alignItems: 'center', justifyContent: 'center' }, floating: { backgroundColor: colors.overlaySurface } });
