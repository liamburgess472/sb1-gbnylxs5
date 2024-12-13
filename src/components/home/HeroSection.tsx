import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Discover Healthy Recipes from Your Favorite Food Influencers
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our community of food enthusiasts and learn from expert creators. 
            Plan your meals, create shopping lists, and transform your cooking journey.
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/recipes")}
              className="gap-2"
            >
              Explore Recipes
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/influencers")}
            >
              Meet Our Influencers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}