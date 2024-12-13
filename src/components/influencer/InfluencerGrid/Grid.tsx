import { type Influencer } from "@/types/influencer";
import { InfluencerCard } from "./InfluencerCard";

interface GridProps {
  influencers: Influencer[];
  onInfluencerClick: (id: string) => void;
}

export function Grid({ influencers, onInfluencerClick }: GridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {influencers.map((influencer) => (
        <InfluencerCard
          key={influencer.id}
          influencer={influencer}
          onClick={() => onInfluencerClick(influencer.id)}
        />
      ))}
    </div>
  );
}