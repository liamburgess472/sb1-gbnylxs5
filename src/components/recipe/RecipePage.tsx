import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeDetails } from "./RecipeDetails";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";

export function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      if (!id) {
        setError("Recipe ID is required");
        setLoading(false);
        return;
      }

      try {
        console.log('Loading recipe:', id);
        const data = await RecipeService.getById(id);
        console.log('Recipe loaded:', data);
        setRecipe(data);
        setError(null);
      } catch (err) {
        console.error('Error loading recipe:', err);
        setError(err instanceof Error ? err.message : 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !recipe) {
    return <ErrorState message={error || "Recipe not found"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="max-w-4xl mx-auto space-y-8">
        <RecipeHeader recipe={recipe} />
        <RecipeDetails recipe={recipe} />
        
        <div className="grid md:grid-cols-2 gap-8">
          <RecipeIngredients 
            ingredients={recipe.ingredients || []} 
            servings={recipe.servings} 
          />
          <RecipeInstructions 
            instructions={recipe.instructions || []} 
          />
        </div>
      </div>
    </div>
  );
}