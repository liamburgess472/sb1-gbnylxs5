interface TitleProps {
  name: string;
}

export function Title({ name }: TitleProps) {
  return (
    <h3 className="text-xl font-semibold mb-2">
      {name}
    </h3>
  );
}