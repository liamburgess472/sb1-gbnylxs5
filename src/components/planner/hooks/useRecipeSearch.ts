import { useState, useEffect } from 'react';
import { type Recipe } from '@/types/recipe';
import { RecipeService } from '@/lib/services/recipe-service';
import { useToast } from '@/hooks/use-toast';

export function useRecipeSearch(query: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function searchRecipes() {
      if (!query.trim()) {
        try {
          const allRecipes = await RecipeService.getAll();
          if (mounted) setRecipes(allRecipes);
        } catch (error) {
          console.error('Error loading recipes:', error);
          if (mounted) {
            setRecipes([]);
            toast({
              title: "Error loading recipes",
              description: "Failed to load recipes. Please try again.",
              variant: "destructive"
            });
          }
        }
        return;
      }

      setLoading(true);
      try {
        const results = await RecipeService.search(query);
        if (mounted) setRecipes(results);
      } catch (error) {
        console.error('Error searching recipes:', error);
        if (mounted) {
          setRecipes([]);
          toast({
            title: "Error searching recipes",
            description: "Failed to search recipes. Please try again.",
            variant: "destructive"
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    const debounce = setTimeout(searchRecipes, 300);
    return () => {
      mounted = false;
      clearTimeout(debounce);
    };
  }, [query, toast]);

  return { recipes, loading };
}