import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IngredientService } from "@/lib/services/ingredient-service";
import { RecipeIngredientService } from "@/lib/services/recipe-ingredient-service";
import { type DbIngredient } from "@/types/database";
import { VALID_MEASUREMENT_UNITS } from "@/lib/utils/validation";

interface IngredientSearchProps {
  ingredients: Array<{
    name: string;
    amount: string;
    unit: string;
  }>;
  onIngredientsChange: (ingredients: Array<{
    name: string;
    amount: string;
    unit: string;
  }>) => void;
  recipeId?: string;
}

export function IngredientSearch({ ingredients, onIngredientsChange, recipeId }: IngredientSearchProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DbIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<DbIngredient | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("unit");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const searchIngredients = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const results = await IngredientService.search(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching ingredients:", error);
        setSearchResults([]);
      }
    };

    searchIngredients();
  }, [searchTerm]);

  const handleAddIngredient = async () => {
    if (!selectedIngredient || !quantity) return;

    try {
      if (recipeId) {
        await RecipeIngredientService.addIngredientToRecipe(
          parseInt(recipeId),
          selectedIngredient.ingredient_id,
          parseFloat(quantity),
          unit
        );
      }

      const newIngredient = {
        name: selectedIngredient.ingredient_name,
        amount: quantity,
        unit: unit
      };

      onIngredientsChange([...ingredients, newIngredient]);
      setSelectedIngredient(null);
      setQuantity("");
      setUnit("unit");
      setSearchTerm("");
      setOpen(false);

      toast({
        title: "Ingredient added",
        description: `Added ${quantity} ${unit} of ${selectedIngredient.ingredient_name}`
      });
    } catch (error) {
      toast({
        title: "Error adding ingredient",
        description: "Failed to add ingredient to recipe",
        variant: "destructive"
      });
    }
  };

  const handleRemoveIngredient = async (index: number) => {
    try {
      if (recipeId) {
        // Remove from database if we have a recipe ID
        const ingredient = ingredients[index];
        await RecipeIngredientService.removeIngredientFromRecipe(parseInt(recipeId));
      }

      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      onIngredientsChange(updatedIngredients);

      toast({
        title: "Ingredient removed",
        description: "Ingredient removed from recipe"
      });
    } catch (error) {
      toast({
        title: "Error removing ingredient",
        description: "Failed to remove ingredient from recipe",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-start">
              {selectedIngredient ? selectedIngredient.ingredient_name : "Select ingredient"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search ingredients..."
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandEmpty>No ingredients found.</CommandEmpty>
              <CommandGroup>
                {searchResults.map((ingredient) => (
                  <CommandItem
                    key={ingredient.ingredient_id}
                    value={ingredient.ingredient_name}
                    onSelect={() => {
                      setSelectedIngredient(ingredient);
                      setUnit(ingredient.measurement_unit);
                    }}
                  >
                    {ingredient.ingredient_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Input
          type="number"
          placeholder="Quantity"
          className="w-[100px]"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0"
          step="0.1"
        />

        <select
          className="w-[100px] rounded-md border border-input bg-background px-3 py-2"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          {VALID_MEASUREMENT_UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <Button 
          onClick={handleAddIngredient}
          disabled={!selectedIngredient || !quantity}
        >
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-secondary"
          >
            <span>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveIngredient(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}