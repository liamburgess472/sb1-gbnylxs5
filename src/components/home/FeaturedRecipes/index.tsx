import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";
import { RecipeCard } from "./RecipeCard";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

export function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRecipes() {
      try {
        setLoading(true);
        const data = await RecipeService.getAll();
        
        if (mounted && Array.isArray(data)) {
          // Filter out recipes without required data
          const validRecipes = data.filter(recipe => 
            recipe && recipe.title && recipe.image && recipe.influencer
          );
          
          // Get up to 6 random recipes for featured section
          const shuffled = [...validRecipes].sort(() => 0.5 - Math.random());
          setRecipes(shuffled.slice(0, 6));
          setError(null);
        }
      } catch (err) {
        console.error('Error loading recipes:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load recipes');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Recipes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular recipes curated by expert food influencers
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent>
            {recipes.map((recipe) => (
              <CarouselItem key={recipe.id} className="md:basis-1/3 lg:basis-1/3">
                <RecipeCard recipe={recipe} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}