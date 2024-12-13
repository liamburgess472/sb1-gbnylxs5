import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type Recipe } from '@/types/recipe';

interface DayCardProps {
  date: Date;
  meals: Recipe[];
  onAddClick: () => void;
  onRemoveRecipe: (recipeId: string) => void;
}

export function DayCard({ date, meals, onAddClick, onRemoveRecipe }: DayCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{format(date, 'EEEE')}</h4>
          <span className="text-sm text-muted-foreground">
            {format(date, 'MMM d')}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddClick}
          className="h-8 w-8 rounded-full hover:bg-primary/10 text-foreground hover:text-primary"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {meals.length > 0 ? (
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li 
              key={meal.id}
              className="flex items-center justify-between bg-secondary/50 rounded-lg p-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{meal.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {meal.prepTime + meal.cookTime} min
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveRecipe(meal.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-24 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
          No meals planned
        </div>
      )}
    </Card>
  );
}