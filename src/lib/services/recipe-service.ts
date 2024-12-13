import { supabase } from '@/lib/supabase';
import { type Recipe } from '@/types/recipe';

export const RecipeService = {
  getAll: async (): Promise<Recipe[]> => {
    console.log("RecipeService: Fetching all recipes");
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select(`
          *,
          influencers!fk_influencer (
            influencer_id,
            name,
            profile_image_url
          )
        `)
        .not("title", "is", null)
        .order("created_at", { ascending: false });

      console.log("Supabase raw data:", data);
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      return (data || [])
        .filter(recipe => recipe && recipe.influencers)
        .map(recipe => ({
          id: recipe.recipe_id.toString(),
          title: recipe.title,
          description: recipe.description || '',
          image: recipe.image_url || '',
          prepTime: recipe.prep_time || 0,
          cookTime: recipe.cook_time || 0,
          servings: recipe.servings || 4,
          calories: recipe.calories || 0,
          tags: recipe.tags || [],
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || [],
          influencer: {
            id: recipe.influencers.influencer_id.toString(),
            name: recipe.influencers.name,
            avatar: recipe.influencers.profile_image_url || ''
          }
        }));
    } catch (error) {
      console.error("RecipeService: Error in getAll:", error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Recipe> => {
    console.log('RecipeService: Fetching recipe by ID:', id);
    try {
      const { data: recipe, error } = await supabase
        .from('recipes')
        .select(`
          *,
          influencer:influencers (
            influencer_id,
            name,
            profile_image_url
          )
        `)
        .eq('recipe_id', id)
        .single();

      if (error) {
        console.error('RecipeService: Error fetching recipe:', error);
        throw error;
      }

      if (!recipe || !recipe.influencer) {
        throw new Error('Recipe not found');
      }

      console.log('RecipeService: Successfully fetched recipe:', recipe.recipe_id);
      return {
        id: recipe.recipe_id.toString(),
        title: recipe.title,
        description: recipe.description || '',
        image: recipe.image_url || '',
        prepTime: recipe.prep_time || 0,
        cookTime: recipe.cook_time || 0,
        servings: recipe.servings || 4,
        calories: recipe.calories || 0,
        tags: recipe.tags || [],
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        influencer: {
          id: recipe.influencer.influencer_id.toString(),
          name: recipe.influencer.name,
          avatar: recipe.influencer.profile_image_url || ''
        }
      };
    } catch (error) {
      console.error('RecipeService: Error in getById:', error);
      throw error;
    }
  },

  getByInfluencerId: async (influencerId: string): Promise<Recipe[]> => {
    console.log('RecipeService: Fetching recipes for influencer:', influencerId);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
    influencer:influencers!fk_influencer (
      influencer_id,
      name,
      profile_image_url
    )
        `)
        .eq('influencer_id', influencerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('RecipeService: Error fetching influencer recipes:', error);
        throw error;
      }

      console.log('RecipeService: Successfully fetched influencer recipes:', data?.length);
      return (data || []).map(recipe => ({
        id: recipe.recipe_id.toString(),
        title: recipe.title,
        description: recipe.description || '',
        image: recipe.image_url || '',
        prepTime: recipe.prep_time || 0,
        cookTime: recipe.cook_time || 0,
        servings: recipe.servings || 4,
        calories: recipe.calories || 0,
        tags: [],
        ingredients: [],
        instructions: [],
        influencer: {
          id: recipe.influencer.influencer_id.toString(),
          name: recipe.influencer.name,
          avatar: recipe.influencer.profile_image_url || ''
        }
      }));
    } catch (error) {
      console.error('RecipeService: Error in getByInfluencerId:', error);
      throw error;
    }
  }
};
