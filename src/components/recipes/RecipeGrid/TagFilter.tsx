import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecipeTagService } from "@/lib/services/recipe-tag-service";
import { type DbTag } from "@/types/database";

interface TagFilterProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TagFilter({ selectedTags, onTagSelect }: TagFilterProps) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<DbTag[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTags() {
      try {
        const data = await RecipeTagService.getAllTags();
        setTags(data);
        setError(null);
      } catch (err) {
        console.error('Error loading tags:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tags');
      } finally {
        setLoading(false);
      }
    }

    loadTags();
  }, []);

  const filteredTags = tags.filter(tag =>
    tag.tag_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTag = async () => {
    try {
      const newTag = await RecipeTagService.createTag(searchQuery);
      setTags(prev => [...prev, newTag]);
      onTagSelect(newTag.tag_name);
      setSearchQuery("");
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error loading tags: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedTags.length === 0
                ? "Select tags..."
                : `${selectedTags.length} selected`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput 
                placeholder="Search tags..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandEmpty>
                {searchQuery && (
                  <div className="p-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleCreateTag}
                    >
                      Create "{searchQuery}"
                    </Button>
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredTags.map((tag) => (
                  <CommandItem
                    key={tag.tag_id}
                    value={tag.tag_name}
                    onSelect={() => {
                      onTagSelect(tag.tag_name);
                      setSearchQuery("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTags.includes(tag.tag_name) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tag.tag_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedTags.forEach(tag => onTagSelect(tag))}
          >
            Clear all
          </Button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onTagSelect(tag)}
            >
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagSelect(tag);
                }}
              >
                ×
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}