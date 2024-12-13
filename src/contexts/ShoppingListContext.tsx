import { createContext, useContext, useState, useEffect } from "react";
import { type ShoppingListItem, type IngredientCategory } from "@/types/shopping";
import { useMealPlanner } from "./MealPlannerContext";
import { generateShoppingList } from "@/types/shopping";

interface ShoppingListContextType {
  items: ShoppingListItem[];
  addItem: (item: Omit<ShoppingListItem, "id" | "completed">) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  clearCompleted: () => void;
  getItemsByCategory: (category: IngredientCategory) => ShoppingListItem[];
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const { mealPlan } = useMealPlanner();

  // Update shopping list when meal plan changes
  useEffect(() => {
    const plannedRecipes = mealPlan.flatMap(day => day.meals);
    const generatedItems = generateShoppingList(plannedRecipes);
    setItems(current => {
      // Keep manually added items and merge with new generated items
      const manualItems = current.filter(item => !item.recipeId);
      return [...manualItems, ...generatedItems];
    });
  }, [mealPlan]);

  const addItem = (item: Omit<ShoppingListItem, "id" | "completed">) => {
    setItems(current => [
      ...current,
      {
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        completed: false
      }
    ]);
  };

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const clearCompleted = () => {
    setItems(current => current.filter(item => !item.completed));
  };

  const getItemsByCategory = (category: IngredientCategory) => {
    return items.filter(item => item.category === category);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        clearCompleted,
        getItemsByCategory
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error("useShoppingList must be used within a ShoppingListProvider");
  }
  return context;
}