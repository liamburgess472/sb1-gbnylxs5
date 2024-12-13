import { WeekCalendar } from "./WeekCalendar";
import { DailyRecipeList } from "./DailyRecipeList";
import { AddRecipeDialog } from "./AddRecipeDialog";
import { useState } from "react";
import { format } from "date-fns";
import { useMealPlanWeek } from "./hooks/useMealPlanWeek";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMealPlanner } from "@/contexts/MealPlannerContext";

export function NewMealPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const { weekDays, currentWeek, setCurrentWeek } = useMealPlanWeek();
  const { loading } = useMealPlanner();

  const selectedDayMeals = weekDays.find(
    day => format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  )?.meals || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Weekly Calendar View */}
        <WeekCalendar
          weekDays={weekDays}
          currentWeek={currentWeek}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onWeekChange={setCurrentWeek}
          onAddMeal={() => setShowAddRecipe(true)}
        />

        {/* Daily Recipe List */}
        <DailyRecipeList
          date={selectedDate}
          recipes={selectedDayMeals}
          onAddRecipe={() => setShowAddRecipe(true)}
        />

        {/* Add Recipe Dialog */}
        <AddRecipeDialog
          open={showAddRecipe}
          onOpenChange={setShowAddRecipe}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}