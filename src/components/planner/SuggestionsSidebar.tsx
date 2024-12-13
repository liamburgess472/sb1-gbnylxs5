import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { useToast } from "@/hooks/use-toast";
import { featuredRecipes } from "@/data/recipes";

export function SuggestionsSidebar() {
  const { addRecipeToMealPlan } = useMealPlanner();
  const { toast } = useToast();
  
  // Get 5 random recipes as suggestions
  const suggestions = featuredRecipes
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const handleAddRecipe = (recipe: typeof featuredRecipes[0]) => {
    addRecipeToMealPlan(recipe);
    toast({
      title: "Recipe added to meal plan",
      description: `${recipe.title} has been added to today's meal plan.`,
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Quick Add Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((recipe) => (
            <div
              key={recipe.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{recipe.title}</p>
                <p className="text-sm text-muted-foreground">
                  {recipe.prepTime + recipe.cookTime} min
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleAddRecipe(recipe)}
                className="flex-shrink-0"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}