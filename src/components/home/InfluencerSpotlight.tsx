import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { TikTok } from "@/components/icons/TikTok";
import { useNavigate } from "react-router-dom";
import { influencers } from "@/data/influencers";

export function InfluencerSpotlight() {
  const navigate = useNavigate();
  const featuredInfluencer = influencers[0];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Influencer of the Week
        </h2>
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <div className="relative h-48">
            <img
              src={featuredInfluencer.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="relative -mt-16 px-6">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={featuredInfluencer.avatar} />
              <AvatarFallback>{featuredInfluencer.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{featuredInfluencer.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {featuredInfluencer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  {featuredInfluencer.bio}
                </p>
              </div>
              <div className="flex gap-2">
                {featuredInfluencer.socialMedia.map((social) => {
                  const Icon = {
                    instagram: Instagram,
                    youtube: Youtube,
                    twitter: Twitter,
                    tiktok: TikTok
                  }[social.platform];
                  return (
                    <Button
                      key={social.platform}
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
            <Button
              className="mt-6"
              onClick={() => navigate(`/influencers`)}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}