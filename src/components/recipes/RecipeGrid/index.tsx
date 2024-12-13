import { useState, useEffect } from "react";
import { InstagramCard } from "@/components/recipe/InstagramCard";
import { RecipeFilter } from "@/components/home/RecipeFilter";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

export function RecipeGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await RecipeService.getAll();
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recipes');
      } finally {
        setLoading(false);
      }
    }
    loadRecipes();
  }, []);

  const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags || [])));

  const filteredRecipes = selectedTags.length === 0 
    ? recipes 
    : recipes.filter(recipe => 
        selectedTags.some(tag => recipe.tags?.includes(tag))
      );

  const handleTagSelect = (tag: string) => {
    setSelectedTags(current =>
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          My Recipes
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse through our complete collection of healthy and delicious recipes
        </p>
      </header>

      <RecipeFilter
        tags={allTags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRecipes.map((recipe) => (
          <InstagramCard
            key={recipe.id}
            recipe={recipe}
            className="max-w-none"
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            {recipes.length === 0 
              ? "No recipes available."
              : "No recipes found with the selected filters."}
          </p>
        </div>
      )}
    </div>
  );
}