import { useNavigate, Outlet, Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/auth";

export function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAccess() {
      if (!user) {
        setHasAccess(false);
        return;
      }
      const adminStatus = await isAdmin(user);
      setHasAccess(adminStatus);
    }
    checkAccess();
  }, [user]);

  if (hasAccess === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
        <p className="text-muted-foreground mb-4">You don't have permission to access this area.</p>
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Admin Dashboard
      </h2>
      
      <Card className="p-6">
        <Tabs defaultValue="recipes" className="mb-8">
          <TabsList>
            <TabsTrigger value="recipes" onClick={() => navigate('/admin/recipes')}>
              Recipes
            </TabsTrigger>
            <TabsTrigger value="influencers" onClick={() => navigate('/admin/influencers')}>
              Influencers
            </TabsTrigger>
            <TabsTrigger value="users" onClick={() => navigate('/admin/users')}>
              Users
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Outlet />
      </Card>
    </div>
  );
}