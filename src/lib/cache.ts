import { type Recipe } from '@/types/recipe';
import { type Influencer } from '@/types/influencer';
import { type UserProfile } from '@/types/user';
import { allRecipes } from '@/data/recipes';
import { influencers } from '@/data/influencers';

// In-memory cache
const cache = {
  recipes: [...allRecipes],
  influencers: [...influencers],
  users: new Map<string, UserProfile>(),
  userSettings: new Map(),
};

// Recipe functions
export function getRecipes(): Recipe[] {
  return cache.recipes;
}

export function getFeaturedRecipes(): Recipe[] {
  return cache.recipes.slice(0, 6);
}

export function getRecipeById(id: string): Recipe | undefined {
  return cache.recipes.find(recipe => recipe.id === id);
}

export function addRecipe(recipe: Recipe) {
  const newRecipe = {
    ...recipe,
    id: Math.random().toString(36).substr(2, 9),
  };
  cache.recipes.push(newRecipe);
  return newRecipe;
}

// Influencer functions
export function getInfluencers(): Influencer[] {
  return cache.influencers;
}

export function getInfluencerById(id: string): Influencer | undefined {
  return cache.influencers.find(influencer => influencer.id === id);
}

export function getInfluencerByName(name: string): Influencer | undefined {
  return cache.influencers.find(influencer => influencer.name === name);
}

export function addInfluencer(influencer: Influencer) {
  cache.influencers.push(influencer);
}

// User functions
export function getUser(id: string): UserProfile | undefined {
  return cache.users.get(id);
}

export function setUser(id: string, profile: UserProfile) {
  cache.users.set(id, profile);
}

export function getUserSettings(id: string): any {
  return cache.userSettings.get(id) || {
    theme: 'system',
    emailNotifications: true,
    weeklyDigest: true,
    mealPlanReminders: true,
    measurementUnit: 'metric',
    dietaryPreferences: []
  };
}

export function setUserSettings(id: string, settings: any) {
  cache.userSettings.set(id, settings);
}

// Recipe import function
export function importRecipe(recipeData: any): Recipe {
  const defaultInfluencer = cache.influencers[0];
  
  const newRecipe: Recipe = {
    id: Math.random().toString(36).substr(2, 9),
    title: recipeData.title,
    description: recipeData.description,
    image: recipeData.image_url,
    prepTime: recipeData.prep_time || 0,
    cookTime: recipeData.cook_time || 0,
    servings: recipeData.servings || 4,
    calories: 0,
    tags: ['Imported'],
    ingredients: recipeData.ingredients || [],
    instructions: recipeData.instructions || [],
    influencer: {
      id: defaultInfluencer.id,
      name: defaultInfluencer.name,
      avatar: defaultInfluencer.avatar
    }
  };

  cache.recipes.push(newRecipe);
  return newRecipe;
}