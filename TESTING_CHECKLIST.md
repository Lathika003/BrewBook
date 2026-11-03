# Testing Checklist

## Automated verification

- [x] Strict TypeScript check (`npm run typecheck`)
- [x] Expo lint (`npm run lint`)
- [x] Expo Doctor dependency/configuration checks (20/20)
- [x] Android production bundle export through Metro

## Navigation and rendering (device/simulator)

- [ ] Home renders inside Android and iOS safe areas
- [ ] All four tabs open and preserve expected state
- [ ] Recipe cards open the matching dynamic detail route
- [ ] Android hardware back returns without loops
- [ ] Search, Brew Guide, and Settings contextual routes return correctly

## Discovery

- [ ] Name search updates immediately
- [ ] Ingredient search returns matching recipes
- [ ] Multiple filters combine correctly
- [ ] Reset clears query and filters
- [ ] Empty state appears for impossible searches

## Persistence and CRUD

- [ ] Favorite a recipe, restart the app, and confirm it remains saved
- [ ] Remove a favorite from Favorites
- [ ] Create a journal entry with recipe, rating, notes, and date
- [ ] Edit an existing journal entry
- [ ] Delete an entry through the confirmation dialog
- [ ] Restart and confirm journal persistence
- [ ] Clear favorites and journal from Settings

## Visual, motion, and accessibility

- [ ] Every missing photograph renders intentional placeholder artwork
- [ ] Long recipe names and notes do not clip at common font scales
- [ ] Keyboard does not obscure journal fields
- [ ] Press feedback and guide expansion feel smooth on mid-range Android
- [ ] Reduced Motion preference minimizes decorative motion
- [ ] VoiceOver/TalkBack announces primary actions meaningfully

Unchecked items require an Android/iOS device or simulator and should not be considered verified by static checks alone.
