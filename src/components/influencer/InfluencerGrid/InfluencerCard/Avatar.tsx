interface AvatarProps {
  src: string;
  alt: string;
}

export function Avatar({ src, alt }: AvatarProps) {
  return (
    <div className="relative -mt-16 mb-4">
      <img
        src={src}
        alt={alt}
        className="w-24 h-24 rounded-full border-4 border-background object-cover shadow-xl"
      />
    </div>
  );
}