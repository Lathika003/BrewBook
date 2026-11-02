import { StyleSheet, Text } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';
import { PressableScale } from './PressableScale';
export function CategoryChip({ label, selected, onPress }: { label:string; selected?:boolean; onPress:()=>void }) { return <PressableScale onPress={onPress} accessibilityRole="button" accessibilityState={{selected}} style={[styles.chip,selected&&styles.selected]}><Text style={[styles.text,selected&&styles.selectedText]}>{label}</Text></PressableScale>; }
const styles=StyleSheet.create({chip:{paddingHorizontal:16,height:40,borderRadius:radius.pill,backgroundColor:colors.white,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:colors.line},selected:{backgroundColor:colors.espresso,borderColor:colors.espresso},text:{fontFamily:fonts.sansMedium,fontSize:13,color:colors.brown},selectedText:{color:colors.white}});
