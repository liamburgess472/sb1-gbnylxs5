import { type Recipe } from "./recipe";

export type IngredientCategory = 
  | "Produce"
  | "Meat & Seafood"
  | "Dairy & Eggs"
  | "Pantry"
  | "Grains & Bread"
  | "Herbs & Spices"
  | "Condiments"
  | "Other";

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: IngredientCategory;
  completed: boolean;
  recipeId?: string;
  recipeName?: string;
}

export interface ShoppingListContextType {
  items: ShoppingListItem[];
  addItem: (item: Omit<ShoppingListItem, "id" | "completed">) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  clearCompleted: () => void;
  getItemsByCategory: (category: IngredientCategory) => ShoppingListItem[];
}

export interface ShoppingListProviderProps {
  children: React.ReactNode;
}

export function categorizeIngredient(name: string): IngredientCategory {
  const lowerName = name.toLowerCase();
  
  if (/lettuce|tomato|cucumber|carrot|pepper|onion|garlic|potato|avocado|mushroom/.test(lowerName)) {
    return "Produce";
  }
  if (/chicken|beef|fish|salmon|shrimp|pork/.test(lowerName)) {
    return "Meat & Seafood";
  }
  if (/milk|cheese|yogurt|cream|butter|egg/.test(lowerName)) {
    return "Dairy & Eggs";
  }
  if (/flour|rice|pasta|bread|bagel|wrap|quinoa/.test(lowerName)) {
    return "Grains & Bread";
  }
  if (/basil|oregano|thyme|mint|spice|seasoning/.test(lowerName)) {
    return "Herbs & Spices";
  }
  if (/oil|vinegar|sauce|dressing|mayo|mustard/.test(lowerName)) {
    return "Condiments";
  }
  if (/bean|lentil|chickpea|stock|broth|sugar|salt/.test(lowerName)) {
    return "Pantry";
  }
  
  return "Other";
}

export function generateShoppingList(recipes: Recipe[]): ShoppingListItem[] {
  const items: ShoppingListItem[] = [];
  let id = 1;

  recipes.forEach(recipe => {
    recipe.ingredients?.forEach(ingredient => {
      items.push({
        id: `${id++}`,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        category: categorizeIngredient(ingredient.name),
        completed: false,
        recipeId: recipe.id,
        recipeName: recipe.title
      });
    });
  });

  return items;
}