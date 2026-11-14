# BrewBook

**Your Daily Coffee Ritual** — an offline-first coffee recipe collection and personal brewing journal for Android, iOS, and the web.

BrewBook includes 24 coffee recipes, guided brewing instructions, local search and filters, favorites, and a tasting journal. Recipe content ships with the app, while personal data is stored locally on the device.

## Features

- 24 built-in coffee recipes across six categories
- Search by recipe name or ingredient
- Filters for category, difficulty, preparation time, and hot or iced drinks
- Recipe details with ingredients, equipment, steps, and brewing tips
- Brew timer with adjustable duration, pause, resume, reset, and completion feedback
- Persistent favorites and coffee journal entries
- Ratings, tasting notes, and editable journal entries
- Espresso, French press, pour-over, cold brew, and milk-frothing guides
- Reduced-motion preference, accessible labels, empty states, and confirmation dialogs
- Light and dark color-scheme support

## Brew timer

Open a recipe and scroll to **Brew timer** above the method. The default duration is the recipe's total preparation time, including setup; adjust it in 30-second steps to time a specific brewing step. You can pause, resume, reset, or restart the countdown. Reset restores the selected duration.

When the timer finishes, it displays a completion message and gives haptic feedback on supported devices. Keep the recipe open while timing. If the app is backgrounded or your phone is locked, the countdown catches up when you return; it does not send a background notification. Leaving the recipe or restarting the app cancels the timer.

## Built with

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- React Native 0.88 and React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- JavaScript and JSX
- React Native Reanimated and Gesture Handler
- AsyncStorage for on-device persistence
- Expo Linear Gradient, Haptics, and Vector Icons

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS
- npm (included with Node.js)
- One of the following:
  - Expo Go on a supported physical device
  - Android Studio with an Android emulator
  - macOS with Xcode and an iOS Simulator

No API keys, backend, database, or environment variables are required.

### 1. Clone the repository

```bash
git clone https://github.com/Lathika003/BrewBook.git
cd BrewBook
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

When the Expo terminal opens:

- Scan the QR code with Expo Go to open the app on a physical device.
- Press `a` to open it in an Android emulator.
- Press `i` to open it in an iOS Simulator (macOS only).
- Press `w` to open the web version.

Keep the computer and physical device on the same Wi-Fi network. If the device cannot connect over LAN, start Expo with a tunnel:

```bash
npx expo start --tunnel
```

For Expo Go on a physical iOS device, sign in to Expo CLI and Expo Go with the same Expo account:

```bash
npx expo login
```

## Native development builds

To compile and run the native app locally:

```bash
npm run android
npm run ios
```

The Android command requires Android Studio. The iOS command requires macOS and Xcode. These commands are not needed when running through Expo Go or the web.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Build and run the Android app locally |
| `npm run ios` | Build and run the iOS app locally |
| `npm run web` | Start the app for the web |
| `npm run lint` | Run Expo ESLint checks |
| `npm run typecheck` | Run the project's configured compiler check |

## Project structure

```text
app/                 Expo Router screens and layouts
  (tabs)/            Home, Explore, Favorites, and Journal tabs
  recipe/[id].jsx    Dynamic recipe details screen
components/          Reusable UI components
constants/           Theme tokens and the coffee image registry
context/             Shared app state and persistence operations
data/                Local recipes and brewing-guide content
hooks/               Search, animation, and reduced-motion hooks
lib/                 AsyncStorage utilities
assets/              Bundled icons, splash assets, and images
```

## Local data and offline use

Recipes and brewing guides are bundled with the application. Favorites, journal entries, ratings, notes, and preferences are saved on the device with AsyncStorage. Removing the app or clearing its local data can permanently remove this personal content.

## Additional documentation

- [Project structure](./PROJECT_STRUCTURE.md)
- [Image replacement guide](./IMAGE_REPLACEMENT_GUIDE.md)
- [Testing checklist](./TESTING_CHECKLIST.md)

## License

This project is licensed under the [MIT License](./LICENSE).
