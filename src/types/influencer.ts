export interface SocialMedia {
  platform: "instagram" | "youtube" | "tiktok" | "twitter";
  url: string;
  username: string;
}

export interface Influencer {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  socialMedia: SocialMedia[];
  total_subscribers: number; // Matches the database schema
  recipesCount: number;
}

export interface InfluencerCardProps {
  influencer: Influencer;
  onClick?: () => void;
}

export interface InfluencerGridProps {
  onInfluencerClick?: (id: string) => void;
}

export interface InfluencerProfileProps {
  id: string;
}

export interface InfluencerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingInfluencer?: Influencer;
}

export interface InfluencerFormData {
  name: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followers: string;
  instagram_username: string;
  instagram_url: string;
  youtube_username: string;
  youtube_url: string;
  tiktok_username: string;
  tiktok_url: string;
}