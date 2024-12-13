// Update the DbInfluencer interface to remove recipes_count
export interface DbInfluencer {
  influencer_id: number;
  name: string;
  bio: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  social_media_handles: Record<string, string> | null;
  total_subscribers: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbTag {
  tag_id: number;
  tag_name: string;
  created_at?: string;
}

export interface DbInfluencerTag {
  mapping_id: number;
  influencer_id: number;
  tag_id: number;
  tag: DbTag;
  created_at?: string;
}