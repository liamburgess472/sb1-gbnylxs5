import { type SocialMedia } from '@/types/influencer';

export function mapSocialMedia(data: Record<string, string> | null): SocialMedia[] {
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

export function extractUsernameFromUrl(url: string, platform: string): string {
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