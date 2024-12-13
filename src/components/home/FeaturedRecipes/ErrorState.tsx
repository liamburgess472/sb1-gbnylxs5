interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Recipes</h2>
          <p className="text-destructive">{message}</p>
        </div>
      </div>
    </div>
  );
}