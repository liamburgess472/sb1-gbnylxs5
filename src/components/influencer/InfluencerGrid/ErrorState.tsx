import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-destructive mb-4">{message}</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}