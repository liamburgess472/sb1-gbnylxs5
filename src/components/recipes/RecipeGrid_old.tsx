import { useState, useEffect, useMemo } from "react";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { RecipeFilter } from "@/components/home/RecipeFilter";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";

interface RecipeGridProps {
  onInfluencerClick?: (name: string) => void;
}

export function RecipeGrid({ onInfluencerClick }: RecipeGridProps) {
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

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach(recipe => {
      recipe.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (selectedTags.length === 0) return recipes;
    return recipes.filter(recipe =>
      selectedTags.some(tag => recipe.tags?.includes(tag))
    );
  }, [recipes, selectedTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(current =>
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onInfluencerClick={onInfluencerClick}
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