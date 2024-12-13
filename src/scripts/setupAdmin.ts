import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupAdminAccount() {
  try {
    console.log('Setting up admin account...');

    // Create admin user if it doesn't exist
    const { data: existingUser, error: checkError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', 'admin@creatorinspired.com')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (!existingUser) {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@creatorinspired.com',
        password: 'admin123!',
        options: {
          data: {
            is_admin: true,
            full_name: 'Admin User'
          }
        }
      });

      if (signUpError) throw signUpError;
      console.log('Admin account created successfully');
    } else {
      console.log('Admin account already exists');
    }

    // Update user metadata to ensure admin privileges
    const { error: updateError } = await supabase.auth.updateUser({
      data: { is_admin: true }
    });

    if (updateError) throw updateError;
    console.log('Admin privileges confirmed');

    console.log('Admin account setup completed successfully!');
  } catch (error) {
    console.error('Error setting up admin account:', error);
    process.exit(1);
  }
}

setupAdminAccount();