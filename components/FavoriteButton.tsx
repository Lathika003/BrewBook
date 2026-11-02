import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { PressableScale } from './PressableScale';
export function FavoriteButton({ recipeId, floating=false }: { recipeId:string; floating?:boolean }) { const {favorites,toggleFavorite}=useApp(); const active=favorites.includes(recipeId); return <PressableScale accessibilityRole="button" accessibilityLabel={active?'Remove from favorites':'Add to favorites'} onPress={()=>{void Haptics.selectionAsync();toggleFavorite(recipeId);}} style={[styles.button,floating&&styles.floating]}><Ionicons name={active?'heart':'heart-outline'} size={21} color={active?colors.danger:colors.espresso}/></PressableScale>; }
const styles=StyleSheet.create({button:{width:42,height:42,borderRadius:radius.pill,backgroundColor:colors.pale,alignItems:'center',justifyContent:'center'},floating:{backgroundColor:'rgba(255,255,255,.93)'}});
