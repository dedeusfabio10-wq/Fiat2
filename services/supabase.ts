// services/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// === CONFIGURAÇÃO DAS VARIÁVEIS DE AMBIENTE (funciona no Vite e no Next.js) ===
const env = (import.meta as any).env || process.env || {};

const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// === VERIFICA SE O SUPABASE ESTÁ REALMENTE CONFIGURADO ===
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-url') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// === MOCK CLIENT (modo demo/offline – continua funcionando lindo) ===
const createMockClient = (): SupabaseClient => {
  console.log('FIAT APP → Modo Demo Ativado (Supabase não configurado)');

  const mockUser = {
    id: 'mock-user-123',
    email: 'demo@fiat.app',
    aud: 'authenticated',
    role: 'authenticated',
    created_at: new Date().toISOString(),
  };

  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async ({ email }: { email: string }) => {
        await new Promise((r) => setTimeout(r, 600));
        return {
          data: {
            user: { ...mockUser, email },
            session: { user: { ...mockUser, email }, access_token: 'mock-jwt-token' },
          },
          error: null,
        };
      },
      signUp: async () => ({ data: { user: mockUser }, error: null }),
      signOut: async () => ({ data: {}, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({ data: [], error: null }),
        }),
        in: () => ({
          order: () => ({ data: [], error: null }),
        }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        data: [] as any[],
        error: null,
      }),
      insert: async () => ({ data: null, error: null }),
      update: () => ({ eq: async () => ({ data: null, error: null }) }),
      delete: () => ({ eq: async () => ({ data: null, error: null }) }),
    }),
  } as unknown as SupabaseClient;
};

// === CRIAÇÃO DO CLIENTE REAL OU MOCK ===
let client: SupabaseClient;
export let isMockMode = false;

try {
  if (isSupabaseConfigured()) {
    client = createClient(supabaseUrl, supabaseAnonKey);
    isMockMode = false;
    console.log('Supabase conectado com sucesso!');
  } else {
    throw new Error('Variáveis do Supabase não configuradas');
  }
} catch (error) {
  console.warn('Supabase não configurado → ativando modo demo', error);
  client = createMockClient();
  isMockMode = true;
}

export const supabase = client as any;

// ================================================================
// === FUNÇÕES QUE VOCÊ VAI USAR NO APP (catecismo, via sacra, etc) ===
// ================================================================

/** Busca todo o catecismo (credo + sacramentos + mandamentos) */
export const fetchCatechism = async () => {
  const { data, error } = await supabase
    .from('app_content')
    .select('*')
    .in('category', ['credo', 'sacramentos', 'mandamentos'])
    .order('order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar catecismo:', error);
    return [];
  }
  return data || [];
};

/** Função genérica – busca qualquer categoria (via_sacra, apostolos, missa, etc) */
export const fetchContentByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('app_content')
    .select('*')
    .eq('category', category)
    .order('order', { ascending: true });

  if (error) {
    console.error(`Erro ao buscar categoria ${category}:`, error);
    return [];
  }
  return data || [];
};

/** Alias mais curto e bonito pra usar nos componentes */
export const getContent = fetchContentByCategory;

// === AUTH (já melhorada e segura) ===
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch {
    return null;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};
