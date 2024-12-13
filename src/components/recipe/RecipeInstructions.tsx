import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeInstructionsProps {
  instructions: string[];
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4 list-decimal list-inside">
          {instructions.map((step, index) => (
            <li key={index} className="text-lg">
              <span className="ml-2">{step}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}