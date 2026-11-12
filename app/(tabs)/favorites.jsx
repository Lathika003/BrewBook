import { useThemeStyles } from '@/context/ThemeContext';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import recipes from '@/data/recipes';
import { fonts } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppHeader } from '@/components/AppHeader';
import { CoffeeCard } from '@/components/CoffeeCard';
import { EmptyState } from '@/components/EmptyState';
import { CustomButton } from '@/components/CustomButton';
export default function FavoritesScreen() {
    const { styles } = useThemeStyles(createStyles); const { favorites } = useApp(); const saved = recipes.filter(r => favorites.includes(r.id)); return <ScreenContainer><AppHeader title="Your favorites" eyebrow="Personal collection"/><Text style={styles.intro}>The recipes worth returning to, gathered in one place.</Text>{saved.length ? saved.map(r => <CoffeeCard key={r.id} recipe={r}/>) : <><EmptyState icon="heart-outline" title="Nothing saved yet" description="Tap the heart on any recipe to build your personal coffee collection."/><CustomButton label="Discover recipes" icon="compass-outline" onPress={() => router.push('/(tabs)/explore')}/></>}</ScreenContainer>; }
const createStyles = (colors) => StyleSheet.create({ intro: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.muted, marginTop: -8, marginBottom: 22 } });
