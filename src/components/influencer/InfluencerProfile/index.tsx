import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { type Influencer } from "@/types/influencer";
import { type Recipe } from "@/types/recipe";
import { InfluencerService } from "@/lib/services/influencer";
import { RecipeService } from "@/lib/services/recipe-service";
import { ProfileHeader } from "./ProfileHeader";
import { SocialLinks } from "./SocialLinks";
import { RecipeGrid } from "./RecipeGrid";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

export function InfluencerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!id) {
      setError("Invalid influencer ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Load influencer and their recipes in parallel
      const [influencerData, recipesData] = await Promise.all([
        InfluencerService.getById(id),
        RecipeService.getByInfluencerId(id)
      ]);

      if (!influencerData) {
        throw new Error("Influencer not found");
      }

      setInfluencer(influencerData);
      setRecipes(recipesData);
    } catch (err) {
      console.error('Error loading influencer data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load influencer data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !influencer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate("/influencers")} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to influencers
        </Button>
        <ErrorState message={error || "Influencer not found"} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Button 
          onClick={() => navigate("/influencers")} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to influencers
        </Button>

        <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
          <img
            src={influencer.coverImage}
            alt={`${influencer.name}'s cover`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <ProfileHeader 
            influencer={influencer} 
            recipesCount={recipes.length} 
          />
          <SocialLinks socialMedia={influencer.socialMedia} />
        </div>

        <RecipeGrid 
          recipes={recipes} 
          influencerName={influencer.name}
        />
      </div>
    </div>
  );
}