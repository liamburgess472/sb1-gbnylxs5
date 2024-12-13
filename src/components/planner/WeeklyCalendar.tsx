import { format, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DayCard } from './DayCard';
import { type MealPlanDay } from '@/types/meal-planner';

interface WeeklyCalendarProps {
  weekDays: MealPlanDay[];
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
  onAddClick: () => void;
  onRemoveRecipe: (recipeId: string, date: Date) => void;
}

export function WeeklyCalendar({ 
  weekDays, 
  currentWeek, 
  onWeekChange, 
  onAddClick,
  onRemoveRecipe 
}: WeeklyCalendarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onWeekChange(subWeeks(currentWeek, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">
          Week of {format(currentWeek, 'MMMM d, yyyy')}
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onWeekChange(addWeeks(currentWeek, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {weekDays.map((day) => (
          <DayCard
            key={format(day.date, 'yyyy-MM-dd')}
            date={day.date}
            meals={day.meals}
            onAddClick={onAddClick}
            onRemoveRecipe={(recipeId) => onRemoveRecipe(recipeId, day.date)}
          />
        ))}
      </div>
    </div>
  );
}