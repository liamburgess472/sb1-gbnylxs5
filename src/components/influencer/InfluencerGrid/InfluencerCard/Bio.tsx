interface BioProps {
  text: string;
}

export function Bio({ text }: BioProps) {
  return (
    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
      {text}
    </p>
  );
}