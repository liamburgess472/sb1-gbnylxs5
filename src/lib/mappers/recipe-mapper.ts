import { type Recipe } from '@/types/recipe';

export function mapRecipeFromDb(recipeData: any): Recipe {
  return {
    id: recipeData.recipe_id.toString(),
    title: recipeData.title,
    description: recipeData.description || '',
    image: recipeData.image_url || '',
    prepTime: recipeData.prep_time || 0,
    cookTime: recipeData.cook_time || 0,
    servings: recipeData.servings || 4,
    calories: recipeData.calories || 0,
    tags: recipeData.recipe_tags?.map((rt: any) => rt.tags.tag_name) || [],
    influencer: recipeData.influencer ? {
      id: recipeData.influencer.influencer_id.toString(),
      name: recipeData.influencer.name,
      avatar: recipeData.influencer.profile_image_url || ''
    } : null,
    ingredients: [],
    instructions: []
  };
}