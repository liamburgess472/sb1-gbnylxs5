import { supabase } from '@/lib/supabase';
import { type Influencer } from '@/types/influencer';
import { mapInfluencerData } from './mapper';

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