interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-destructive mb-4">{message}</p>
      <button 
        onClick={onRetry}
        className="text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  );
}