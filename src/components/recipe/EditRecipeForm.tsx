import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { RecipeService } from "@/lib/services/recipe-service";
import { RecipeTagService } from "@/lib/services/recipe-tag-service";
import { IngredientSearch } from "./IngredientSearch";
import { type Recipe } from "@/types/recipe";
import { type DbTag } from "@/types/database";

interface EditRecipeFormProps {
  recipe: Recipe;
  onSave: () => void;
  onCancel: () => void;
}

export function EditRecipeForm({ recipe, onSave, onCancel }: EditRecipeFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [prepTime, setPrepTime] = useState(recipe.prepTime.toString());
  const [cookTime, setCookTime] = useState(recipe.cookTime.toString());
  const [servings, setServings] = useState(recipe.servings.toString());
  const [calories, setCalories] = useState(recipe.calories.toString());
  const [selectedTags, setSelectedTags] = useState<string[]>(recipe.tags || []);
  const [availableTags, setAvailableTags] = useState<DbTag[]>([]);
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [tagSearchOpen, setTagSearchOpen] = useState(false);

  useEffect(() => {
    async function loadTags() {
      try {
        const tags = await RecipeTagService.getAllTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Error loading tags:', error);
        toast({
          title: "Error loading tags",
          description: "Failed to load available tags",
          variant: "destructive"
        });
      }
    }
    loadTags();
  }, [toast]);

  const handleTagSelect = async (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      try {
        await RecipeTagService.removeTagFromRecipe(recipe.id, tagName);
        setSelectedTags(prev => prev.filter(t => t !== tagName));
        toast({
          title: "Tag removed",
          description: `Removed tag: ${tagName}`
        });
      } catch (error) {
        toast({
          title: "Error removing tag",
          description: "Failed to remove tag from recipe",
          variant: "destructive"
        });
      }
    } else if (selectedTags.length < 3) {
      try {
        await RecipeTagService.addTagToRecipe(recipe.id, tagName);
        setSelectedTags(prev => [...prev, tagName]);
        toast({
          title: "Tag added",
          description: `Added tag: ${tagName}`
        });
      } catch (error) {
        toast({
          title: "Error adding tag",
          description: "Failed to add tag to recipe",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Maximum tags reached",
        description: "You can only add up to 3 tags per recipe",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await RecipeService.update(recipe.id, {
        title,
        description,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        servings: parseInt(servings),
        calories: parseInt(calories),
        ingredients,
        tags: selectedTags
      });

      toast({
        title: "Recipe updated",
        description: "Your changes have been saved successfully."
      });
      onSave();
    } catch (error) {
      toast({
        title: "Error updating recipe",
        description: error instanceof Error ? error.message : "Failed to update recipe",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="prepTime">Prep Time (minutes)</Label>
            <Input
              id="prepTime"
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="cookTime">Cook Time (minutes)</Label>
            <Input
              id="cookTime"
              type="number"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="servings">Servings</Label>
            <Input
              id="servings"
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label>Tags ({selectedTags.length}/3)</Label>
          <div className="flex flex-col gap-2">
            <Popover open={tagSearchOpen} onOpenChange={setTagSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={tagSearchOpen}
                  className="w-full justify-between"
                  disabled={selectedTags.length >= 3}
                >
                  Select tags...
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search tags..." />
                  <CommandEmpty>No tags found.</CommandEmpty>
                  <CommandGroup>
                    {availableTags.map((tag) => (
                      <CommandItem
                        key={tag.tag_id}
                        value={tag.tag_name}
                        onSelect={() => handleTagSelect(tag.tag_name)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTags.includes(tag.tag_name) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {tag.tag_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleTagSelect(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Ingredients</Label>
          <IngredientSearch
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            recipeId={recipe.id}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}