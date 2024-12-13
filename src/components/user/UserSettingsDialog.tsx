import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getUserSettings, setUserSettings } from "@/lib/cache";

const defaultSettings = {
  theme: "system",
  emailNotifications: true,
  weeklyDigest: true,
  mealPlanReminders: true,
  measurementUnit: "metric",
  dietaryPreferences: [],
};

interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserSettingsDialog({ open, onOpenChange }: UserSettingsDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState(() => 
    user ? getUserSettings(user.id) : defaultSettings
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setUserSettings(user.id, settings);
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value: "light" | "dark" | "system") =>
                  setSettings({ ...settings, theme: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="unit">Measurement Unit</Label>
              <Select
                value={settings.measurementUnit}
                onValueChange={(value: "metric" | "imperial") =>
                  setSettings({ ...settings, measurementUnit: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric</SelectItem>
                  <SelectItem value="imperial">Imperial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Email Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="digest">Weekly Digest</Label>
              <Switch
                id="digest"
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, weeklyDigest: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reminders">Meal Plan Reminders</Label>
              <Switch
                id="reminders"
                checked={settings.mealPlanReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, mealPlanReminders: checked })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}