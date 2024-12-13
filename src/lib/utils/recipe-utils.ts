import { type DbRecipe, type DbPrivateRecipe, type DbRecipeIngredient } from '@/types/database-schema';
import { validation, validateOrThrow } from './validation';

export interface RecipeValidationOptions {
  requireImage?: boolean;
  requireIngredients?: boolean;
  requireInstructions?: boolean;
}

export const recipeUtils = {
  validateRecipe: (recipe: Partial<DbRecipe | DbPrivateRecipe>, options: RecipeValidationOptions = {}) => {
    validateOrThrow(
      validation.isValidTitle(recipe.title!),
      'Title must be between 3 and 200 characters'
    );

    validateOrThrow(
      validation.isValidDescription(recipe.description),
      'Description must not exceed 1000 characters'
    );

    if (options.requireImage) {
      validateOrThrow(
        validation.isValidUrl(recipe.image_url!),
        'A valid image URL is required'
      );
    }

    if ('url' in recipe && recipe.url) {
      validateOrThrow(
        validation.isValidUrl(recipe.url),
        'Recipe URL must be valid'
      );
    }
  },

  validateRecipeIngredient: (ingredient: Partial<DbRecipeIngredient>) => {
    validateOrThrow(
      ingredient.ingredient_id != null,
      'Ingredient ID is required'
    );

    validateOrThrow(
      validation.isValidQuantity(ingredient.quantity!),
      'Quantity must be a positive number'
    );

    validateOrThrow(
      validation.isValidMeasurementUnit(ingredient.measurement_unit!),
      'Invalid measurement unit'
    );
  },

  calculateNutrition: (ingredients: DbRecipeIngredient[]): { calories: number; protein: number; carbs: number; fat: number } => {
    // This is a placeholder - you would implement actual nutrition calculation logic here
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
};