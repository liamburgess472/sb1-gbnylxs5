import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Influencer } from "@/types/influencer";
import { InfluencerService } from "@/lib/services/influencer-service";
import { InfluencerCard } from "./InfluencerCard";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";

export function SuggestedInfluencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function loadInfluencers() {
      try {
        const data = await InfluencerService.getAll();
        if (mounted) {
          setInfluencers(data.slice(0, 3));
          setError(null);
        }
      } catch (err) {
        console.error('Error loading influencers:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load influencers');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadInfluencers();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section>
        <LoadingState />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <ErrorState message={error} />
      </section>
    );
  }

  if (influencers.length === 0) {
    return (
      <section>
        <EmptyState />
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Suggested Influencers</h2>
        <Button variant="ghost" onClick={() => navigate("/influencers")}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {influencers.map((influencer) => (
          <InfluencerCard
            key={influencer.id}
            influencer={influencer}
            onClick={() => navigate(`/influencer/${influencer.id}`)}
          />
        ))}
      </div>
    </section>
  );
}