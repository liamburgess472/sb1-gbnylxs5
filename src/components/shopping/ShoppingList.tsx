import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useShoppingList } from "@/contexts/ShoppingListContext";
import { type IngredientCategory } from "@/types/shopping";

const categories: IngredientCategory[] = [
  "Produce",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Pantry",
  "Grains & Bread",
  "Herbs & Spices",
  "Condiments",
  "Other"
];

export function ShoppingList() {
  const {
    items,
    addItem,
    removeItem,
    toggleItem,
    clearCompleted,
    getItemsByCategory
  } = useShoppingList();

  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("unit");
  const [newItemCategory, setNewItemCategory] = useState<IngredientCategory>("Other");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addItem({
        name: newItemName.trim(),
        amount: newItemAmount || "1",
        unit: newItemUnit,
        category: newItemCategory,
      });
      setNewItemName("");
      setNewItemAmount("");
      setNewItemUnit("unit");
    }
  };

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Shopping List
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Keep track of ingredients needed for your planned meals
        </p>

        <form onSubmit={handleAddItem} className="flex gap-3 max-w-3xl mx-auto mb-8">
          <Input
            placeholder="Add new item..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="w-24"
          />
          <Select
            value={newItemUnit}
            onValueChange={(value) => setNewItemUnit(value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unit">unit</SelectItem>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="ml">ml</SelectItem>
              <SelectItem value="l">l</SelectItem>
              <SelectItem value="tbsp">tbsp</SelectItem>
              <SelectItem value="tsp">tsp</SelectItem>
              <SelectItem value="cup">cup</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newItemCategory}
            onValueChange={(value) => setNewItemCategory(value as IngredientCategory)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        {items.length > 0 && (
          <Button
            variant="outline"
            onClick={clearCompleted}
            className="mb-8"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Completed Items
          </Button>
        )}
      </header>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category);
          if (categoryItems.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {categoryItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50"
                    >
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <span className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {item.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.amount} {item.unit}
                      </span>
                      {item.recipeName && (
                        <span className="text-sm text-muted-foreground">
                          ({item.recipeName})
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}