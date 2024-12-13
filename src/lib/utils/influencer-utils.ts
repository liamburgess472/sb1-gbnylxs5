import { type Influencer } from '@/types/influencer';

export function formatFollowerCount(count: number | undefined): string {
  if (!count) return '0';
  return count.toLocaleString();
}

export function formatRecipeCount(count: number | undefined): string {
  if (!count) return '0';
  return count.toString();
}

export function validateInfluencer(influencer: Partial<Influencer>): influencer is Influencer {
  return !!(
    influencer &&
    influencer.id &&
    influencer.name &&
    influencer.avatar &&
    influencer.coverImage &&
    influencer.bio &&
    Array.isArray(influencer.socialMedia) &&
    Array.isArray(influencer.specialties) &&
    typeof influencer.total_subscribers === 'number' &&
    typeof influencer.recipesCount === 'number'
  );
}