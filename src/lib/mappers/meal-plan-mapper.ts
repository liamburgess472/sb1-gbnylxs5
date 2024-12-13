import { type MealPlanData } from '@/types/database';
import { type Recipe } from '@/types/recipe';

export function mapMealPlanToViewModel(data: MealPlanData[]) {
  return data.map(item => ({
    id: item.meal_plan_id.toString(),
    dayOfWeek: item.day_of_week,
    recipe: item.recipe ? mapRecipeData(item.recipe) : null
  }));
}

function mapRecipeData(recipeData: any): Recipe {
  return {
    id: recipeData.recipe_id.toString(),
    title: recipeData.title,
    description: '',
    image: recipeData.image_url || '',
    prepTime: recipeData.prep_time || 0,
    cookTime: recipeData.cook_time || 0,
    servings: 4,
    calories: 0,
    influencer: recipeData.influencer ? {
      id: recipeData.influencer.influencer_id.toString(),
      name: recipeData.influencer.name,
      avatar: recipeData.influencer.profile_image_url || ''
    } : null,
    tags: [],
    ingredients: [],
    instructions: []
  };
}