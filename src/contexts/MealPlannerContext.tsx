import { createContext, useContext, useState, useEffect } from "react";
import { addDays, startOfWeek, format } from "date-fns";
import { useAuth } from "./AuthContext";
import { MealPlanService } from "@/lib/services/meal-plan-service";
import { useToast } from "@/hooks/use-toast";
import { type Recipe } from "@/types/recipe";
import { type MealPlanDay, type MealType } from "@/types/meal-planner";

interface MealPlanContextType {
  mealPlan: MealPlanDay[];
  loading: boolean;
  addRecipeToMealPlan: (recipe: Recipe, date: Date, mealType: MealType) => Promise<void>;
  removeRecipeFromMealPlan: (recipeId: string, date: Date, mealType: MealType) => Promise<void>;
}

const MealPlannerContext = createContext<MealPlanContextType | undefined>(undefined);

// Map 3-letter day abbreviations to database format
const DAY_MAP: Record<string, string> = {
  'SUN': 'SUN',
  'MON': 'MON',
  'TUE': 'TUE',
  'WED': 'WED',
  'THU': 'THU',
  'FRI': 'FRI',
  'SAT': 'SAT'
};

export function MealPlannerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>([]);

  const loadMealPlan = async () => {
    console.log('Loading meal plan for user:', user?.id);
    
    if (!user?.id) {
      console.log('No user ID, clearing meal plan');
      setMealPlan([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const weekStart = startOfWeek(new Date());
      console.log('Fetching meal plan for week starting:', format(weekStart, 'yyyy-MM-dd'));
      
      const data = await MealPlanService.getMealPlan(user.id, weekStart);
      console.log('Received meal plan data:', data);
      
      // Convert data to MealPlanDay format
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(weekStart, i);
        const dayAbbr = format(date, 'EEE').toUpperCase();
        const dbDayFormat = DAY_MAP[dayAbbr];
        
        console.log('Processing day:', { dayAbbr, dbDayFormat, date: format(date, 'yyyy-MM-dd') });
        
        const dayMeals = data
          .filter(meal => {
            console.log('Checking meal:', { 
              mealDay: meal.day_of_week, 
              currentDay: dbDayFormat,
              hasRecipe: !!meal.recipes 
            });
            return meal.day_of_week === dbDayFormat && meal.recipes;
          })
          .map(meal => ({
            type: meal.meal_type as MealType,
            recipe: {
              id: meal.recipes.recipe_id.toString(),
              title: meal.recipes.title,
              description: '',
              image: meal.recipes.image_url || '',
              prepTime: meal.recipes.prep_time || 0,
              cookTime: meal.recipes.cook_time || 0,
              servings: 4,
              calories: 0,
              influencer: {
                id: meal.recipes.influencers.influencer_id.toString(),
                name: meal.recipes.influencers.name,
                avatar: meal.recipes.influencers.profile_image_url || ''
              }
            }
          }));

        console.log(`Meals for ${dbDayFormat}:`, dayMeals);

        return {
          date,
          dayName: format(date, 'EEEE'),
          meals: dayMeals
        };
      });

      console.log('Processed meal plan:', days);
      setMealPlan(days);
    } catch (error) {
      console.error("Error loading meal plan:", error);
      toast({
        title: "Error loading meal plan",
        description: "Failed to load your meal plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('User changed, reloading meal plan');
    loadMealPlan();
  }, [user?.id]);

  return (
    <MealPlannerContext.Provider
      value={{
        mealPlan,
        loading,
        addRecipeToMealPlan: async (recipe, date, mealType) => {
          if (!user?.id) {
            toast({
              title: "Please sign in",
              description: "You need to be signed in to add recipes to your meal plan.",
              variant: "destructive"
            });
            return;
          }

          try {
            await MealPlanService.addToMealPlan(user.id, recipe.id, date, mealType);
            await loadMealPlan(); // Reload the entire meal plan to ensure consistency
          } catch (error) {
            console.error("Error adding to meal plan:", error);
            toast({
              title: "Error adding recipe",
              description: "Failed to add recipe to meal plan. Please try again.",
              variant: "destructive"
            });
          }
        },
        removeRecipeFromMealPlan: async (recipeId, date, mealType) => {
          if (!user?.id) return;

          try {
            await MealPlanService.removeFromMealPlan(user.id, recipeId, date, mealType);
            await loadMealPlan(); // Reload the entire meal plan to ensure consistency
          } catch (error) {
            console.error("Error removing from meal plan:", error);
            toast({
              title: "Error removing recipe",
              description: "Failed to remove recipe from meal plan. Please try again.",
              variant: "destructive"
            });
          }
        }
      }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}

export function useMealPlanner() {
  const context = useContext(MealPlannerContext);
  if (context === undefined) {
    throw new Error("useMealPlanner must be used within a MealPlannerProvider");
  }
  return context;
}