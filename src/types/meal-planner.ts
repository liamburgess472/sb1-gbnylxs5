export type MealType = 'breakfast' | 'am-snack' | 'lunch' | 'pm-snack' | 'dinner';

export interface MealPlanDay {
  date: Date;
  dayName: string;
  meals: {
    type: MealType;
    recipe: Recipe;
  }[];
}

export interface MealTypeOption {
  value: MealType;
  label: string;
  description: string;
}

export const MEAL_TYPES: MealTypeOption[] = [
  {
    value: 'breakfast',
    label: 'Breakfast',
    description: 'Start your day right'
  },
  {
    value: 'am-snack',
    label: 'AM Snack',
    description: 'Mid-morning energy boost'
  },
  {
    value: 'lunch',
    label: 'Lunch',
    description: 'Midday meal'
  },
  {
    value: 'pm-snack',
    label: 'PM Snack',
    description: 'Afternoon pick-me-up'
  },
  {
    value: 'dinner',
    label: 'Dinner',
    description: 'Evening meal'
  }
];