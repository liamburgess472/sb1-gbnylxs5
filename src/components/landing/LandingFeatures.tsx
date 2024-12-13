import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ShoppingCart, Users, Utensils } from "lucide-react";

const features = [
  {
    icon: Utensils,
    title: "Curated Recipes",
    description: "Access a diverse collection of healthy recipes from top food influencers."
  },
  {
    icon: Calendar,
    title: "Meal Planning",
    description: "Plan your weekly meals with our intuitive drag-and-drop calendar."
  },
  {
    icon: ShoppingCart,
    title: "Shopping Lists",
    description: "Automatically generate shopping lists from your planned meals."
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with food enthusiasts and share your culinary journey."
  }
];

export function LandingFeatures() {
  return (
    <div className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Everything You Need to Cook Like a Pro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}