import { useThemeStyles } from '@/context/ThemeContext';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '@/data/recipes';
import { fonts } from '@/constants/theme';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppHeader } from '@/components/AppHeader';
import { SearchBar } from '@/components/SearchBar';
import { CategoryChip } from '@/components/CategoryChip';
import { CoffeeCard } from '@/components/CoffeeCard';
import { EmptyState } from '@/components/EmptyState';
export default function ExploreScreen() {
    const { colors, styles } = useThemeStyles(createStyles); const params = useLocalSearchParams(); const [query, setQuery] = useState(''); const category = categories.includes(params.category) ? params.category : undefined; const setCategory = (value) => router.setParams({ category: value ?? '' }); const results = useRecipeSearch(query, { category }); return <ScreenContainer><AppHeader title="Explore coffee" eyebrow="24 recipes" action={{ icon: 'options-outline', label: 'Advanced filters', onPress: () => router.push('/search') }}/><SearchBar value={query} onChangeText={setQuery}/><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}><CategoryChip label="All" selected={!category} onPress={() => setCategory()}/>{categories.map(c => <CategoryChip key={c} label={c} selected={category === c} onPress={() => setCategory(c)}/>)}</ScrollView><View style={styles.resultRow}><Text style={styles.count}>{results.length} {results.length === 1 ? 'recipe' : 'recipes'}</Text>{(query || category) && <Text onPress={() => { setQuery(''); setCategory(); }} style={styles.clear}>Clear</Text>}</View>{results.length ? results.map(r => <CoffeeCard key={r.id} recipe={r}/>) : <EmptyState icon="search-outline" title="No brews found" description="Try another name, ingredient, or category."/>}<View style={styles.guide}><Ionicons name="book-outline" size={22} color={colors.brown}/><View style={{ flex: 1 }}><Text style={styles.guideTitle}>New to brewing?</Text><Text style={styles.guideBody}>Visit the Brew Guide for simple, step-by-step techniques.</Text></View><Ionicons name="arrow-forward" size={20} color={colors.brown} onPress={() => router.push('/brew-guide')}/></View></ScreenContainer>; }
const createStyles = (colors) => StyleSheet.create({ chips: { gap: 9, paddingVertical: 16, paddingRight: 20 }, resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 9 }, count: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.muted }, clear: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 12, color: colors.brown }, guide: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: colors.sand, padding: 18, borderRadius: 18, marginTop: 16 }, guideTitle: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 17, color: colors.charcoal }, guideBody: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 17, color: colors.muted, marginTop: 2 } });
