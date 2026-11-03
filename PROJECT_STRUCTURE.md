# Project Structure

```text
app/
  (tabs)/              Home, Explore, Favorites, Journal, tab layout
  recipe/[id].tsx      Dynamic recipe detail route
  brew-guide.tsx       Offline educational guide
  search.tsx           Advanced local search and filters
  settings.tsx         Preferences, local data, about
  _layout.tsx          Root providers and navigation stack
components/            Reusable cards, imagery, controls, typography
constants/             Theme tokens and centralized image registry
context/               Persistent application state and operations
data/                  Typed recipe and guide content
hooks/                 Memoized local recipe search
lib/                   Defensive AsyncStorage adapter
types/                 Shared TypeScript models
assets/                Bundled app and future coffee imagery
```

## Data flow

`data/recipes.ts` is the immutable source of recipe truth. Screens select from it directly or through `useRecipeSearch`. `AppContext` loads the small pieces of user-owned state—favorite IDs, journal entries, and preferences—from `lib/storage.ts`, exposes typed operations, and writes updates back to AsyncStorage.

The image registry is deliberately separate from recipe content. `CoffeeImage` accepts a recipe image key and either renders its bundled source or a stable local placeholder.
