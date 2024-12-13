import { useState, useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { type MealPlanDay } from '@/types/meal-planner';
import { useMealPlanner } from '@/contexts/MealPlannerContext';

export function useMealPlanWeek() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const { mealPlan } = useMealPlanner();

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(currentWeek, i);
      return {
        date,
        dayName: format(date, 'EEEE'),
        meals: mealPlan.find(day => 
          format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        )?.meals || []
      };
    });
  }, [currentWeek, mealPlan]) as MealPlanDay[];

  return {
    currentWeek,
    weekDays,
    setCurrentWeek
  };
}