import { useEffect, useState } from "react";
import { InstagramCard } from "@/components/recipe/InstagramCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";
import { DaySelectorDialog } from "@/components/recipe/DaySelectorDialog";

export function SuggestedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

 useEffect(() => {
  async function loadRecipes() {
    try {
      const data = await RecipeService.getAll();
      // Get 5 random recipes for suggestions
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRecipes(shuffled.slice(0, 5));
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  }
  loadRecipes();
}, []);



  const handleAddToMealPlan = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Suggested Recipes</h2>
        <Button variant="ghost" onClick={() => navigate("/recipes")}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <InstagramCard
            key={recipe.id}
            recipe={recipe}
            onAddToMealPlan={() => handleAddToMealPlan(recipe)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <DaySelectorDialog
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={() => setSelectedRecipe(null)}
        />
      )}
    </section>
  );
}