import { Card, CardContent } from "@/components/ui/card";
import { type Influencer } from "@/types/influencer";
import { validateInfluencer } from "@/lib/utils/influencer-utils";
import { Avatar } from "./Avatar";
import { Bio } from "./Bio";
import { Title } from "./Title";
import { CoverImage } from "./CoverImage";
import { Specialties } from "./Specialties";
import { InfluencerStats } from "../InfluencerStats";

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: () => void;
}

export function InfluencerCard({ influencer, onClick }: InfluencerCardProps) {
  if (!validateInfluencer(influencer)) {
    return null;
  }

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <CoverImage 
        src={influencer.coverImage}
        alt={`${influencer.name}'s cover`}
      />
      <CardContent className="p-4">
        <Avatar 
          src={influencer.avatar}
          alt={influencer.name}
        />
        <Title name={influencer.name} />
        <Bio text={influencer.bio} />
        <Specialties 
          specialties={influencer.specialties}
          influencerId={influencer.id}
        />
        <InfluencerStats 
          total_subscribers={influencer.total_subscribers}
          recipesCount={influencer.recipesCount}
        />
      </CardContent>
    </Card>
  );
}