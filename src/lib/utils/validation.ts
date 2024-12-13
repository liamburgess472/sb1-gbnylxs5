import { type MeasurementUnit, type DayOfWeek, type MealType } from '@/types/database-schema';

export const VALID_MEASUREMENT_UNITS: MeasurementUnit[] = ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'piece', 'unit'];
export const VALID_DAYS_OF_WEEK: DayOfWeek[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const VALID_MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export interface IngredientValidation {
  ingredient_id: number;
  quantity: number;
  unit_id: number;
}

export const validation = {
  validateIngredients: (ingredients: IngredientValidation[]): boolean => {
    return ingredients.every(ingredient => 
      Number.isInteger(ingredient.ingredient_id) &&
      ingredient.ingredient_id > 0 &&
      Number.isFinite(ingredient.quantity) &&
      ingredient.quantity > 0 &&
      Number.isInteger(ingredient.unit_id) &&
      ingredient.unit_id > 0
    );
  },

  isValidMeasurementUnit: (unit: string): unit is MeasurementUnit => {
    return VALID_MEASUREMENT_UNITS.includes(unit as MeasurementUnit);
  },

  isValidDayOfWeek: (day: string): day is DayOfWeek => {
    return VALID_DAYS_OF_WEEK.includes(day as DayOfWeek);
  },

  isValidMealType: (type: string): type is MealType => {
    return VALID_MEAL_TYPES.includes(type as MealType);
  },

  isValidQuantity: (quantity: number): boolean => {
    return quantity > 0 && Number.isFinite(quantity);
  },

  isValidTitle: (title: string): boolean => {
    return title.trim().length >= 3 && title.trim().length <= 200;
  },

  isValidDescription: (description: string | null): boolean => {
    if (!description) return true;
    return description.trim().length <= 1000;
  },

  isValidUrl: (url: string | null): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateOrThrow(condition: boolean, message: string): void {
  if (!condition) {
    throw new ValidationError(message);
  }
}