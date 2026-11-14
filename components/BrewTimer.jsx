import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { fonts, radius } from '@/constants/theme';
import { useThemeStyles } from '@/context/ThemeContext';
import { CustomButton } from './CustomButton';
import { PressableScale } from './PressableScale';

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const rest = String(seconds % 60).padStart(2, '0');
    const clock = String(minutes).padStart(2, '0') + ':' + rest;
    return hours > 0 ? hours + ':' + clock : clock;
}

function signalCompletion() {
    // Haptics may be unavailable, for example in a browser or iOS Low Power Mode.
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

export function BrewTimer({ prepTime }) {
    const { styles } = useThemeStyles(createStyles);
    const [duration, setDuration] = useState(prepTime * 60);
    const [remaining, setRemaining] = useState(duration);
    const [status, setStatus] = useState('idle');
    const deadline = useRef(null);
    const pausedRemaining = useRef(duration * 1000);

    useFocusEffect(useCallback(() => {
        return () => {
            deadline.current = null;
            pausedRemaining.current = duration * 1000;
            setRemaining(duration);
            setStatus('idle');
        };
    }, [duration]));

    useEffect(() => {
        if (status !== 'running') return;
        const update = () => {
            if (deadline.current === null || AppState.currentState === 'background' || AppState.currentState === 'inactive') return;
            const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
            setRemaining(seconds);
            if (seconds === 0) {
                deadline.current = null;
                setStatus('finished');
                signalCompletion();
            }
        };
        update();
        const interval = setInterval(update, 250);
        const subscription = AppState.addEventListener('change', state => {
            if (state === 'active') update();
        });
        return () => {
            clearInterval(interval);
            subscription.remove();
        };
    }, [status]);

    function start() {
        const milliseconds = status === 'paused' ? pausedRemaining.current : duration * 1000;
        deadline.current = Date.now() + milliseconds;
        setRemaining(Math.ceil(milliseconds / 1000));
        setStatus('running');
    }

    function pause() {
        const milliseconds = Math.max(0, deadline.current - Date.now());
        deadline.current = null;
        pausedRemaining.current = milliseconds;
        setRemaining(Math.ceil(milliseconds / 1000));
        setStatus(milliseconds > 0 ? 'paused' : 'finished');
        if (milliseconds === 0) signalCompletion();
    }

    function reset() {
        deadline.current = null;
        pausedRemaining.current = duration * 1000;
        setRemaining(duration);
        setStatus('idle');
    }

    function adjust(change) {
        const seconds = Math.max(30, Math.min(86400, duration + change));
        setDuration(seconds);
        setRemaining(seconds);
        pausedRemaining.current = seconds * 1000;
        setStatus('idle');
    }

    const canAdjust = status === 'idle' || status === 'finished';
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Brew timer</Text>
            <Text style={styles.help}>Starts with the total recipe prep time. Adjust it to time a brewing step.</Text>
            <Text style={styles.clock} accessibilityLabel={remaining + ' seconds remaining'}>{formatTime(remaining)}</Text>
            <Text style={styles.status} accessibilityLiveRegion="polite" role="status">
                {status === 'finished' ? 'Time is up! Check your brew.' : status === 'paused' ? 'Timer paused' : status === 'running' ? 'Brewing in progress' : 'Ready when you are'}
            </Text>
            <View style={styles.adjustments}>
                {[-30, 30].map(change => {
                    const disabled = !canAdjust || (change < 0 ? duration <= 30 : duration >= 86400);
                    return <PressableScale key={change} accessibilityRole="button" accessibilityLabel={`${change < 0 ? 'Decrease' : 'Increase'} timer by 30 seconds`} accessibilityState={{ disabled }} disabled={disabled} onPress={() => adjust(change)} style={[styles.adjust, disabled && styles.disabled]}>
                        <Text style={styles.adjustText}>{change < 0 ? '−' : '+'} 30 sec</Text>
                    </PressableScale>;
                })}
            </View>
            <View style={styles.controls}>
                <CustomButton style={styles.control} label={status === 'running' ? 'Pause' : status === 'paused' ? 'Resume' : status === 'finished' ? 'Start again' : 'Start Brew Timer'} icon={status === 'running' ? 'pause-outline' : 'play-outline'} onPress={status === 'running' ? pause : start}/>
                <CustomButton label="Reset" variant="secondary" onPress={reset}/>
            </View>
            <Text style={styles.help}>Keep this recipe open. If you lock your phone, check the timer when you return. Leaving this recipe cancels it.</Text>
        </View>
    );
}

const createStyles = colors => StyleSheet.create({
    card: { marginTop: 24, padding: 18, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, gap: 12 },
    title: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 25, color: colors.charcoal },
    help: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.muted },
    clock: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 44, fontVariant: ['tabular-nums'], textAlign: 'center', color: colors.espresso },
    status: { fontFamily: fonts.sans, fontSize: 14, textAlign: 'center', color: colors.brown },
    adjustments: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
    adjust: { minHeight: 44, paddingHorizontal: 16, justifyContent: 'center', borderRadius: radius.sm, backgroundColor: colors.pale },
    adjustText: { fontFamily: fonts.sansMedium, fontSize: 14, color: colors.espresso },
    disabled: { opacity: 0.4 },
    controls: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    control: { flexGrow: 1 },
});
