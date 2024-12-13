// Common Types
export type Timestamp = string;
export type UUID = string;

// Measurement Types
export type MeasurementUnit = 'g' | 'kg' | 'ml' | 'l' | 'cup' | 'tbsp' | 'tsp' | 'piece' | 'unit';
export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// Database Schema Types
export interface DbBaseEntity {
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

export interface DbUserOwned {
  user_id: UUID | null;
}

export interface DbIngredientCategory extends DbBaseEntity {
  category_id: number;
  category_name: string;
  display_order: number;
}

export interface DbIngredient extends DbBaseEntity {
  ingredient_id: number;
  ingredient_name: string;
  category_id: number | null;
  measurement_unit: MeasurementUnit;
  is_active: boolean;
}

export interface DbMealPlan extends DbBaseEntity, DbUserOwned {
  meal_plan_id: number;
  week_start_date: string;
  day_of_week: DayOfWeek;
  meal_type: MealType | null;
  recipe_id: number | null;
}

export interface DbRecipe extends DbBaseEntity, DbUserOwned {
  recipe_id: number;
  title: string;
  description: string | null;
  influencer_id: number | null;
  image_url: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  calories: number | null;
  is_private: boolean;
}

export interface DbPrivateRecipe extends DbBaseEntity, DbUserOwned {
  private_recipe_id: number;
  title: string;
  description: string | null;
  url: string | null;
  instructions: string | null;
  ingredients: Array<{
    ingredient_id: number;
    quantity: number;
    unit: MeasurementUnit;
  }> | null;
}

export interface DbRecipeIngredient {
  mapping_id: number;
  recipe_id: number | null;
  ingredient_id: number | null;
  quantity: number;
  measurement_unit: MeasurementUnit | null;
}

export interface DbShoppingList extends DbBaseEntity, DbUserOwned {
  list_id: number;
  week_start_date: string;
  is_current: boolean;
}

export interface DbShoppingListItem {
  item_id: number;
  list_id: number | null;
  ingredient_id: number | null;
  quantity: number;
  measurement_unit: MeasurementUnit | null;
  purchased: boolean;
}

export interface DbTag extends DbBaseEntity {
  tag_id: number;
  tag_name: string;
}

export interface DbRecipeTag {
  mapping_id: number;
  recipe_id: number | null;
  tag_id: number | null;
}