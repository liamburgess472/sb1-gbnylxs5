import { type Influencer } from '@/types/influencer';
import { type DbInfluencer } from '@/types/database';
import { mapSocialMedia } from './social-media-service';
import { getRecipeCount } from './recipe-count-service';

export async function mapInfluencerData(data: DbInfluencer & { 
  influencer_tags?: Array<{ tags: { tag_name: string } }>;
}): Promise<Influencer> {
  console.log('InfluencerMapper: Mapping influencer data:', data.influencer_id);

  // Extract tags from the joined tags table
  const tags = (data.influencer_tags || [])
    .map(tag => tag.tags?.tag_name)
    .filter((tag): tag is string => !!tag);
  console.log('InfluencerMapper: Extracted tags:', tags);

  // Get recipe count for this influencer
  const recipeCount = await getRecipeCount(data.influencer_id);
  console.log('InfluencerMapper: Recipe count:', recipeCount);

  // Map social media
  const socialMedia = mapSocialMedia(data.social_media_handles);
  console.log('InfluencerMapper: Mapped social media:', socialMedia.length, 'platforms');

  const mappedData = {
    id: data.influencer_id.toString(),
    name: data.name,
    avatar: data.profile_image_url || '',
    coverImage: data.cover_image_url || '',
    bio: data.bio || '',
    socialMedia,
    specialties: tags,
    total_subscribers: data.total_subscribers || 0,
    recipesCount: recipeCount
  };

  console.log('InfluencerMapper: Successfully mapped influencer:', mappedData.id);
  return mappedData;
}