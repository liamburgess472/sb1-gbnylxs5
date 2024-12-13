import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { scrapeRecipe } from "@/lib/recipe-scraper";
import { importRecipe } from "@/lib/cache";
import { Loader2 } from "lucide-react";

interface RecipeImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  influencerId: string;
}

interface FormData {
  url: string;
}

export function RecipeImportDialog({ open, onOpenChange, influencerId }: RecipeImportDialogProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setScrapedData(null);
      
      const scrapedRecipe = await scrapeRecipe(data.url);
      setScrapedData(scrapedRecipe);
      
      toast({
        title: "Recipe data retrieved",
        description: "Please review the recipe details before confirming.",
      });
    } catch (error) {
      toast({
        title: "Error retrieving recipe",
        description: error instanceof Error ? error.message : "Failed to retrieve recipe data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmImport = async () => {
    try {
      setLoading(true);
      
      importRecipe({
        title: scrapedData.title,
        description: scrapedData.description,
        image_url: scrapedData.image,
        prep_time: scrapedData.prepTime || 0,
        cook_time: scrapedData.cookTime || 0,
        servings: scrapedData.servings || 4,
        ingredients: scrapedData.ingredients,
        instructions: scrapedData.instructions,
        influencer_id: influencerId,
      });

      toast({
        title: "Recipe imported successfully",
        description: "The recipe has been added to your collection.",
      });
      
      reset();
      setScrapedData(null);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error importing recipe",
        description: error instanceof Error ? error.message : "Failed to import recipe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setScrapedData(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Recipe from URL</DialogTitle>
          <DialogDescription>
            Enter a recipe URL to import. The recipe data will be retrieved and shown for your review.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Recipe URL</Label>
            <Input
              id="url"
              {...register("url", { 
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL"
                }
              })}
              placeholder="https://example.com/recipe"
              disabled={loading}
            />
            {errors.url && (
              <Alert variant="destructive">
                <AlertDescription>{errors.url.message}</AlertDescription>
              </Alert>
            )}
          </div>

          {!scrapedData && (
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Retrieving Recipe...
                  </>
                ) : (
                  "Retrieve Recipe"
                )}
              </Button>
            </div>
          )}
        </form>

        {scrapedData && (
          <div className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img 
                      src={scrapedData.image} 
                      alt={scrapedData.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{scrapedData.title}</h3>
                    <p className="text-sm text-muted-foreground">{scrapedData.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Prep Time:</span>
                      <br />
                      {scrapedData.prepTime || 0} min
                    </div>
                    <div>
                      <span className="font-medium">Cook Time:</span>
                      <br />
                      {scrapedData.cookTime || 0} min
                    </div>
                    <div>
                      <span className="font-medium">Servings:</span>
                      <br />
                      {scrapedData.servings || 4}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Ingredients:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {scrapedData.ingredients.map((ing: any, i: number) => (
                        <li key={i}>
                          {ing.amount} {ing.unit} {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {scrapedData.instructions.map((inst: string, i: number) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirmImport} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Confirm Import"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}