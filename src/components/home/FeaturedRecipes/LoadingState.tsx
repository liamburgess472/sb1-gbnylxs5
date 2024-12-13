export function LoadingState() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
}