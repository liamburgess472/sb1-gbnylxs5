import { type ScrapedRecipe } from '@/types/recipe';

export async function scrapeRecipe(url: string): Promise<ScrapedRecipe> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
    let recipeData = null;

    if (jsonLdScript) {
      try {
        const parsedData = JSON.parse(jsonLdScript.textContent || '');
        if (Array.isArray(parsedData)) {
          recipeData = parsedData.find(item => item['@type'] === 'Recipe');
        } else if (parsedData['@type'] === 'Recipe') {
          recipeData = parsedData;
        }
      } catch (e) {
        console.error('Error parsing JSON-LD:', e);
      }
    }

    if (recipeData) {
      return {
        title: recipeData.name,
        description: recipeData.description,
        image: Array.isArray(recipeData.image) ? recipeData.image[0] : recipeData.image,
        ingredients: parseIngredients(recipeData.recipeIngredient),
        instructions: Array.isArray(recipeData.recipeInstructions) 
          ? recipeData.recipeInstructions.map((instruction: any) => 
              instruction.text || instruction
            )
          : [recipeData.recipeInstructions],
        prepTime: parseDuration(recipeData.prepTime),
        cookTime: parseDuration(recipeData.cookTime),
        servings: recipeData.recipeYield ? parseInt(recipeData.recipeYield.toString()) : undefined
      };
    }

    return {
      title: doc.querySelector('h1')?.textContent?.trim() || '',
      description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      image: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
      ingredients: parseIngredientsFromHtml(doc),
      instructions: parseInstructionsFromHtml(doc),
    };
  } catch (error) {
    console.error('Error scraping recipe:', error);
    throw new Error('Failed to scrape recipe from URL');
  }
}

function parseIngredients(ingredients: string[]): { name: string; amount: string; unit: string; }[] {
  if (!Array.isArray(ingredients)) return [];
  
  return ingredients.map(ingredient => {
    const parts = ingredient.trim().split(/\s+/);
    const amount = parts[0];
    const unit = parts[1];
    const name = parts.slice(2).join(' ');

    return {
      name: name || ingredient,
      amount: amount || '1',
      unit: unit || 'unit'
    };
  });
}

function parseIngredientsFromHtml(doc: Document): { name: string; amount: string; unit: string; }[] {
  const ingredients: { name: string; amount: string; unit: string; }[] = [];
  
  doc.querySelectorAll('ul li').forEach(element => {
    const text = element.textContent?.trim() || '';
    if (text && !text.toLowerCase().includes('instruction')) {
      ingredients.push({
        name: text,
        amount: '1',
        unit: 'unit'
      });
    }
  });

  return ingredients;
}

function parseInstructionsFromHtml(doc: Document): string[] {
  const instructions: string[] = [];

  doc.querySelectorAll('ol li').forEach(element => {
    const text = element.textContent?.trim() || '';
    if (text) {
      instructions.push(text);
    }
  });

  return instructions;
}

function parseDuration(duration: string): number | undefined {
  if (!duration) return undefined;

  const match = duration.match(/PT(\d+)([HM])/);
  if (!match) return undefined;

  const [_, time, unit] = match;
  return unit === 'H' ? parseInt(time) * 60 : parseInt(time);
}