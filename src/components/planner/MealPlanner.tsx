import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { SuggestionsSidebar } from "./SuggestionsSidebar";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { useMealPlanWeek } from "./hooks/useMealPlanWeek";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function MealPlanner() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { weekDays, currentWeek, setCurrentWeek } = useMealPlanWeek();
  const { loading, removeRecipeFromMealPlan } = useMealPlanner();

  const handleRemoveRecipe = async (recipeId: string, date: Date) => {
    try {
      await removeRecipeFromMealPlan(recipeId, date);
      toast({
        title: "Recipe removed",
        description: "Recipe has been removed from your meal plan."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove recipe from meal plan",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Weekly Meal Planner
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plan your meals for the week ahead and stay organized
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <WeeklyCalendar 
            weekDays={weekDays}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            onAddClick={() => navigate("/recipes")}
            onRemoveRecipe={handleRemoveRecipe}
          />
        </div>
        <div className="lg:col-span-1">
          <SuggestionsSidebar />
          <Button 
            size="lg" 
            className="w-full mt-4 gap-2"
            onClick={() => navigate("/recipes")}
          >
            <Plus className="h-5 w-5" />
            Add New Recipe
          </Button>
        </div>
      </div>
    </div>
  );
}