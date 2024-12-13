import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Influencer } from "@/types/influencer";
import { InfluencerService } from "@/lib/services/influencer";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { InfluencerCard } from "./InfluencerCard";

export function InfluencerGrid() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadInfluencers() {
      try {
        setLoading(true);
        const data = await InfluencerService.getAll();
        setInfluencers(data || []);
        setError(null);
      } catch (err) {
        console.error('Error loading influencers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load influencers');
      } finally {
        setLoading(false);
      }
    }

    loadInfluencers();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!influencers.length) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
          <InfluencerCard
            key={influencer.id}
            influencer={influencer}
            onClick={() => navigate(`/influencer/${influencer.id}`)}
          />
        ))}
      </div>
    </div>
  );
}