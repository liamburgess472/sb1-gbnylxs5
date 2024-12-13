import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookmarkPlus } from "lucide-react";
import { type Recipe } from "@/types/recipe";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface RecipeDetailsProps {
  recipe: Recipe;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Link 
            to={`/influencer/${recipe.influencer.id}`}
            className="flex items-center gap-3 hover:opacity-80"
          >
            <Avatar>
              <AvatarImage src={recipe.influencer.avatar} alt={recipe.influencer.name} />
              <AvatarFallback>{recipe.influencer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{recipe.influencer.name}</p>
              <p className="text-sm text-muted-foreground">Recipe Creator</p>
            </div>
          </Link>
          <Button variant="outline" size="icon">
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-secondary rounded-lg">
            <Clock className="h-5 w-5 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Prep Time</p>
            <p className="font-medium">{recipe.prepTime} min</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <Clock className="h-5 w-5 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Cook Time</p>
            <p className="font-medium">{recipe.cookTime} min</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <Users className="h-5 w-5 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Servings</p>
            <p className="font-medium">{recipe.servings}</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-lg">
            <span className="inline-block h-5 w-5 mx-auto mb-2 font-bold">🔥</span>
            <p className="text-sm text-muted-foreground">Calories</p>
            <p className="font-medium">{recipe.calories}</p>
          </div>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}