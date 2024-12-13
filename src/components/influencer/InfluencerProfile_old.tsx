import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { type Influencer } from "@/types/influencer";
import { type Recipe } from "@/types/recipe";
import { Instagram, Youtube, Twitter, ArrowLeft } from "lucide-react";
import { TikTok } from "@/components/icons/TikTok";
import { supabase } from "@/lib/supabase";
import { RecipeService } from "@/lib/services/recipe-service";

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: TikTok
} as const;

export function InfluencerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInfluencer() {
  if (!id) {
    setError('Influencer ID is missing');
    setLoading(false);
    return;
  }

  try {
    const { data, error: influencerError } = await supabase
      .from('influencers')
      .select('*')
      .eq('influencer_id', id)
      .single();

    if (influencerError) throw influencerError;
    if (!data) throw new Error('Influencer not found');

    const formattedInfluencer: Influencer = {
      id: data.influencer_id,
      name: data.name,
      avatar: data.avatar_url,
      coverImage: data.cover_image_url,
      bio: data.bio,
      socialMedia: data.social_media || [],
      total_subscribers: data.total_subscribers,
      recipesCount: data.recipes_count,
    };

    setInfluencer(formattedInfluencer);

       // Fetch recipes directly for the influencer
    const { data: recipes, error: recipesError } = await supabase
      .from('recipes')
      .select('*')
      .eq('influencer_id', id);

    if (recipesError) throw recipesError;

    setRecipes(recipes || []);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load influencer');
  } finally {
    setLoading(false);
  }
}

    loadInfluencer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !influencer) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Influencer not found</h2>
        <p className="text-muted-foreground mb-6">{error || "The requested influencer could not be found."}</p>
        <Button onClick={() => navigate("/influencers")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to influencers
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
        <div className="relative -mt-[100px]">
          <div className="flex flex-col items-center">
            <img
              src={influencer.avatar}
              alt={influencer.name}
              className="h-[200px] w-[200px] rounded-full border-8 border-background object-cover shadow-xl"
            />
            <h1 className="mt-4 text-3xl font-bold">{influencer.name}</h1>
                        <p className="mt-4 max-w-2xl text-center text-muted-foreground">
              {influencer.bio}
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {influencer.total_subscribers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{influencer.recipesCount}</div>
              <div className="text-sm text-muted-foreground">Recipes</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {influencer.socialMedia.map((social) => {
              const Icon = socialIcons[social.platform];
              return (
                <Button
                  key={social.platform}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  asChild
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                    {social.username}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Latest Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recipes available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}