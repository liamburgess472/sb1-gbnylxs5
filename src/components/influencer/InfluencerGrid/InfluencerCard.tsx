import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Influencer } from "@/types/influencer";
import { InfluencerStats } from "./InfluencerStats";
import { validateInfluencer } from "@/lib/utils/influencer-utils";

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: () => void;
}

export function InfluencerCard({ influencer, onClick }: InfluencerCardProps) {
  // Validate influencer data before rendering
  if (!validateInfluencer(influencer)) {
    return null;
  }

  return (
    <Card
      key={influencer.id}
      className="group overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={influencer.coverImage}
          alt={`${influencer.name}'s cover`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="p-4">
        <div className="relative -mt-16 mb-4">
          <img
            src={influencer.avatar}
            alt={influencer.name}
            className="w-24 h-24 rounded-full border-4 border-background object-cover shadow-xl"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{influencer.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {influencer.bio}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(influencer.specialties || []).map((specialty) => (
            <Badge key={`${influencer.id}-${specialty}`} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
        <InfluencerStats 
          total_subscribers={influencer.total_subscribers}
          recipesCount={influencer.recipesCount}
        />
      </CardContent>
    </Card>
  );
}