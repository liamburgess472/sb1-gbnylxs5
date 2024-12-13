import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Recipe } from "@/types/recipe";
import { type MealType, MEAL_TYPES } from "@/types/meal-planner";
import { format } from "date-fns";

interface MealTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
  date: Date;
  onMealTypeSelect: (type: MealType) => void;
}

export function MealTypeDialog({
  open,
  onOpenChange,
  recipe,
  date,
  onMealTypeSelect,
}: MealTypeDialogProps) {
  if (!recipe || !open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Meal Type</DialogTitle>
          <DialogDescription>
            Choose when you would like to have {recipe.title} on {format(date, 'EEEE, MMMM d')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {MEAL_TYPES.map((type) => (
            <Button
              key={type.value}
              variant="outline"
              className="justify-start h-auto py-4 px-4"
              onClick={() => {
                onMealTypeSelect(type.value);
                onOpenChange(false);
              }}
            >
              <div className="text-left">
                <div className="font-medium">{type.label}</div>
                <div className="text-sm text-muted-foreground">
                  {type.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}