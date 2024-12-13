import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface InstagramContentProps {
  title: string;
  tags: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

export function InstagramContent({ 
  title, 
  tags,
  prepTime,
  cookTime,
  servings 
}: InstagramContentProps) {
  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{prepTime + cookTime} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{servings} servings</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full">
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}