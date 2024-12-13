import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Influencer } from "@/types/influencer";

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: () => void;
}

export function InfluencerCard({ influencer, onClick }: InfluencerCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={influencer.avatar} alt={influencer.name} />
            <AvatarFallback>{influencer.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{influencer.name}</h3>
            <p className="text-sm text-muted-foreground">
              {influencer.total_subscribers?.toLocaleString() || '0'} followers
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}