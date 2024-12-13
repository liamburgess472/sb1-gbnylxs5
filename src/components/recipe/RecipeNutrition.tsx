import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionalInfo {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface RecipeNutritionProps {
  nutritionalInfo?: NutritionalInfo;
  calories: number;
}

export function RecipeNutrition({ nutritionalInfo, calories }: RecipeNutritionProps) {
  if (!nutritionalInfo) return null;

  const totalMacros = nutritionalInfo.protein + nutritionalInfo.carbs + nutritionalInfo.fat;
  
  const calculatePercentage = (value: number) => (value / totalMacros) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Facts</CardTitle>
        <p className="text-2xl font-bold">{calories} kcal</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Protein</span>
            <span>{nutritionalInfo.protein}g</span>
          </div>
          <Progress value={calculatePercentage(nutritionalInfo.protein)} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Carbs</span>
            <span>{nutritionalInfo.carbs}g</span>
          </div>
          <Progress value={calculatePercentage(nutritionalInfo.carbs)} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Fat</span>
            <span>{nutritionalInfo.fat}g</span>
          </div>
          <Progress value={calculatePercentage(nutritionalInfo.fat)} className="h-2" />
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Fiber</span>
              <span>{nutritionalInfo.fiber}g</span>
            </div>
            <div className="flex justify-between">
              <span>Sugar</span>
              <span>{nutritionalInfo.sugar}g</span>
            </div>
            <div className="flex justify-between">
              <span>Sodium</span>
              <span>{nutritionalInfo.sodium}mg</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}