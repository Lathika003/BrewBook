import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppReducedMotion } from '@/hooks/useAppReducedMotion';
import { colors, fonts, radius } from '@/constants/theme';
import { PressableScale } from './PressableScale';
export function CategoryChip({ label, selected = false, onPress }: { label:string; selected?:boolean; onPress:()=>void }) {
  const reducedMotion = useAppReducedMotion();
  const progress = useSharedValue(Number(selected));
  useEffect(() => {
    progress.set(reducedMotion ? Number(selected) : withTiming(Number(selected), { duration: 180 }));
  }, [selected, reducedMotion, progress]);
  const background = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [colors.white, colors.espresso]),
    borderColor: interpolateColor(progress.value, [0, 1], [colors.line, colors.espresso]),
  }));
  const text = useAnimatedStyle(() => ({ color: interpolateColor(progress.value, [0, 1], [colors.brown, colors.white]) }));
  return <PressableScale onPress={onPress} accessibilityRole="button" accessibilityState={{selected}} style={[styles.chip,background]}><Animated.Text style={[styles.text,text]}>{label}</Animated.Text></PressableScale>;
}
const styles=StyleSheet.create({chip:{paddingHorizontal:16,height:40,borderRadius:radius.pill,backgroundColor:colors.white,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:colors.line},selected:{backgroundColor:colors.espresso,borderColor:colors.espresso},text:{fontFamily:fonts.sansMedium,fontSize:13,color:colors.brown},selectedText:{color:colors.white}});
