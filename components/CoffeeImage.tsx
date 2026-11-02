import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { coffeeImages } from '@/constants/coffeeImages';
import { fonts } from '@/constants/theme';

interface Props { imageKey: string; accent?: string; name?: string; style?: StyleProp<ViewStyle>; compact?: boolean }
export function CoffeeImage({ imageKey, accent = '#9B6B51', name = 'Coffee', style, compact }: Props) {
  const source = coffeeImages[imageKey];
  if (source) return <View style={[styles.wrap, style]}><Image source={source} style={styles.image} resizeMode="cover" /></View>;
  return <View style={[styles.wrap, style]}><LinearGradient colors={[accent, '#34251D']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.gradient}>
    <View style={[styles.sun, compact && styles.sunSmall]} /><View style={[styles.ring, compact && styles.ringSmall]}><Ionicons name="cafe" size={compact ? 28 : 54} color="#F5EBDD" /></View>
    {!compact && <Text numberOfLines={1} style={styles.label}>{name}</Text>}
  </LinearGradient></View>;
}
const styles = StyleSheet.create({ wrap:{ overflow:'hidden', backgroundColor:'#79533D' }, gradient:{ flex:1, alignItems:'center', justifyContent:'center' }, image:{ width:'100%', height:'100%' }, sun:{ position:'absolute', width:180, height:180, borderRadius:90, backgroundColor:'rgba(255,255,255,.07)', top:-55, right:-45 }, sunSmall:{ width:90,height:90 }, ring:{ width:106,height:106,borderRadius:53,borderWidth:1,borderColor:'rgba(245,235,221,.35)',alignItems:'center',justifyContent:'center', backgroundColor:'rgba(52,37,29,.16)' }, ringSmall:{ width:56,height:56,borderRadius:28 }, label:{ position:'absolute',bottom:15,left:16,right:16,color:'rgba(255,255,255,.72)',fontFamily:fonts.sansMedium,fontSize:11,letterSpacing:1.5,textTransform:'uppercase' } });
