import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { colors, fonts } from '@/constants/theme';

const icons = { index:['home','home-outline'], explore:['compass','compass-outline'], favorites:['heart','heart-outline'], journal:['book','book-outline'] } as const;
export default function TabLayout() { return <Tabs screenOptions={({route})=>({headerShown:false,tabBarActiveTintColor:colors.espresso,tabBarInactiveTintColor:colors.muted,tabBarLabelStyle:{fontFamily:fonts.sansMedium,fontSize:10,fontWeight:'600',marginTop:2},tabBarStyle:{height:Platform.OS==='ios'?86:72,paddingTop:8,paddingBottom:Platform.OS==='ios'?24:10,backgroundColor:colors.white,borderTopColor:colors.line},tabBarIcon:({focused,color,size})=>{const pair=icons[route.name as keyof typeof icons];return <Ionicons name={(pair?.[focused?0:1]??'ellipse-outline') as keyof typeof Ionicons.glyphMap} size={size} color={String(color)}/>;}})}><Tabs.Screen name="index" options={{title:'Home'}}/><Tabs.Screen name="explore" options={{title:'Explore'}}/><Tabs.Screen name="favorites" options={{title:'Favorites'}}/><Tabs.Screen name="journal" options={{title:'Journal'}}/></Tabs>; }
