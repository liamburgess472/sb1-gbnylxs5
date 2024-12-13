import { formatFollowerCount, formatRecipeCount } from "@/lib/utils/influencer-utils";

interface InfluencerStatsProps {
  total_subscribers?: number;
  recipesCount?: number;
}

export function InfluencerStats({ total_subscribers = 0, recipesCount = 0 }: InfluencerStatsProps) {
  return (
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>{formatFollowerCount(total_subscribers)} followers</span>
      <span>{formatRecipeCount(recipesCount)} recipes</span>
    </div>
  );
}