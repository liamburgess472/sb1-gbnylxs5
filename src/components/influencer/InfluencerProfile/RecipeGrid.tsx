import { type Recipe } from "@/types/recipe";
import { InstagramCard } from "@/components/recipe/InstagramCard";

interface RecipeGridProps {
  recipes: Recipe[];
  influencerName: string;
}

export function RecipeGrid({ recipes, influencerName }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {influencerName} hasn't shared any recipes yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Latest Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <InstagramCard 
            key={recipe.id} 
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}