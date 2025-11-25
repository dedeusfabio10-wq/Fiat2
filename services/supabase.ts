import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY; // ← A CHAVE SECRETA DO WEBHOOK

// Verifica se as variáveis do Supabase estão configuradas corretamente
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

// Cliente mock para modo demonstração (quando as variáveis não estão no Vercel)
const createMockClient = (): SupabaseClient => {
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
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({ data: [], error: null }),
          limit: () => ({ data: [], error: null }),
        }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
      }),
      insert: async () => ({ data: null, error: null }),
      update: () => ({ eq: async () => ({ data: null, error: null }) }),
      delete: () => ({ eq: async () => ({ data: null, error: null }) }),
      upsert: async () => ({ data: null, error: null }),
    })
  } as unknown as SupabaseClient;
};

// Cliente normal (frontend) – mantém o modo demo se necessário
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
  console.warn('Erro ao iniciar Supabase → ativando modo demo', error);
  client = createMockClient();
  isMockMode = true;
}

export const supabase = client;

// Cliente ADMIN com service_role key (só pro webhook – ignora 100% do RLS)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

// Log no Vercel pra você ver se está usando a key secreta
if (import.meta.env.PROD) {
  console.log('FIAT PREMIUM WEBHOOK →', supabaseServiceKey ? 'ATIVO COM service_role key' : 'Sem service_role key (fallback)');
}

// Função pra pegar usuário atual
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch (e) {
    return null;
  }
};
