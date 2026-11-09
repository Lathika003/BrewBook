import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Animated, { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppReducedMotion } from '@/hooks/useAppReducedMotion';
export function AnimatedClockIcon({ size = 16, color }) {
    const reducedMotion = useAppReducedMotion();
    const progress = useSharedValue(reducedMotion ? 1 : 0);
    const stroke = Math.max(1.2, size * 0.09);
    useFocusEffect(useCallback(() => {
        cancelAnimation(progress);
        if (reducedMotion) {
            progress.set(1);
        }
        else {
            progress.set(0);
            progress.set(withTiming(1, { duration: 950, easing: Easing.out(Easing.cubic) }));
        }
        return () => cancelAnimation(progress);
    }, [progress, reducedMotion]));
    const minuteRotor = useAnimatedStyle(() => ({
        transform: [{ rotate: `${interpolate(progress.value, [0, 1], [-90, 270])}deg` }],
    }));
    return <View style={[styles.face, { width: size, height: size, borderRadius: size / 2, borderWidth: stroke, borderColor: color }]}>
    <View style={[styles.rotor, { width: size, height: size, left: -stroke, top: -stroke, transform: [{ rotate: '48deg' }] }]}>
      <View style={[styles.hourHand, { width: stroke, height: size * .22, left: (size - stroke) / 2, top: size * .28, borderRadius: stroke, backgroundColor: color }]}/>
    </View>
    <Animated.View style={[styles.rotor, { width: size, height: size, left: -stroke, top: -stroke }, minuteRotor]}>
      <View style={[styles.minuteHand, { width: stroke, height: size * .32, left: (size - stroke) / 2, top: size * .18, borderRadius: stroke, backgroundColor: color }]}/>
    </Animated.View>
    <View style={[styles.pin, { width: stroke * 2, height: stroke * 2, borderRadius: stroke, backgroundColor: color }]}/>
  </View>;
}
const styles = StyleSheet.create({
    face: { alignItems: 'center', justifyContent: 'center' },
    rotor: { position: 'absolute' },
    hourHand: { position: 'absolute' },
    minuteHand: { position: 'absolute' },
    pin: { position: 'absolute' },
});
