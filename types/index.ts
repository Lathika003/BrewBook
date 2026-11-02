export type RecipeCategory = 'Espresso' | 'Milk Based' | 'Iced Coffee' | 'Cold Brew' | 'Specialty Coffee' | 'Dessert Coffee';
export type Difficulty = 'Easy' | 'Medium' | 'Advanced';
export type Temperature = 'Hot' | 'Iced';
export interface Ingredient { name: string; quantity: string }
export interface Recipe {
  id: string; name: string; category: RecipeCategory; description: string; ingredients: Ingredient[];
  steps: string[]; prepTime: number; difficulty: Difficulty; servings: number; temperature: Temperature;
  equipment: string[]; tips: string[]; imageKey: string; accent: string;
}
export interface JournalEntry { id: string; recipeId: string; rating: number; notes: string; date: string; createdAt: string }
export interface Preferences { reducedMotion: boolean }
export interface RecipeFilters { category?: RecipeCategory; difficulty?: Difficulty; maxTime?: number; temperature?: Temperature }
