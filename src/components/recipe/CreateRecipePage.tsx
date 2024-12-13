import { CreateRecipeForm } from "./CreateRecipeForm";

export function CreateRecipePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Create New Recipe
      </h1>
      <CreateRecipeForm />
    </div>
  );
}