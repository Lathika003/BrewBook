import { useMemo } from 'react';
import recipes from '@/data/recipes';
import { RecipeFilters } from '@/types';

export function useRecipeSearch(query: string, filters: RecipeFilters = {}) {
  return useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery = !needle || recipe.name.toLocaleLowerCase().includes(needle) || recipe.ingredients.some((item) => item.name.toLocaleLowerCase().includes(needle));
      return matchesQuery && (!filters.category || recipe.category === filters.category) && (!filters.difficulty || recipe.difficulty === filters.difficulty) && (!filters.maxTime || recipe.prepTime <= filters.maxTime) && (!filters.temperature || recipe.temperature === filters.temperature);
    });
  }, [query, filters.category, filters.difficulty, filters.maxTime, filters.temperature]);
}
