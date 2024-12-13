import { supabase } from '@/lib/supabase';
import { type DbShoppingList } from '@/types/database';

export const ShoppingListService = {
  getCurrentList: async (userId: string): Promise<DbShoppingList | null> => {
    const { data, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', userId)
      .eq('is_current', true)
      .single();

    if (error) throw error;
    return data;
  },

  getByWeek: async (userId: string, weekStartDate: string): Promise<DbShoppingList | null> => {
    const { data, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start_date', weekStartDate)
      .single();

    if (error) throw error;
    return data;
  },

  create: async (userId: string, weekStartDate: string): Promise<DbShoppingList> => {
    // First, set all existing lists to not current
    await supabase
      .from('shopping_lists')
      .update({ is_current: false })
      .eq('user_id', userId);

    const { data, error } = await supabase
      .from('shopping_lists')
      .insert({
        user_id: userId,
        week_start_date: weekStartDate,
        is_current: true
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create shopping list');
    return data;
  },

  setAsCurrent: async (listId: number, userId: string): Promise<void> => {
    // First, set all lists to not current
    await supabase
      .from('shopping_lists')
      .update({ is_current: false })
      .eq('user_id', userId);

    // Then set the specified list as current
    const { error } = await supabase
      .from('shopping_lists')
      .update({ is_current: true })
      .eq('list_id', listId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  delete: async (listId: number, userId: string): Promise<void> => {
    const { error } = await supabase
      .from('shopping_lists')
      .delete()
      .eq('list_id', listId)
      .eq('user_id', userId);

    if (error) throw error;
  }
};