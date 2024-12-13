import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { type RecipeIngredient } from "@/types/recipe";

interface RecipeIngredientsProps {
  ingredients: RecipeIngredient[];
  servings: number;
}

export function RecipeIngredients({ ingredients, servings }: RecipeIngredientsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
        <p className="text-sm text-muted-foreground">For {servings} servings</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <li key={`${ingredient.ingredient_id}-${index}`} className="flex justify-between items-center">
              <span>{ingredient.name}</span>
              <span className="text-muted-foreground">
                {ingredient.quantity} {getUnitName(ingredient.unit_id)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function getUnitName(unitId: number): string {
  // This should be replaced with actual unit mapping from your database
  const units: Record<number, string> = {
    1: 'g',
    2: 'kg',
    3: 'ml',
    4: 'l',
    5: 'cup',
    6: 'tbsp',
    7: 'tsp',
    8: 'piece',
    9: 'unit'
  };
  return units[unitId] || 'unit';
}