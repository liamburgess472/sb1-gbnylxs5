import { supabase } from './supabase';
import { type Recipe } from '@/types/recipe';

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select(`
        recipe_id,
        title,
        description,
        image_url,
        prep_time,
        cook_time,
        servings,
        calories,
        is_private,
        user_id,
        influencer:influencers!fk_influencer (
          influencer_id,
          name,
          profile_image_url
        )
      `);

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }

    return (recipes || []).map(recipe => ({
      id: recipe.recipe_id.toString(),
      title: recipe.title,
      description: recipe.description || '',
      image: recipe.image_url || '',
      prepTime: recipe.prep_time || 0,
      cookTime: recipe.cook_time || 0,
      servings: recipe.servings || 4,
      calories: recipe.calories || 0,
      isPrivate: recipe.is_private || false,
      userId: recipe.user_id,
      influencer: recipe.influencer ? {
        id: recipe.influencer.influencer_id.toString(),
        name: recipe.influencer.name,
        avatar: recipe.influencer.profile_image_url || ''
      } : null
    }));
  } catch (error) {
    console.error('Error in fetchRecipes:', error);
    throw error;
  }
}

export async function fetchFeaturedRecipes(): Promise<Recipe[]> {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select(`
        recipe_id,
        title,
        description,
        image_url,
        prep_time,
        cook_time,
        servings,
        calories,
        is_private,
        user_id,
        influencer:influencers!fk_influencer (
          influencer_id,
          name,
          profile_image_url
        )
      `)
      .eq('is_private', false)
      .limit(6);

    if (error) {
      console.error('Error fetching featured recipes:', error);
      throw error;
    }

    return (recipes || []).map(recipe => ({
      id: recipe.recipe_id.toString(),
      title: recipe.title,
      description: recipe.description || '',
      image: recipe.image_url || '',
      prepTime: recipe.prep_time || 0,
      cookTime: recipe.cook_time || 0,
      servings: recipe.servings || 4,
      calories: recipe.calories || 0,
      isPrivate: recipe.is_private || false,
      userId: recipe.user_id,
      influencer: recipe.influencer ? {
        id: recipe.influencer.influencer_id.toString(),
        name: recipe.influencer.name,
        avatar: recipe.influencer.profile_image_url || ''
      } : null
    }));
  } catch (error) {
    console.error('Error in fetchFeaturedRecipes:', error);
    throw error;
  }
}