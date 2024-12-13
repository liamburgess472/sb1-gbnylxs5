import { supabase } from '@/lib/supabase';
import { type DbIngredient } from '@/types/database';

export const IngredientService = {
  getAll: async (): Promise<DbIngredient[]> => {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .order('ingredient_name');

    if (error) throw error;
    return data || [];
  },

  getByCategory: async (categoryId: number): Promise<DbIngredient[]> => {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('category_id', categoryId)
      .order('ingredient_name');

    if (error) throw error;
    return data || [];
  },

  getById: async (ingredientId: number): Promise<DbIngredient | null> => {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('ingredient_id', ingredientId)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (ingredient: Omit<DbIngredient, 'ingredient_id' | 'created_at'>): Promise<DbIngredient> => {
    const { data, error } = await supabase
      .from('ingredients')
      .insert(ingredient)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create ingredient');
    return data;
  },

  update: async (ingredientId: number, updates: Partial<Omit<DbIngredient, 'ingredient_id' | 'created_at'>>): Promise<DbIngredient> => {
    const { data, error } = await supabase
      .from('ingredients')
      .update(updates)
      .eq('ingredient_id', ingredientId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update ingredient');
    return data;
  },

  delete: async (ingredientId: number): Promise<void> => {
    const { error } = await supabase
      .from('ingredients')
      .delete()
      .eq('ingredient_id', ingredientId);

    if (error) throw error;
  },

  search: async (query: string): Promise<DbIngredient[]> => {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .ilike('ingredient_name', `%${query}%`)
      .order('ingredient_name')
      .limit(10);

    if (error) throw error;
    return data || [];
  }
};