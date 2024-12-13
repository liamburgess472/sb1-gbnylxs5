import { supabase } from '@/lib/supabase';
import { type DbPrivateRecipe } from '@/types/database';

export interface PrivateRecipeIngredient {
  ingredient_id: number;
  quantity: number;
  unit: string;
}

export const PrivateRecipeService = {
  getByUserId: async (userId: string): Promise<DbPrivateRecipe[]> => {
    const { data, error } = await supabase
      .from('private_recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getById: async (recipeId: number, userId: string): Promise<DbPrivateRecipe | null> => {
    const { data, error } = await supabase
      .from('private_recipes')
      .select('*')
      .eq('private_recipe_id', recipeId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (
    userId: string,
    recipe: {
      title: string;
      description?: string;
      url?: string;
      instructions?: string;
      ingredients?: PrivateRecipeIngredient[];
    }
  ): Promise<DbPrivateRecipe> => {
    const { data, error } = await supabase
      .from('private_recipes')
      .insert({
        user_id: userId,
        title: recipe.title,
        description: recipe.description,
        url: recipe.url,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create private recipe');
    return data;
  },

  update: async (
    recipeId: number,
    userId: string,
    updates: Partial<{
      title: string;
      description: string;
      url: string;
      instructions: string;
      ingredients: PrivateRecipeIngredient[];
    }>
  ): Promise<DbPrivateRecipe> => {
    const { data, error } = await supabase
      .from('private_recipes')
      .update(updates)
      .eq('private_recipe_id', recipeId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update private recipe');
    return data;
  },

  delete: async (recipeId: number, userId: string): Promise<void> => {
    const { error } = await supabase
      .from('private_recipes')
      .delete()
      .eq('private_recipe_id', recipeId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  importFromUrl: async (userId: string, url: string): Promise<DbPrivateRecipe> => {
    try {
      // First, scrape the recipe data from the URL
      const response = await fetch(url);
      const html = await response.text();
      
      // Basic extraction of recipe data (you may want to enhance this)
      const title = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1] || 'Imported Recipe';
      const description = html.match(/<meta[^>]*description[^>]*content="([^"]+)"/i)?.[1];
      
      // Create the private recipe
      const { data, error } = await supabase
        .from('private_recipes')
        .insert({
          user_id: userId,
          title,
          description,
          url,
          ingredients: [], // You might want to implement ingredient parsing
          instructions: '' // You might want to implement instruction parsing
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to import recipe');
      return data;
    } catch (error) {
      throw new Error(`Failed to import recipe from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  search: async (userId: string, query: string): Promise<DbPrivateRecipe[]> => {
    const { data, error } = await supabase
      .from('private_recipes')
      .select('*')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};