import { TodaysMeals } from "./TodaysMeals";
import { SuggestedRecipes } from "./SuggestedRecipes";
import { SuggestedInfluencers } from "./SuggestedInfluencers";

export function HomePage() {
  return (
    <div className="py-8 space-y-12">
      <TodaysMeals />
      <SuggestedRecipes />
      <SuggestedInfluencers />
    </div>
  );
}