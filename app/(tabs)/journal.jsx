import { useThemeStyles } from '@/context/ThemeContext';
import { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import recipes, { getRecipe } from '@/data/recipes';
import { fonts, radius, shadow } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { ScreenContainer } from '@/components/ScreenContainer';
import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { CustomButton } from '@/components/CustomButton';
import { CoffeeImage } from '@/components/CoffeeImage';
import { RatingSelector } from '@/components/RatingSelector';
import { PressableScale } from '@/components/PressableScale';
const today = () => new Date().toISOString().slice(0, 10);
export default function JournalScreen() {
    const { colors, styles } = useThemeStyles(createStyles);
    const params = useLocalSearchParams();
    const { journal, saveEntry, deleteEntry } = useApp();
    const [editing, setEditing] = useState();
    const [manualOpen, setManualOpen] = useState(false);
    const routedRecipeId = params.recipeId && getRecipe(params.recipeId) ? params.recipeId : undefined;
    const modalOpen = manualOpen || Boolean(routedRecipeId);
    const sorted = useMemo(() => [...journal].sort((a, b) => b.date.localeCompare(a.date)), [journal]);
    const start = (entry) => { setEditing(entry); setManualOpen(true); };
    const close = () => { setManualOpen(false); setEditing(undefined); if (routedRecipeId)
        router.setParams({ recipeId: '' }); };
    const remove = (id) => Alert.alert('Delete journal entry?', 'This note cannot be recovered.', [
        { text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => deleteEntry(id) },
    ]);
    return <ScreenContainer>
    <AppHeader title="Coffee journal" eyebrow="Your tasting diary" action={{ icon: 'add', label: 'Add journal entry', onPress: () => start() }}/>
    <Text style={styles.intro}>Capture what you brewed, how it tasted, and what you would change next time.</Text>
    {sorted.length ? sorted.map((entry) => {
            const recipe = getRecipe(entry.recipeId);
            if (!recipe)
                return null;
            return <PressableScale key={entry.id} onPress={() => start(entry)} style={styles.card}>
        <CoffeeImage imageKey={recipe.imageKey} accent={recipe.accent} compact style={styles.thumb}/>
        <View style={styles.cardBody}><Text style={styles.date}>{new Date(`${entry.date}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</Text><Text style={styles.name}>{recipe.name}</Text><View style={styles.stars}>{[1, 2, 3, 4, 5].map((n) => <Ionicons key={n} name={n <= entry.rating ? 'star' : 'star-outline'} size={13} color={colors.brown}/>)}</View><Text numberOfLines={2} style={styles.notes}>{entry.notes || 'No tasting notes added.'}</Text></View>
        <Pressable accessibilityLabel="Delete entry" hitSlop={10} onPress={() => remove(entry.id)}><Ionicons name="trash-outline" size={19} color={colors.muted}/></Pressable>
      </PressableScale>;
        }) : <><EmptyState icon="book-outline" title="Your diary is waiting" description="Record your first brew and begin noticing the details that make each cup yours."/><CustomButton label="Add first entry" icon="add" onPress={() => start()}/></>}
    <CustomButton label="Open brew guide" variant="secondary" icon="library-outline" onPress={() => router.push('/brew-guide')} style={{ marginTop: 18 }}/>
    {modalOpen && <EntryModal entry={editing} initialRecipeId={routedRecipeId} onClose={close} onSave={(value) => { saveEntry(value); close(); }}/>}
  </ScreenContainer>;
}
function EntryModal({ entry, initialRecipeId, onClose, onSave }) {
    const { colors, styles, isDark } = useThemeStyles(createStyles);
    const [recipeId, setRecipeId] = useState(entry?.recipeId ?? initialRecipeId ?? recipes[0].id);
    const [rating, setRating] = useState(entry?.rating ?? 4);
    const [notes, setNotes] = useState(entry?.notes ?? '');
    const [date, setDate] = useState(entry?.date ?? today());
    return <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modal}>
      <View style={styles.modalTop}><View><Text style={styles.modalEye}>{entry ? 'Edit ritual' : 'New ritual'}</Text><Text style={styles.modalTitle}>Brew notes</Text></View><Pressable onPress={onClose} style={styles.close}><Ionicons name="close" size={22} color={colors.espresso}/></Pressable></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
        <Text style={styles.label}>Choose recipe</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 9 }}>{recipes.map((recipe) => <Pressable key={recipe.id} onPress={() => setRecipeId(recipe.id)} style={[styles.recipeChoice, recipeId === recipe.id && styles.recipeSelected]}><Text style={[styles.recipeChoiceText, recipeId === recipe.id && styles.recipeSelectedText]}>{recipe.name}</Text></Pressable>)}</ScrollView>
        <Text style={styles.label}>Your rating</Text><RatingSelector value={rating} onChange={setRating}/>
        <Text style={styles.label}>Brew date</Text><TextInput keyboardAppearance={isDark ? "dark" : "light"} selectionColor={colors.espresso} placeholderTextColor={colors.muted} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" keyboardType="numbers-and-punctuation" style={styles.input}/>
        <Text style={styles.label}>Tasting notes</Text><TextInput keyboardAppearance={isDark ? "dark" : "light"} selectionColor={colors.espresso} placeholderTextColor={colors.muted} value={notes} onChangeText={setNotes} placeholder="Aroma, sweetness, texture, what you would change…" multiline style={[styles.input, styles.textarea]}/>
        <CustomButton label={entry ? 'Save changes' : 'Save to journal'} icon="checkmark" onPress={() => { if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        Alert.alert('Check the date', 'Use the format YYYY-MM-DD.');
        return;
    } onSave({ id: entry?.id, recipeId, rating, notes: notes.trim(), date }); }}/>
      </ScrollView>
    </KeyboardAvoidingView>
  </Modal>;
}
const createStyles = (colors) => StyleSheet.create({
    intro: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.muted, marginTop: -8, marginBottom: 22 },
    card: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 12, backgroundColor: colors.surface, borderRadius: radius.lg, marginBottom: 12, ...shadow.card },
    thumb: { width: 82, height: 96, borderRadius: radius.md }, cardBody: { flex: 1 }, date: { fontFamily: fonts.sansMedium, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: colors.brown },
    name: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 19, color: colors.charcoal, marginTop: 3 }, stars: { flexDirection: 'row', gap: 2, marginTop: 5 }, notes: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 17, color: colors.muted, marginTop: 6 },
    modal: { flex: 1, backgroundColor: colors.cream }, modalTop: { paddingTop: Platform.OS === 'ios' ? 20 : 42, paddingHorizontal: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalEye: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.brown }, modalTitle: { fontFamily: fonts.serif, fontWeight: '600', fontSize: 30, color: colors.charcoal }, close: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
    form: { padding: 20, paddingBottom: 50 }, label: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 12, color: colors.charcoal, marginTop: 22, marginBottom: 10 }, recipeChoice: { backgroundColor: colors.surface, borderColor: colors.line, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 15, paddingVertical: 10 }, recipeSelected: { backgroundColor: colors.espresso, borderColor: colors.espresso }, recipeChoiceText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.brown }, recipeSelectedText: { color: colors.onAccent },
    input: { minHeight: 52, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 15, fontFamily: fonts.sans, fontSize: 14, color: colors.charcoal }, textarea: { height: 130, textAlignVertical: 'top', paddingTop: 14, marginBottom: 24 },
});
