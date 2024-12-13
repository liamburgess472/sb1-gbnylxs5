import { type Recipe } from "@/types/recipe";

export const featuredRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2340&q=80",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    calories: 450,
    influencer: {
      id: "sarah-green",
      name: "Sarah Green",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=987&q=80",
    },
    tags: ["Vegetarian", "High Protein", "Mediterranean"],
    description: "A vibrant and nutritious quinoa bowl packed with fresh vegetables, feta cheese, and a zesty lemon dressing.",
    ingredients: [
      { name: "Quinoa", amount: "1", unit: "cup" },
      { name: "Cherry Tomatoes", amount: "2", unit: "cups" },
      { name: "Cucumber", amount: "1", unit: "medium" },
      { name: "Feta Cheese", amount: "200", unit: "g" },
      { name: "Kalamata Olives", amount: "1/2", unit: "cup" },
      { name: "Extra Virgin Olive Oil", amount: "3", unit: "tbsp" },
      { name: "Lemon Juice", amount: "2", unit: "tbsp" },
      { name: "Fresh Mint", amount: "1/4", unit: "cup" }
    ],
    instructions: [
      "Rinse quinoa thoroughly and cook according to package instructions.",
      "While quinoa is cooking, chop all vegetables into bite-sized pieces.",
      "Whisk together olive oil, lemon juice, salt, and pepper to make the dressing.",
      "Once quinoa is cooked and cooled slightly, combine with chopped vegetables.",
      "Add crumbled feta cheese and olives.",
      "Drizzle with dressing and toss gently to combine.",
      "Garnish with fresh mint leaves before serving."
    ],
    nutritionalInfo: {
      protein: 15,
      carbs: 45,
      fat: 22,
      fiber: 6,
      sugar: 4,
      sodium: 580
    }
  }
];

export const allRecipes = [...featuredRecipes];