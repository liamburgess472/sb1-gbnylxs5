import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { TikTok } from "@/components/icons/TikTok";
import { type SocialMedia } from "@/types/influencer";

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: TikTok
} as const;

interface SocialLinksProps {
  socialMedia: SocialMedia[];
}

export function SocialLinks({ socialMedia }: SocialLinksProps) {
  if (!socialMedia.length) return null;

  return (
    <div className="mt-8 flex justify-center gap-4">
      {socialMedia.map((social) => {
        const Icon = socialIcons[social.platform];
        return (
          <Button
            key={social.platform}
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <Icon className="h-5 w-5" />
              {social.username}
            </a>
          </Button>
        );
      })}
    </div>
  );
}