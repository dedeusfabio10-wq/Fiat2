import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

// Check if configuration is valid and NOT a placeholder
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== '' && 
    supabaseAnonKey !== '' && 
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-url')
  );
};

const createMockClient = () => {
  console.log('Initializing Fiat Mock Client (Demo Mode) - Vercel Environment Vars missing');
  const mockUser = {
    id: 'mock-user-id',
    email: 'demo@fiat.app',
    role: 'authenticated',
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  };

  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async ({ email }: { email: string }) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        // Return successful mock login
        return { 
          data: { 
            user: { ...mockUser, email }, 
            session: { user: { ...mockUser, email }, access_token: 'mock-token' } 
          }, 
          error: null 
        };
      },
      signUp: async ({ email }: { email: string }) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { 
          data: { user: { ...mockUser, email }, session: null }, 
          error: null 
        };
      },
      signInWithOAuth: async () => {
        return { error: { message: 'Login social indisponível no modo demonstração (Configure o Supabase na Vercel).' } };
      },
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({ data: [], error: null }),
          limit: () => ({ data: [], error: null }),
        }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        data: [],
        error: null
      }),
      insert: async () => ({ data: null, error: null }),
      update: () => ({ eq: async () => ({ data: null, error: null }) }),
      delete: () => ({ eq: async () => ({ data: null, error: null }) }),
      upsert: async () => ({ data: null, error: null }),
    })
  } as unknown as SupabaseClient;
};

// Safely create client or fallback to mock to prevent "Failed to fetch" crashes
let client: SupabaseClient;
export let isMockMode = false;

try {
  if (isSupabaseConfigured()) {
    client = createClient(supabaseUrl, supabaseAnonKey);
    isMockMode = false;
  } else {
    client = createMockClient();
    isMockMode = true;
  }
} catch (error) {
  console.warn('Failed to initialize Supabase client, falling back to mock.', error);
  client = createMockClient();
  isMockMode = true;
}

export const supabase = client;

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch (e) {
    return null;
  }
};