import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface InstagramHeaderProps {
  influencer: {
    id: string;
    name: string;
    avatar: string;
  };
}

export function InstagramHeader({ influencer }: InstagramHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <Link 
        to={`/influencer/${influencer.id}`}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={influencer.avatar} alt={influencer.name} />
          <AvatarFallback>{influencer.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{influencer.name}</span>
          <span className="text-xs text-muted-foreground">Recipe Creator</span>
        </div>
      </Link>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}