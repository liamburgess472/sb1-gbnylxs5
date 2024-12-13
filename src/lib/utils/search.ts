import { type Recipe } from '@/types/recipe';
import { type Influencer } from '@/types/influencer';

export async function searchRecipes(recipes: Recipe[], query: string): Promise<Recipe[]> {
  const lowercaseQuery = query.toLowerCase();
  
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export async function searchInfluencers(influencers: Influencer[], query: string): Promise<Influencer[]> {
  const lowercaseQuery = query.toLowerCase();
  
  return influencers.filter(influencer => 
    influencer.name.toLowerCase().includes(lowercaseQuery) ||
    influencer.bio.toLowerCase().includes(lowercaseQuery) ||
    influencer.specialties.some(specialty => 
      specialty.toLowerCase().includes(lowercaseQuery)
    )
  );
}