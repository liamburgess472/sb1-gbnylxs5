import { format } from "date-fns";
import { Plus, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Recipe } from "@/types/recipe";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { type MealType } from "@/types/meal-planner";
import { useNavigate } from "react-router-dom";

interface DailyRecipeListProps {
  date: Date;
  recipes: Array<{
    type: MealType;
    recipe: Recipe;
  }>;
  onAddRecipe: () => void;
}

export function DailyRecipeList({ date, recipes, onAddRecipe }: DailyRecipeListProps) {
  const { removeRecipeFromMealPlan } = useMealPlanner();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          Meals for {format(date, 'EEEE, MMMM d')}
        </h3>
        <Button onClick={onAddRecipe}>
          <Plus className="h-4 w-4 mr-2" />
          Add Recipe
        </Button>
      </div>

      {recipes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No meals planned for this day</p>
            <Button variant="outline" onClick={onAddRecipe}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Recipe
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((meal) => (
            <Card 
              key={`${meal.type}-${meal.recipe.id}`} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/recipe/${meal.recipe.id}`)}
            >
              <div className="aspect-video relative">
                <img
                  src={meal.recipe.image}
                  alt={meal.recipe.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="capitalize">
                    {meal.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">{meal.recipe.title}</h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {meal.recipe.prepTime + meal.recipe.cookTime} min
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {meal.recipe.servings} servings
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecipeFromMealPlan(meal.recipe.id, date, meal.type);
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}