import { Card } from "@/components/ui/card";
import { type Recipe } from "@/types/recipe";
import { InstagramHeader } from "./InstagramHeader";
import { InstagramImage } from "./InstagramImage";
import { InstagramActions } from "./InstagramActions";
import { InstagramContent } from "./InstagramContent";
import { useNavigate } from "react-router-dom";

interface InstagramCardProps {
  recipe: Recipe;
  onAddToMealPlan?: () => void;
  className?: string;
}

export function InstagramCard({ recipe, onAddToMealPlan, className = "" }: InstagramCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card 
      className={`max-w-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <InstagramHeader influencer={recipe.influencer} />
      <InstagramImage image={recipe.image} title={recipe.title} />
      <InstagramActions onAddToMealPlan={onAddToMealPlan} />
      <InstagramContent
        title={recipe.title}
        tags={recipe.tags || []}
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        servings={recipe.servings}
      />
    </Card>
  );
}