import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RecipeFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function RecipeFilter({ tags, selectedTags, onTagSelect }: RecipeFilterProps) {
  // Get the most popular tags (first 8)
  const popularTags = tags.slice(0, 8);

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Popular tags:</span>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="rounded-full px-3 py-1 cursor-pointer hover:bg-primary/90"
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full px-3 py-1 cursor-pointer"
                onClick={() => onTagSelect(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                selectedTags.forEach(tag => onTagSelect(tag));
              }}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}