import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { TikTok } from "@/components/icons/TikTok";

interface InfluencerSidebarProps {
  influencer: {
    name: string;
    avatar: string;
  };
}

export function InfluencerSidebar({ influencer }: InfluencerSidebarProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage src={influencer.avatar} alt={influencer.name} />
          <AvatarFallback>{influencer.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mt-4">{influencer.name}</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <TikTok className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}