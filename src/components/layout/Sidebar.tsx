import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="pb-12 w-16 border-r">
      <div className="flex flex-col h-full">
        <div className="p-2">
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="w-full h-12 p-0">
                <span className="sr-only">Sign In</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">?</span>
                </div>
              </Button>
            </Link>
          )}
        </div>
        <div className="flex-1 py-4">
          <div className="px-2 space-y-2">
            <TooltipProvider>
              {items.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link to={item.path}>
                      <Button
                        variant={location.pathname === item.path ? "secondary" : "ghost"}
                        className={cn(
                          "w-full h-12 p-0 text-foreground hover:text-primary",
                          location.pathname === item.path && "bg-primary/10"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}