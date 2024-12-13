import { supabase } from '@/lib/supabase';
import { type Influencer } from '@/types/influencer';
import { mapInfluencerData } from './mapper';

export const InfluencerService = {
  getAll: async (): Promise<Influencer[]> => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          *,
          influencer_tags!left(
            tags(tag_name)
          )
        `);

      if (error) throw error;

      // Map each influencer data with recipe counts
      const influencers = await Promise.all(
        (data || []).map(mapInfluencerData)
      );

      return influencers;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Influencer | null> => {
    if (!id) return null;

    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          *,
          influencer_tags!left(
            tags(tag_name)
          )
        `)
        .eq('influencer_id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return await mapInfluencerData(data);
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }
};