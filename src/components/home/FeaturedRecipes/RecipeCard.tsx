import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { type Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  if (!recipe) return null;

  return (
    <Card className="mx-2 group overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        {recipe.influencer && (
          <div className="flex items-center gap-2 mb-3">
            <img
              src={recipe.influencer.avatar}
              alt={recipe.influencer.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{recipe.influencer.name}</span>
          </div>
        )}
        <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {recipe.description}
        </p>
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{(recipe.prepTime || 0) + (recipe.cookTime || 0)} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings || 4} servings</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}