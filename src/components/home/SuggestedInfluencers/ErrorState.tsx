interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-destructive">{message}</p>
    </div>
  );
}