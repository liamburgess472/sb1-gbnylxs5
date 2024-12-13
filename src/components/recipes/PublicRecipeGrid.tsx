import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";

export function PublicRecipeGrid() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await RecipeService.getAll();
        setRecipes(data.slice(0, 16)); // Only show first 16 recipes
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Discover Our Recipes
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Browse through our collection of healthy and delicious recipes
        </p>
        <Button onClick={() => navigate("/login")} size="lg">
          Sign in to see all recipes and details
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="group overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center text-white p-4">
                  <Lock className="h-8 w-8 mx-auto mb-2" />
                  <p>Sign in to view recipe details</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={recipe.influencer.avatar}
                  alt={recipe.influencer.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{recipe.influencer.name}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {recipe.description}
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
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
        ))}
      </div>
    </div>
  );
}