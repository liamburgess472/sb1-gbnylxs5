import { supabase } from '@/lib/supabase';

export async function getRecipeCount(influencerId: number): Promise<number> {
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