import { supabase } from '@/lib/supabase';
import { type DbShoppingListItem, type DbIngredient } from '@/types/database';

export const ShoppingItemService = {
  getByListId: async (listId: number): Promise<(DbShoppingListItem & { ingredient: DbIngredient })[]> => {
    const { data, error } = await supabase
      .from('shopping_list_items')
      .select(`
        *,
        ingredient:ingredients (*)
      `)
      .eq('list_id', listId)
      .order('purchased', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  addItem: async (listId: number, ingredientId: number, quantity: number, unit: string): Promise<DbShoppingListItem> => {
    // Check if item already exists in list
    const { data: existingItem } = await supabase
      .from('shopping_list_items')
      .select('*')
      .eq('list_id', listId)
      .eq('ingredient_id', ingredientId)
      .single();

    if (existingItem) {
      // Update quantity of existing item
      const { data, error } = await supabase
        .from('shopping_list_items')
        .update({
          quantity: existingItem.quantity + quantity,
          measurement_unit: unit
        })
        .eq('item_id', existingItem.item_id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update shopping list item');
      return data;
    }

    // Add new item
    const { data, error } = await supabase
      .from('shopping_list_items')
      .insert({
        list_id: listId,
        ingredient_id: ingredientId,
        quantity,
        measurement_unit: unit,
        purchased: false
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to add shopping list item');
    return data;
  },

  updateItem: async (itemId: number, updates: Partial<Omit<DbShoppingListItem, 'item_id'>>): Promise<DbShoppingListItem> => {
    const { data, error } = await supabase
      .from('shopping_list_items')
      .update(updates)
      .eq('item_id', itemId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update shopping list item');
    return data;
  },

  togglePurchased: async (itemId: number): Promise<DbShoppingListItem> => {
    const { data: currentItem } = await supabase
      .from('shopping_list_items')
      .select('purchased')
      .eq('item_id', itemId)
      .single();

    if (!currentItem) throw new Error('Item not found');

    const { data, error } = await supabase
      .from('shopping_list_items')
      .update({ purchased: !currentItem.purchased })
      .eq('item_id', itemId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to toggle item status');
    return data;
  },

  removeItem: async (itemId: number): Promise<void> => {
    const { error } = await supabase
      .from('shopping_list_items')
      .delete()
      .eq('item_id', itemId);

    if (error) throw error;
  },

  clearPurchased: async (listId: number): Promise<void> => {
    const { error } = await supabase
      .from('shopping_list_items')
      .delete()
      .eq('list_id', listId)
      .eq('purchased', true);

    if (error) throw error;
  }
};