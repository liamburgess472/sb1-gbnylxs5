import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ClickableTagProps {
  tag: string;
}

export function ClickableTag({ tag }: ClickableTagProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/recipes?tags=${encodeURIComponent(tag)}`);
  };

  return (
    <Badge
      variant="secondary"
      className="cursor-pointer hover:bg-secondary/80 transition-colors"
      onClick={handleClick}
    >
      {tag}
    </Badge>
  );
}