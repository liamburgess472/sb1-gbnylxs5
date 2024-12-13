import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Users, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DaySelectorDialog } from "./DaySelectorDialog";
import { ClickableTag } from "@/components/ui/ClickableTag";
import { type RecipeCardProps } from "@/types/recipe";
import { useState } from "react";

export function RecipeCard({ recipe, onInfluencerClick }: RecipeCardProps) {
  const navigate = useNavigate();
  const [showDaySelector, setShowDaySelector] = useState(false);

  if (!recipe || !recipe.influencer) return null;

  const handleAddToMealPlan = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDaySelector(true);
  };

  const handleInfluencerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInfluencerClick?.(recipe.influencer.name);
  };

  return (
    <>
      <Card 
        className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <Button
              variant="ghost"
              className="h-auto p-0 hover:bg-transparent"
              onClick={handleInfluencerClick}
            >
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={recipe.influencer.avatar} />
                  <AvatarFallback>{recipe.influencer.name[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium text-foreground hover:text-primary">
                  {recipe.influencer.name}
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddToMealPlan}
              className="h-8 w-8 rounded-full text-foreground hover:text-primary hover:bg-primary/10"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only">Add to meal plan</span>
            </Button>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-foreground">
            {recipe.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {recipe.description}
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            {recipe.tags?.map((tag) => (
              <ClickableTag key={`${recipe.id}-${tag}`} tag={tag} />
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <DaySelectorDialog
        recipe={recipe}
        open={showDaySelector}
        onOpenChange={setShowDaySelector}
      />
    </>
  );
}