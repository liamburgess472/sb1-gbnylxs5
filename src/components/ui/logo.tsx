import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img src="/logo.svg" alt="Creator Inspired" className="h-8 w-auto" />
      <span className="ml-2 text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Creator Inspired
      </span>
    </div>
  );
}