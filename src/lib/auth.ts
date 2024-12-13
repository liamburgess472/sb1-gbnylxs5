import { supabase } from '@/lib/supabase';
import { type AuthUser } from '@/types/auth';

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) throw error;
    if (!data.user) throw new Error('No user returned from sign-in');

    return {
      user: data.user as AuthUser
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          is_admin: email === 'admin@creatorinspired.com'
        }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('No user returned from sign-up');

    return {
      user: data.user as AuthUser
    };
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function isAdmin(user: AuthUser | null): Promise<boolean> {
  if (!user) return false;
  return user.user_metadata?.is_admin === true || user.email === 'admin@creatorinspired.com';
}