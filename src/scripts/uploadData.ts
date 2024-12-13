import { createClient } from '@supabase/supabase-js';
import { allRecipes } from '../data/recipes';
import { influencers } from '../data/influencers';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadData() {
  try {
    console.log('Starting data upload...');

    // Clear existing data
    console.log('Clearing existing data...');
    await supabase.from('recipes').delete().neq('recipe_id', 0);
    await supabase.from('influencers').delete().neq('influencer_id', 0);

    // Upload influencers
    console.log('Uploading influencers...');
    for (const influencer of influencers) {
      const { data, error: influencerError } = await supabase
        .from('influencers')
        .insert({
          name: influencer.name,
          bio: influencer.bio,
          profile_image_url: influencer.avatar,
          cover_image_url: influencer.coverImage,
          social_media_handles: influencer.socialMedia.reduce((acc, social) => ({
            ...acc,
            [social.platform]: social.url
          }), {}),
          total_subscribers: influencer.followers
        })
        .select()
        .single();

      if (influencerError) {
        console.error(`Error uploading influencer ${influencer.name}:`, influencerError);
        continue;
      }

      console.log(`Successfully uploaded influencer: ${influencer.name}`);
      
      // Upload recipes for this influencer
      const influencerRecipes = allRecipes.filter(r => r.influencer.name === influencer.name);
      
      for (const recipe of influencerRecipes) {
        const { error: recipeError } = await supabase
          .from('recipes')
          .insert({
            title: recipe.title,
            description: recipe.description,
            image_url: recipe.image,
            prep_time: recipe.prepTime,
            cook_time: recipe.cookTime,
            servings: recipe.servings,
            calories: recipe.calories,
            influencer_id: data.influencer_id
          });

        if (recipeError) {
          console.error(`Error uploading recipe ${recipe.title}:`, recipeError);
        } else {
          console.log(`Successfully uploaded recipe: ${recipe.title}`);
        }

        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('Data upload completed successfully!');
  } catch (error) {
    console.error('Error during data upload:', error);
    process.exit(1);
  }
}

uploadData();