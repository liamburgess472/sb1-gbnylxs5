import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/components/home/HomePage";
import { RecipeGrid } from "@/components/recipes/RecipeGrid";
import { NewMealPlanner } from "@/components/planner/NewMealPlanner";
import { ShoppingList } from "@/components/shopping/ShoppingList";
import { InfluencerGrid } from "@/components/influencer/InfluencerGrid";
import { InfluencerProfile } from "@/components/influencer/InfluencerProfile";
import { RecipePage } from "@/components/recipe/RecipePage";
import { CreateRecipePage } from "@/components/recipe/CreateRecipePage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RecipeManager } from "@/components/admin/RecipeManager";
import { InfluencerManager } from "@/components/admin/InfluencerManager";
import { UserManager } from "@/components/admin/UserManager";
import { Login } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { PublicRecipeGrid } from "@/components/recipes/PublicRecipeGrid";
import { LandingPage } from "@/components/landing/LandingPage";
import { Footer } from "@/components/layout/Footer";
import { Home, BookOpen, Calendar, ShoppingBag, Users, Settings, Plus } from "lucide-react";
import { isAdmin } from "@/lib/auth";

function App() {
  const { user } = useAuth();

  const sidebarItems = user ? [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Recipes", path: "/recipes" },
    { icon: Plus, label: "Create Recipe", path: "/recipes/create" },
    { icon: Calendar, label: "Meal Planner", path: "/planner" },
    { icon: ShoppingBag, label: "Shopping List", path: "/shopping-list" },
    { icon: Users, label: "Influencers", path: "/influencers" }
  ] : [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Influencers", path: "/influencers" }
  ];

  // Add admin routes if user is admin
  if (user && isAdmin(user)) {
    sidebarItems.push({ icon: Settings, label: "Admin", path: "/admin" });
  }

  return (
    <div className="flex min-h-screen bg-background page-background">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 flex flex-col content-wrapper">
        {user && <Header />}
        <main className="flex-1 container mx-auto px-4 lg:px-8 max-w-7xl">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipeGrid />} />
                <Route path="/recipes/create" element={<CreateRecipePage />} />
                <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/planner" element={<NewMealPlanner />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
                <Route path="/influencers" element={<InfluencerGrid />} />
                <Route path="/influencer/:id" element={<InfluencerProfile />} />
                {isAdmin(user) && (
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/recipes" replace />} />
                    <Route path="recipes" element={<RecipeManager />} />
                    <Route path="influencers" element={<InfluencerManager />} />
                    <Route path="users" element={<UserManager />} />
                  </Route>
                )}
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/recipes" element={<PublicRecipeGrid />} />
                <Route path="/influencers" element={<InfluencerGrid />} />
                <Route path="/influencer/:id" element={<InfluencerProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/auth/callback" element={<div>Completing sign in...</div>} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {user && <Footer />}
      </div>
    </div>
  );
}

export default App;