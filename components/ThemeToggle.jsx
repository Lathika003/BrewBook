import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useThemeStyles } from '@/context/ThemeContext';
import { useAppReducedMotion } from '@/hooks/useAppReducedMotion';
import { PressableScale } from './PressableScale';

export function ThemeToggle() {
    const { colors, styles, isDark, setColorScheme } = useThemeStyles(createStyles);
    const reducedMotion = useAppReducedMotion();
    const offset = useSharedValue(isDark ? 34 : 0);
    useEffect(() => {
        offset.set(reducedMotion ? (isDark ? 34 : 0) : withTiming(isDark ? 34 : 0, { duration: 180 }));
    }, [isDark, reducedMotion, offset]);
    const thumb = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));

    return <PressableScale accessibilityRole="switch" accessibilityLabel="Dark mode"
        accessibilityState={{ checked: isDark }} accessibilityHint="Switch between light and dark appearance"
        onPress={() => setColorScheme(isDark ? 'light' : 'dark')} style={styles.target}>
        <View style={styles.track} pointerEvents="none">
            <Animated.View style={[styles.thumb, thumb]}/>
            <View style={styles.option}><Ionicons name="sunny" size={17} color={isDark ? colors.muted : colors.onAccent}/></View>
            <View style={styles.option}><Ionicons name="moon" size={16} color={isDark ? colors.onAccent : colors.muted}/></View>
        </View>
    </PressableScale>;
}

const createStyles = (colors) => StyleSheet.create({
    target: { minWidth: 76, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
    track: { width: 74, height: 38, borderRadius: 19, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.pale, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 2 },
    thumb: { position: 'absolute', left: 3, top: 3, width: 30, height: 30, borderRadius: 15, backgroundColor: colors.espresso },
    option: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
});
