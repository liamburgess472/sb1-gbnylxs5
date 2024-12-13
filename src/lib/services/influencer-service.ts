import { supabase } from '@/lib/supabase';
import { type Influencer, type SocialMedia } from '@/types/influencer';

function mapSocialMedia(data: Record<string, string> | null): SocialMedia[] {
  if (!data) return [];
  
  return Object.entries(data)
    .filter(([platform, url]) => 
      ['instagram', 'youtube', 'tiktok', 'twitter'].includes(platform) && 
      url && 
      typeof url === 'string'
    )
    .map(([platform, url]) => ({
      platform: platform as SocialMedia['platform'],
      url,
      username: extractUsernameFromUrl(url, platform)
    }));
}

function extractUsernameFromUrl(url: string, platform: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    switch (platform) {
      case 'instagram': return pathParts[0] || '';
      case 'youtube': return pathParts[pathParts.length - 1] || '';
      case 'tiktok': return pathParts[0] || '';
      case 'twitter': return pathParts[0] || '';
      default: return '';
    }
  } catch {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  }
}

async function getInfluencerTags(influencerId: number): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('influencer_tags')
      .select(`
        tags (
          tag_name
        )
      `)
      .eq('influencer_id', influencerId);

    if (error) throw error;
    return data?.map(item => item.tags.tag_name) || [];
  } catch (error) {
    console.error('Error fetching influencer tags:', error);
    return [];
  }
}

async function getRecipeCount(influencerId: number): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('influencer_id', influencerId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting recipe count:', error);
    return 0;
  }
}

async function mapInfluencerData(data: any): Promise<Influencer> {
  const [tags, recipeCount] = await Promise.all([
    getInfluencerTags(data.influencer_id),
    getRecipeCount(data.influencer_id)
  ]);
  
  return {
    id: data.influencer_id.toString(),
    name: data.name,
    avatar: data.profile_image_url || '',
    coverImage: data.cover_image_url || '',
    bio: data.bio || '',
    socialMedia: mapSocialMedia(data.social_media_handles),
    specialties: tags,
    total_subscribers: data.total_subscribers || 0,
    recipesCount: recipeCount
  };
}

export const InfluencerService = {
  getAll: async (): Promise<Influencer[]> => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .order('name');

      if (error) throw error;

      const influencers = await Promise.all(
        (data || []).map(mapInfluencerData)
      );

      return influencers;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Influencer> => {
    if (!id) {
      throw new Error('Influencer ID is required');
    }

    try {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .eq('influencer_id', parseInt(id))
        .single();

      if (error) throw error;
      if (!data) throw new Error('Influencer not found');

      return await mapInfluencerData(data);
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }
};