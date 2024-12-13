import { supabase } from '@/lib/supabase';

export async function getInfluencerTags(influencerId: number): Promise<string[]> {
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