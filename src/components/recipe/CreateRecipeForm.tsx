import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validation } from "@/lib/utils/validation";
import { IngredientSearch } from "./IngredientSearch";
import { TagSelect } from "./TagSelect";
import { type DbRecipe } from "@/types/database";

interface RecipeIngredient {
  ingredient_id: number;
  ingredient_name: string;
  quantity: number;
  measurement_unit: string;
}

export function CreateRecipeForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Partial<DbRecipe>>({
    title: "",
    description: "",
    prep_time: 0,
    cook_time: 0,
    servings: 4,
    calories: 0,
    is_private: false,
  });
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [instructions, setInstructions] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to create recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Validate recipe data
      if (!validation.isValidTitle(recipe.title!)) {
        throw new Error("Title must be between 3 and 200 characters");
      }

      if (!validation.isValidDescription(recipe.description!)) {
        throw new Error("Description must not exceed 1000 characters");
      }

      if (ingredients.length === 0) {
        throw new Error("At least one ingredient is required");
      }

      if (!instructions.trim()) {
        throw new Error("Instructions are required");
      }

      // Create recipe in database
      // Note: Implementation will be added in the next step

      toast({
        title: "Recipe created successfully!",
        description: "Your recipe has been saved.",
      });

      // Reset form
      setRecipe({
        title: "",
        description: "",
        prep_time: 0,
        cook_time: 0,
        servings: 4,
        calories: 0,
        is_private: false,
      });
      setIngredients([]);
      setSelectedTags([]);
      setInstructions("");

    } catch (error) {
      toast({
        title: "Error creating recipe",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Recipe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                value={recipe.title}
                onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                placeholder="Enter recipe title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={recipe.description}
                onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                placeholder="Describe your recipe"
                required
              />
            </div>
          </div>

          {/* Time and Servings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prepTime">Prep Time (minutes)</Label>
              <Input
                id="prepTime"
                type="number"
                min="0"
                value={recipe.prep_time}
                onChange={(e) => setRecipe({ ...recipe, prep_time: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="cookTime">Cook Time (minutes)</Label>
              <Input
                id="cookTime"
                type="number"
                min="0"
                value={recipe.cook_time}
                onChange={(e) => setRecipe({ ...recipe, cook_time: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                min="1"
                value={recipe.servings}
                onChange={(e) => setRecipe({ ...recipe, servings: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="calories">Calories (per serving)</Label>
              <Input
                id="calories"
                type="number"
                min="0"
                value={recipe.calories}
                onChange={(e) => setRecipe({ ...recipe, calories: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <Label>Ingredients</Label>
            <IngredientSearch
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
            />
          </div>

          {/* Instructions */}
          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter cooking instructions"
              className="min-h-[200px]"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <TagSelect
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Privacy Setting */}
          <div>
            <Label htmlFor="privacy">Privacy</Label>
            <Select
              value={recipe.is_private ? "private" : "public"}
              onValueChange={(value) => setRecipe({ ...recipe, is_private: value === "private" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select privacy setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Recipe"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}