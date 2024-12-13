import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterTagsProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function FilterTags({ selectedTags, onTagSelect }: FilterTagsProps) {
  if (selectedTags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedTags.map(tag => (
        <Badge
          key={tag}
          variant="secondary"
          className="rounded-full px-3 py-1 hover:bg-secondary/80 cursor-pointer"
          onClick={() => onTagSelect(tag)}
        >
          {tag}
          <X className="ml-1 h-3 w-3" />
        </Badge>
      ))}
    </div>
  );
}