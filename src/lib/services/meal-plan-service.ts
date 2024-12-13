import { supabase } from '@/lib/supabase';
import { startOfWeek, format } from 'date-fns';
import { type MealType } from '@/types/meal-planner';

// Map full day names to abbreviated versions
const DAY_MAP: Record<string, string> = {
  SUNDAY: 'SUN',
  MONDAY: 'MON',
  TUESDAY: 'TUE',
  WEDNESDAY: 'WED',
  THURSDAY: 'THU',
  FRIDAY: 'FRI',
  SATURDAY: 'SAT'
};

export const MealPlanService = {
  getMealPlan: async (userId: string, weekStartDate: Date) => {
    console.log('MealPlanService: Getting meal plan for user:', userId);
    console.log('MealPlanService: Week starting:', format(weekStartDate, 'yyyy-MM-dd'));

    if (!userId) {
      console.warn('MealPlanService: No user ID provided, returning empty array');
      return [];
    }

    try {
      const formattedDate = format(startOfWeek(weekStartDate), 'yyyy-MM-dd');
      console.log('MealPlanService: Formatted date:', formattedDate);

      const { data, error } = await supabase
        .from('meal_plans')
        .select(`
          meal_plan_id,
          day_of_week,
          meal_type,
          recipes!meal_plans_recipe_id_fkey (
            recipe_id,
            title,
            image_url,
            prep_time,
            cook_time,
            influencers!fk_influencer (
              influencer_id,
              name,
              profile_image_url
            )
          )
        `)
        .eq('user_id', userId)
        .eq('week_start_date', formattedDate);

      if (error) {
        console.error('MealPlanService: Database error:', error);
        throw error;
      }

      console.log('MealPlanService: Successfully fetched meal plan data:', data?.length, 'meals');
      return data || [];
    } catch (error) {
      console.error('MealPlanService: Error in getMealPlan:', error);
      throw error;
    }
  },

  addToMealPlan: async (userId: string, recipeId: string, date: Date, mealType: MealType) => {
    console.log('MealPlanService: Adding recipe to meal plan:', {
      userId,
      recipeId,
      date: format(date, 'yyyy-MM-dd'),
      mealType
    });

    try {
      const weekStart = format(startOfWeek(date), 'yyyy-MM-dd');
      const fullDayName = format(date, 'EEEE').toUpperCase();
      const dayOfWeek = DAY_MAP[fullDayName];

      console.log('MealPlanService: Calculated values:', {
        weekStart,
        fullDayName,
        dayOfWeek
      });

      if (!dayOfWeek) {
        console.error('MealPlanService: Invalid day of week:', fullDayName);
        throw new Error('Invalid day of week');
      }

      // Use upsert to check for existing entries and update/create in one query
      const { error } = await supabase
        .from('meal_plans')
        .upsert({
          user_id: userId,
          recipe_id: parseInt(recipeId, 10),
          week_start_date: weekStart,
          day_of_week: dayOfWeek,
          meal_type: mealType
        }, { onConflict: ['user_id', 'week_start_date', 'day_of_week', 'meal_type'] });

      if (error) {
        console.error('MealPlanService: Error upserting meal plan:', error);
        throw error;
      }

      console.log('MealPlanService: Successfully added/updated meal plan');
    } catch (error) {
      console.error('MealPlanService: Error adding to meal plan:', error);
      throw error;
    }
  }
};
