import { type AuthUser } from './auth';

export interface UserSettings {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  weeklyDigest: boolean;
  mealPlanReminders: boolean;
  measurementUnit: "metric" | "imperial";
  dietaryPreferences: string[];
}

export interface UserProfile {
  id: string;
  user: AuthUser;
  settings: UserSettings;
  savedRecipes: string[];
  mealPlan: string[];
  shoppingList: string[];
}

export interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface UserMenuProps {
  className?: string;
}