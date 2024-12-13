import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRecipeSearch } from "./hooks/useRecipeSearch";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { useToast } from "@/hooks/use-toast";
import { MealTypeDialog } from "./MealTypeDialog";
import { type Recipe } from "@/types/recipe";
import { type MealType } from "@/types/meal-planner";
import { InstagramCard } from "@/components/recipe/InstagramCard";

const QUICK_FILTERS = [
  { tag: "breakfast", label: "Breakfast" },
  { tag: "lunch", label: "Lunch" },
  { tag: "dinner", label: "Dinner" },
  { tag: "snack", label: "Snacks" },
  { tag: "quick", label: "Quick & Easy" },
  { tag: "healthy", label: "Healthy" }
];

interface AddRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
}

export function AddRecipeDialog({ open, onOpenChange, selectedDate }: AddRecipeDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { recipes, loading } = useRecipeSearch(searchQuery, selectedTags);
  const { addRecipeToMealPlan } = useMealPlanner();
  const { toast } = useToast();

  const handleTagClick = (tag: string) => {
    setSelectedTags(current =>
      current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag]
    );
  };

  const handleAddRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleMealTypeSelect = async (type: MealType) => {
    if (!selectedRecipe) return;

    try {
      await addRecipeToMealPlan(selectedRecipe, selectedDate, type);
      toast({
        title: "Recipe added",
        description: `${selectedRecipe.title} has been added to ${format(selectedDate, 'EEEE, MMMM d')}`
      });
      onOpenChange(false);
      setSelectedRecipe(null);
    } catch (error) {
      toast({
        title: "Error adding recipe",
        description: "Failed to add recipe to meal plan",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Add Recipe to {format(selectedDate, 'EEEE, MMMM d')}</DialogTitle>
            <DialogDescription>
              Search for a recipe to add to your meal plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {QUICK_FILTERS.map(({ tag, label }) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {label}
                </Badge>
              ))}
            </div>

            <ScrollArea className="h-[400px] pr-4">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="grid gap-8">
                  {recipes.map((recipe) => (
                    <InstagramCard
                      key={recipe.id}
                      recipe={recipe}
                      onAddToMealPlan={() => handleAddRecipe(recipe)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <MealTypeDialog
        open={!!selectedRecipe}
        onOpenChange={(open) => !open && setSelectedRecipe(null)}
        recipe={selectedRecipe}
        date={selectedDate}
        onMealTypeSelect={handleMealTypeSelect}
      />
    </>
  );
}