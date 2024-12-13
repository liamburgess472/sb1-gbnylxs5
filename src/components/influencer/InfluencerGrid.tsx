import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Influencer } from "@/types/influencer";
import { supabase } from "@/lib/supabase";

export function InfluencerGrid() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadInfluencers() {
      try {
        const { data, error } = await supabase
          .from('influencers')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          const formattedInfluencers: Influencer[] = data.map(influencer => ({
            id: influencer.influencer_id,
            name: influencer.name,
            avatar: influencer.avatar_url,
            coverImage: influencer.cover_image_url,
            bio: influencer.bio,
            socialMedia: influencer.social_media,
            total_subscribers: influencer.total_subscribers,
            recipesCount: influencer.recipes_count
          }));
          setInfluencers(formattedInfluencers);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load influencers');
      } finally {
        setLoading(false);
      }
    }

    loadInfluencers();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="mt-2 text-muted-foreground">Loading influencers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="text-center">
          <p className="text-destructive">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Our Food Influencers
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet the talented creators behind our curated collection of healthy recipes
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {influencers.map((influencer) => (
          <Card
            key={influencer.id}
            className="group overflow-hidden cursor-pointer transition-all hover:shadow-lg"
            onClick={() => navigate(`/influencer/${influencer.id}`)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={influencer.coverImage}
                alt={`${influencer.name}'s cover`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="relative -mt-16 px-4">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-24 h-24 rounded-full border-4 border-background object-cover shadow-xl"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{influencer.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {influencer.bio}
              </p>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{influencer.total_subscribers.toLocaleString()} followers</span>
                <span>{influencer.recipesCount} recipes</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}