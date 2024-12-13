import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function TodaysMeals() {
  const navigate = useNavigate();
  const { mealPlan, loading } = useMealPlanner();
  const today = new Date();
  const todayMeals = mealPlan.find(
    day => format(day.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  )?.meals || [];

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Today's Meals</h2>
        <Button onClick={() => navigate("/planner")} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Plan Meals
        </Button>
      </div>

      {todayMeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todayMeals.map((meal) => (
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
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{meal.recipe.title}</h3>
                <p className="text-sm text-muted-foreground">
                  By {meal.recipe.influencer?.name || 'Unknown'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No meals planned for today</p>
            <Button onClick={() => navigate("/planner")}>
              Plan Today's Meals
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}