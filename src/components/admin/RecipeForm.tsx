import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RecipeService } from "@/lib/services/recipe-service";
import { type Recipe, type RecipeFormProps } from "@/types/recipe";
import { IngredientInput } from "./recipe/IngredientInput";
import { InstructionsInput } from "./recipe/InstructionsInput";
import { InfluencerSelect } from "./recipe/InfluencerSelect";
import { Loader2 } from "lucide-react";

interface FormData {
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  calories: string;
  tags: string;
  ingredients: NonNullable<Recipe['ingredients']>;
  instructions: NonNullable<Recipe['instructions']>;
  influencerId: string;
}

const defaultFormData: FormData = {
  title: '',
  description: '',
  image: '',
  prepTime: '0',
  cookTime: '0',
  servings: '4',
  calories: '0',
  tags: '',
  ingredients: [],
  instructions: [],
  influencerId: ''
};

export function RecipeForm({ open, onOpenChange, editingRecipe }: RecipeFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        title: editingRecipe.title,
        description: editingRecipe.description,
        image: editingRecipe.image,
        prepTime: editingRecipe.prepTime.toString(),
        cookTime: editingRecipe.cookTime.toString(),
        servings: editingRecipe.servings.toString(),
        calories: editingRecipe.calories.toString(),
        tags: editingRecipe.tags.join(', '),
        ingredients: editingRecipe.ingredients || [],
        instructions: editingRecipe.instructions || [],
        influencerId: editingRecipe.influencer.id
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editingRecipe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recipeData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        prepTime: parseInt(formData.prepTime),
        cookTime: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        calories: parseInt(formData.calories),
        tags: formData.tags.split(',').map(t => t.trim()),
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        influencerId: formData.influencerId
      };

      if (editingRecipe) {
        await RecipeService.update(editingRecipe.id, recipeData);
        toast({
          title: "Success! 🎉",
          description: "Recipe updated successfully.",
          duration: 5000,
        });
      } else {
        await RecipeService.create(recipeData);
        toast({
          title: "Success! 🎉",
          description: "Recipe created successfully.",
          duration: 5000,
        });
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        title: editingRecipe ? "Error updating recipe" : "Error creating recipe",
        description: error instanceof Error ? error.message : "An error occurred while saving the recipe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <InfluencerSelect
              value={formData.influencerId}
              onChange={(value) => setFormData(prev => ({ ...prev, influencerId: value }))}
            />

            <IngredientInput
              ingredients={formData.ingredients}
              onChange={(ingredients) => setFormData(prev => ({ ...prev, ingredients }))}
            />

            <InstructionsInput
              instructions={formData.instructions}
              onChange={(instructions) => setFormData(prev => ({ ...prev, instructions }))}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingRecipe ? "Saving..." : "Creating..."}
                </>
              ) : (
                editingRecipe ? "Save Changes" : "Create Recipe"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}