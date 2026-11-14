import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, radius } from '@/constants/theme';
import { useThemeStyles } from '@/context/ThemeContext';
import { CustomButton } from './CustomButton';

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const rest = String(seconds % 60).padStart(2, '0');
    const clock = String(minutes).padStart(2, '0') + ':' + rest;
    return hours > 0 ? hours + ':' + clock : clock;
}

export function BrewTimer({ prepTime }) {
    const { styles } = useThemeStyles(createStyles);
    const duration = prepTime * 60;
    const [remaining, setRemaining] = useState(duration);
    const [status, setStatus] = useState('idle');
    const deadline = useRef(null);

    useEffect(() => {
        if (status !== 'running') return;
        const update = () => {
            if (deadline.current === null) return;
            const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
            setRemaining(seconds);
            if (seconds === 0) {
                deadline.current = null;
                setStatus('finished');
            }
        };
        update();
        const interval = setInterval(update, 250);
        return () => clearInterval(interval);
    }, [status]);

    function start() {
        deadline.current = Date.now() + duration * 1000;
        setRemaining(duration);
        setStatus('running');
    }

    function reset() {
        deadline.current = null;
        setRemaining(duration);
        setStatus('idle');
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Brew timer</Text>
            <Text style={styles.help}>Times the total recipe preparation, including setup.</Text>
            <Text style={styles.clock} accessibilityLabel={remaining + ' seconds remaining'}>{formatTime(remaining)}</Text>
            <Text style={styles.status}>
                {status === 'finished' ? 'Time is up! Check your brew.' : status === 'running' ? 'Brewing in progress' : 'Ready when you are'}
            </Text>
            <View style={styles.controls}>
                {status !== 'running' && <CustomButton style={styles.control} label={status === 'finished' ? 'Start again' : 'Start Brew Timer'} icon="play-outline" onPress={start}/>}
                <CustomButton label="Reset" variant="secondary" onPress={reset}/>
            </View>
            <Text style={styles.help}>Keep this recipe open while brewing. Leaving this recipe cancels the timer.</Text>
        </View>
    );
}

const createStyles = colors => StyleSheet.create({
    card: { marginTop: 24, padding: 18, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, gap: 12 },
    title: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 25, color: colors.charcoal },
    help: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.muted },
    clock: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 44, fontVariant: ['tabular-nums'], textAlign: 'center', color: colors.espresso },
    status: { fontFamily: fonts.sans, fontSize: 14, textAlign: 'center', color: colors.brown },
    controls: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    control: { flexGrow: 1 },
});
