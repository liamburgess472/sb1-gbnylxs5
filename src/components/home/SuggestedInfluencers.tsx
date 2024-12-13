import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Influencer } from "@/types/influencer";
import { InfluencerService } from "@/lib/services/influencer-service";

export function SuggestedInfluencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadInfluencers() {
      try {
        const data = await InfluencerService.getAll();
        setInfluencers(data.slice(0, 3)); // Only show first 3 influencers
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
    return (
      <section>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="text-center py-8">
          <p className="text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  if (influencers.length === 0) {
    return (
      <section>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No influencers available.</p>
        </div>
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
          <Card 
            key={influencer.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/influencer/${influencer.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={influencer.avatar} />
                  <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{influencer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(influencer.followers || 0).toLocaleString()} followers
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(influencer.specialties || []).slice(0, 3).map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}