import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { type Recipe } from "@/types/recipe";
import { fetchFeaturedRecipes } from "@/lib/db";

export function FeaturedRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRecipes() {
            const data = await fetchFeaturedRecipes();
            console.log("Fetched recipes:", data); // Debugging log
            setRecipes(data.slice(0, 6) || []); // Default to empty array
            setLoading(false);
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

    if (!recipes.length) {
        return (
            <div className="text-center text-muted-foreground">
                <p>No featured recipes available at the moment.</p>
            </div>
        );
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
                        {(recipes || []).map((recipe) => (
                            <CarouselItem key={recipe.id} className="md:basis-1/3 lg:basis-1/3">
                                <Card className="mx-2 group overflow-hidden">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={recipe.image || "/placeholder-image.png"}
                                            alt={recipe.title || "Recipe"}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <img
                                                src={recipe.influencer?.avatar || "/default-avatar.png"}
                                                alt={recipe.influencer?.name || "Unknown Influencer"}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="text-sm font-medium">
                                                {recipe.influencer?.name || "Unknown"}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{recipe.title || "Untitled Recipe"}</h3>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {recipe.description || "No description available."}
                                        </p>
                                        <div className="flex gap-2 flex-wrap mb-4">
                                            {recipe.tags?.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="rounded-full">
                                                    {tag}
                                                </Badge>
                                            )) || <div>No tags available</div>}
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{recipe.prepTime + recipe.cookTime || "N/A"} min</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                <span>{recipe.servings || "N/A"} servings</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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
