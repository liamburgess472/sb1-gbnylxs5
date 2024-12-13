import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface InstagramActionsProps {
  onAddToMealPlan: () => void;
}

export function InstagramActions({ onAddToMealPlan }: InstagramActionsProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Heart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onAddToMealPlan}>
          <Send className="h-6 w-6" />
        </Button>
      </div>
      <Button variant="ghost" size="icon">
        <Bookmark className="h-6 w-6" />
      </Button>
    </div>
  );
}