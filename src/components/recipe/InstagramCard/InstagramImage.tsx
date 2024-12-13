import { AspectRatio } from "@/components/ui/aspect-ratio";

interface InstagramImageProps {
  image: string;
  title: string;
}

export function InstagramImage({ image, title }: InstagramImageProps) {
  return (
    <AspectRatio ratio={1}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </AspectRatio>
  );
}