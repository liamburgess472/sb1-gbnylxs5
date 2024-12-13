import { supabase } from '@/lib/supabase';
import { type DbTag } from '@/types/database';

export const RecipeTagService = {
  getAllTags: async (): Promise<DbTag[]> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('tag_name');

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    return data || [];
  },

  createTag: async (tagName: string): Promise<DbTag> => {
    const { data, error } = await supabase
      .from('tags')
      .insert({ tag_name: tagName })
      .select()
      .single();

    if (error) {
      console.error('Error creating tag:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create tag');
    }

    return data;
  },

  getTagsByRecipeId: async (recipeId: string): Promise<string[]> => {
    const { data, error } = await supabase
      .from('recipe_tags')
      .select(`
        tags (
          tag_name
        )
      `)
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error fetching recipe tags:', error);
      throw error;
    }

    return data?.map(item => item.tags.tag_name) || [];
  },

  addTagToRecipe: async (recipeId: string, tagName: string): Promise<void> => {
    try {
      // First, get or create the tag
      let tagId: number;
      const { data: existingTag } = await supabase
        .from('tags')
        .select('tag_id')
        .eq('tag_name', tagName)
        .single();

      if (existingTag) {
        tagId = existingTag.tag_id;
      } else {
        const { data: newTag, error: createError } = await supabase
          .from('tags')
          .insert({ tag_name: tagName })
          .select('tag_id')
          .single();

        if (createError) throw createError;
        if (!newTag) throw new Error('Failed to create tag');
        tagId = newTag.tag_id;
      }

      // Then create the recipe-tag association
      const { error: linkError } = await supabase
        .from('recipe_tags')
        .insert({
          recipe_id: recipeId,
          tag_id: tagId
        });

      if (linkError) throw linkError;
    } catch (error) {
      console.error('Error adding tag to recipe:', error);
      throw error;
    }
  },

  removeTagFromRecipe: async (recipeId: string, tagName: string): Promise<void> => {
    try {
      const { data: tag } = await supabase
        .from('tags')
        .select('tag_id')
        .eq('tag_name', tagName)
        .single();

      if (tag) {
        const { error } = await supabase
          .from('recipe_tags')
          .delete()
          .eq('recipe_id', recipeId)
          .eq('tag_id', tag.tag_id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error removing tag from recipe:', error);
      throw error;
    }
  },

  searchTags: async (query: string): Promise<DbTag[]> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .ilike('tag_name', `%${query}%`)
      .order('tag_name')
      .limit(10);

    if (error) {
      console.error('Error searching tags:', error);
      throw error;
    }

    return data || [];
  }
};