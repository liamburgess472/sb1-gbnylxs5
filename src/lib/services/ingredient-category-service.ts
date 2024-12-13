import { supabase } from '@/lib/supabase';
import { type DbIngredientCategory } from '@/types/database';

export const IngredientCategoryService = {
  getAll: async (): Promise<DbIngredientCategory[]> => {
    const { data, error } = await supabase
      .from('ingredient_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  getById: async (categoryId: number): Promise<DbIngredientCategory | null> => {
    const { data, error } = await supabase
      .from('ingredient_categories')
      .select('*')
      .eq('category_id', categoryId)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (category: Omit<DbIngredientCategory, 'category_id' | 'created_at'>): Promise<DbIngredientCategory> => {
    const { data, error } = await supabase
      .from('ingredient_categories')
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create category');
    return data;
  },

  update: async (categoryId: number, updates: Partial<Omit<DbIngredientCategory, 'category_id' | 'created_at'>>): Promise<DbIngredientCategory> => {
    const { data, error } = await supabase
      .from('ingredient_categories')
      .update(updates)
      .eq('category_id', categoryId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update category');
    return data;
  },

  delete: async (categoryId: number): Promise<void> => {
    const { error } = await supabase
      .from('ingredient_categories')
      .delete()
      .eq('category_id', categoryId);

    if (error) throw error;
  }
};