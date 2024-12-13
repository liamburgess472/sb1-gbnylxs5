import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables:');
  if (!supabaseUrl) console.error('- VITE_SUPABASE_URL');
  if (!supabaseKey) console.error('- VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testUsers = [
  {
    email: 'admin@createrinspired.com',
    password: 'admin123!',
    userData: {
      username: 'admin',
      full_name: 'Admin User',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
      settings: {
        theme: 'system',
        emailNotifications: true,
        weeklyDigest: true,
        mealPlanReminders: true,
        measurementUnit: 'metric',
        dietaryPreferences: ['vegetarian']
      }
    }
  },
  {
    email: 'test@createrinspired.com',
    password: 'test123!',
    userData: {
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      settings: {
        theme: 'light',
        emailNotifications: true,
        weeklyDigest: false,
        mealPlanReminders: true,
        measurementUnit: 'imperial',
        dietaryPreferences: ['gluten-free', 'dairy-free']
      }
    }
  }
];

async function uploadUsers() {
  try {
    console.log('Starting user upload...');

    for (const user of testUsers) {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', user.email)
        .single();

      if (existingUser) {
        console.log(`User ${user.email} already exists, skipping...`);
        continue;
      }

      // Create user
      const { data: authUser, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            username: user.userData.username,
            avatar_url: user.userData.avatar_url
          }
        }
      });

      if (signUpError) {
        console.error(`Error creating user ${user.email}:`, signUpError);
        continue;
      }

      console.log(`Created user: ${user.email}`);

      // Wait for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update profile with additional data
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: user.userData.full_name,
          settings: user.userData.settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', authUser.user?.id);

      if (updateError) {
        console.error(`Error updating profile for ${user.email}:`, updateError);
      } else {
        console.log(`Updated profile for: ${user.email}`);
      }
    }

    console.log('User upload completed successfully!');
  } catch (error) {
    console.error('Error during user upload:', error);
    process.exit(1);
  }
}

uploadUsers();