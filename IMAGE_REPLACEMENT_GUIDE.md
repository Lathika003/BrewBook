# Coffee Image Replacement Guide

BrewBook never uses remote images. Every recipe refers to a stable `imageKey`, and `CoffeeImage` automatically renders premium local placeholder art when that key has no photograph.

## Add photographs

1. Create `assets/images/coffee/` if it does not exist.
2. Add optimized local JPG or PNG files. A portrait-friendly crop around 1200 × 1500 px works well; keep files reasonably compressed.
3. Open `constants/coffeeImages.ts`.
4. Replace the matching `undefined` with a static `require`:

```ts
export const coffeeImages = {
  espresso: require('@/assets/images/coffee/espresso.jpg'),
  // Other keys can remain undefined until their images are ready.
};
```

Static `require(...)` calls are necessary so Metro includes images in the offline app bundle. Do not build paths dynamically and do not use URLs.

## Add a new recipe image key

Add the same key in two places:

- `imageKey` on the recipe in `data/recipes.ts`
- A registry entry in `constants/coffeeImages.ts`

No screen or card component needs to change. If the registry entry is missing or `undefined`, the designed placeholder remains visible and dimensions stay stable.

## Image behavior

- Cards and hero areas use `resizeMode="cover"`.
- Containers own their dimensions and rounding, preventing layout shifts.
- The placeholder uses each recipe’s accent color and a local vector icon.
- Keep important subjects near the center to support both card and hero crops.
