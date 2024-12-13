import { format, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type MealPlanDay } from "@/types/meal-planner";

interface WeekCalendarProps {
  weekDays: MealPlanDay[];
  currentWeek: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onWeekChange: (date: Date) => void;
  onAddMeal: () => void;
}

export function WeekCalendar({
  weekDays,
  currentWeek,
  selectedDate,
  onDateSelect,
  onWeekChange,
  onAddMeal
}: WeekCalendarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Week of {format(currentWeek, 'MMMM d, yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onWeekChange(new Date(currentWeek.setDate(currentWeek.getDate() - 7)))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onWeekChange(new Date(currentWeek.setDate(currentWeek.getDate() + 7)))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <Card
            key={format(day.date, 'yyyy-MM-dd')}
            className={cn(
              "p-4 cursor-pointer transition-colors",
              isSameDay(day.date, selectedDate) && "ring-2 ring-primary",
              day.meals.length > 0 && "bg-secondary/50"
            )}
            onClick={() => onDateSelect(day.date)}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{format(day.date, 'EEE')}</div>
                <div className="text-sm text-muted-foreground">
                  {format(day.date, 'MMM d')}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDateSelect(day.date);
                  onAddMeal();
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {day.meals.length > 0 && (
              <div className="space-y-1">
                {day.meals.map((meal) => (
                  <div
                    key={`${meal.type}-${meal.recipe.id}`}
                    className="text-sm truncate text-muted-foreground"
                  >
                    <span className="font-medium">{meal.type}:</span> {meal.recipe.title}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}