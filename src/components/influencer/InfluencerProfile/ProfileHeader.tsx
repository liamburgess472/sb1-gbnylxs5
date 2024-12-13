import { type Influencer } from "@/types/influencer";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  influencer: Influencer;
  recipesCount: number;
}

export function ProfileHeader({ influencer, recipesCount }: ProfileHeaderProps) {
  return (
    <div className="relative -mt-[100px]">
      <div className="flex flex-col items-center">
        <img
          src={influencer.avatar}
          alt={influencer.name}
          className="h-[200px] w-[200px] rounded-full border-8 border-background object-cover shadow-xl"
        />
        <h1 className="mt-4 text-3xl font-bold">{influencer.name}</h1>
        
        {influencer.specialties?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {influencer.specialties.map((specialty) => (
              <Badge 
                key={`${influencer.id}-${specialty}`} 
                variant="secondary"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        )}

        <p className="mt-4 max-w-2xl text-center text-muted-foreground">
          {influencer.bio}
        </p>

        <div className="mt-8 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {influencer.total_subscribers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{recipesCount}</div>
            <div className="text-sm text-muted-foreground">Recipes</div>
          </div>
        </div>
      </div>
    </div>
  );
}