import { type Influencer } from "@/types/influencer";

export const influencers: Influencer[] = [
  {
    id: "sarah-green",
    name: "Sarah Green",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=987&q=80",
    coverImage: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=2340&q=80",
    bio: "Passionate about creating nutritious, plant-based recipes that don't compromise on flavor. Certified nutritionist and wellness coach helping people live their healthiest lives.",
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com", username: "@sarahgreen.eats" },
      { platform: "youtube", url: "https://youtube.com", username: "SarahGreenCooking" },
      { platform: "tiktok", url: "https://tiktok.com", username: "@sarahgreen" }
    ],
    specialties: ["Plant-based", "Mediterranean", "Meal Prep"],
    followers: 158000,
    recipesCount: 245
  },
  {
    id: "mike-chen",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=2340&q=80",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2340&q=80",
    bio: "Exploring the intersection of Asian and Western cuisines. Specializing in fusion recipes that bring together the best of both worlds.",
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com", username: "@mikechen.cooking" },
      { platform: "youtube", url: "https://youtube.com", username: "MikeChenCooks" }
    ],
    specialties: ["Asian Fusion", "Seafood", "Quick Meals"],
    followers: 89000,
    recipesCount: 178
  },
  {
    id: "emma-lee",
    name: "Emma Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2340&q=80",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2340&q=80",
    bio: "Vegan food enthusiast sharing colorful, wholesome recipes. Making plant-based eating accessible and delicious for everyone.",
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com", username: "@emmaleeeats" },
      { platform: "tiktok", url: "https://tiktok.com", username: "@emmalee" }
    ],
    specialties: ["Vegan", "Gluten-Free", "Buddha Bowls"],
    followers: 112000,
    recipesCount: 156
  },
  {
    id: "tom-wilson",
    name: "Tom Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2340&q=80",
    coverImage: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2340&q=80",
    bio: "Former chef turned content creator. Specializing in high-protein, keto-friendly recipes that don't sacrifice taste.",
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com", username: "@tomwilsonfood" },
      { platform: "youtube", url: "https://youtube.com", username: "ChefTomWilson" }
    ],
    specialties: ["Keto", "High Protein", "Grilling"],
    followers: 67000,
    recipesCount: 134
  },
  {
    id: "lisa-chang",
    name: "Lisa Chang",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2340&q=80",
    coverImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2340&q=80",
    bio: "Bringing authentic Asian flavors to your kitchen. Simplifying traditional recipes while keeping their soul intact.",
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com", username: "@lisachangcooks" },
      { platform: "youtube", url: "https://youtube.com", username: "LisaChangKitchen" }
    ],
    specialties: ["Asian", "Vegetarian", "Spicy"],
    followers: 93000,
    recipesCount: 167
  },
  {
    id: "maya-peters",
    name: "Maya Peters",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2340&q=80",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2340&q=80",
    bio: "Breakfast enthusiast and smoothie bowl artist. Creating beautiful, nutritious starts to your day.",
    socialMedia: [
      { platform: "instagram", url: "https://instagram.com", username: "@mayasbreakfast" },
      { platform: "tiktok", url: "https://tiktok.com", username: "@mayapeters" }
    ],
    specialties: ["Breakfast", "Smoothie Bowls", "Quick"],
    followers: 145000,
    recipesCount: 198
  }
]; 

