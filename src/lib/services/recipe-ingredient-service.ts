import { supabase } from '@/lib/supabase';
import { type DbRecipeIngredient, type DbIngredient } from '@/types/database';

export const RecipeIngredientService = {
  getByRecipeId: async (recipeId: number): Promise<(DbRecipeIngredient & { ingredient: DbIngredient })[]> => {
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .select(`
        *,
        ingredient:ingredients (*)
      `)
      .eq('recipe_id', recipeId);

    if (error) throw error;
    return data || [];
  },

  addIngredientToRecipe: async (recipeId: number, ingredientId: number, quantity: number, unit: string): Promise<DbRecipeIngredient> => {
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .insert({
        recipe_id: recipeId,
        ingredient_id: ingredientId,
        quantity,
        measurement_unit: unit
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to add ingredient to recipe');
    return data;
  },

  updateIngredientInRecipe: async (mappingId: number, updates: Partial<Omit<DbRecipeIngredient, 'mapping_id'>>): Promise<DbRecipeIngredient> => {
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .update(updates)
      .eq('mapping_id', mappingId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update recipe ingredient');
    return data;
  },

  removeIngredientFromRecipe: async (mappingId: number): Promise<void> => {
    const { error } = await supabase
      .from('recipe_ingredients')
      .delete()
      .eq('mapping_id', mappingId);

    if (error) throw error;
  }
};