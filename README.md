# BrewBook

**Your Daily Coffee Ritual** — a premium, offline-first coffee recipe collection and personal brewing journal built with React Native, Expo, and TypeScript.

## Features

- 24 original, typed coffee recipes stored locally
- Editorial Home, Explore, Recipe Details, Search & Filter, Favorites, Journal, Brew Guide, and Settings screens
- Real-time search by recipe name or ingredient
- Combinable category, difficulty, time, and hot/iced filters
- Persistent favorites, journal CRUD, ratings, notes, and preferences through AsyncStorage
- Fully local recipe content and resilient component-based image placeholders
- Reanimated press feedback, expandable guide sections, haptics, and reduced-motion preference
- Safe-area aware layouts, accessible labels, confirmation dialogs, and empty states

## Technology

- Expo SDK 58 / React Native 0.88 / React 19
- Expo Router
- TypeScript (strict mode)
- React Native Reanimated and Gesture Handler
- AsyncStorage
- Expo Linear Gradient, Haptics, and Vector Icons

## Install and run

Requirements: Node.js LTS, npm, and either Expo Go or a configured Android/iOS simulator.

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS on macOS, or scan the QR code with Expo Go. Direct commands:

```bash
npm run android
npm run ios
```

Run verification:

```bash
npm run typecheck
npm run lint
```

## Offline architecture

The recipe dataset and brew-guide content ship inside the app bundle. No API, remote database, remote font, or remote image is used. Favorites, journal entries, and the reduced-motion preference are stored only on the device with AsyncStorage. The static recipe dataset is not duplicated in storage.

## Screens

1. **Home** — featured recipe, categories, popular brews, shortcuts, and daily inspiration.
2. **Explore** — local recipe discovery with search and category selection.
3. **Recipe Details** — immersive artwork, ingredients, method, equipment, tips, favorite and journal actions.
4. **Search & Filter** — real-time multi-filter offline search and result counts.
5. **Favorites** — persistent saved recipe collection.
6. **Coffee Journal** — create, rate, edit, and delete personal tasting entries.
7. **Brew Guide** — expandable techniques and coffee terminology.
8. **Settings** — reduced motion, local data controls, version, credits, and about content.

## Dataset

`data/recipes.ts` contains 24 recipes with stable IDs, categories, descriptions, measured ingredients, preparation steps, time, difficulty, serving size, temperature, equipment, tips, and image keys. `constants/coffeeImages.ts` maps those keys to future local photographs.

## GitHub workflow

Use focused commits so the assignment history shows real development progress:

```bash
git add .
git commit -m "chore: scaffold Expo Router and BrewBook theme"
git commit -m "feat: add local recipe dataset and discovery UI"
git commit -m "feat: persist favorites and coffee journal"
git commit -m "docs: add image and testing guides"
```

Create a GitHub repository, add it as a remote, and push only when ready. No remote is configured or pushed automatically.

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md), [IMAGE_REPLACEMENT_GUIDE.md](./IMAGE_REPLACEMENT_GUIDE.md), and [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md).
