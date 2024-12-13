export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  isPrivate?: boolean;
  userId?: string;
  tags?: string[];
  ingredients: {
    ingredient_id: number;
    name: string;
    quantity: number;
    unit_id: number;
  }[];
  instructions?: string[];
  influencer: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface RecipeIngredient {
  ingredient_id: number;
  name: string;
  quantity: number;
  unit_id: number;
}

export interface RecipeCardProps {
  recipe: Recipe;
  onInfluencerClick?: (name: string) => void;
}

export interface RecipeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingRecipe?: Recipe;
}