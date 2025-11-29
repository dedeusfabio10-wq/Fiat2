import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

// Verifica se as variáveis estão configuradas corretamente
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

// Cria o cliente real ou cai no mock
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

export const supabase = client as any;

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch (e) {
    return null;
  }
};

// ===============================================
// NOVAS FUNÇÕES PARA COMUNIDADES CATÓLICAS
// ===============================================

/**
 * Busca todas as comunidades públicas com número de membros
 */
export const getCommunities = async () => {
  const { data, error } = await supabase.rpc('get_public_communities_with_member_count');
  if (error) {
    console.error('Erro ao buscar comunidades públicas:', error);
    return [];
  }
  return data || [];
};

/**
 * Busca as comunidades que o usuário faz parte
 */
export const getUserCommunities = async (userId: string) => {
  const { data, error } = await supabase
    .from('community_members')
    .select('communities(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao buscar comunidades do usuário:', error);
    return [];
  }
  return data?.map((item: any) => item.communities) || [];
};

/**
 * Busca detalhes de uma comunidade específica
 */
export const getCommunityById = async (id: string) => {
  const { data, error } = await supabase
    .from('communities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar comunidade:', error);
    return null;
  }
  return data;
};

/**
 * Cria uma nova comunidade e adiciona o criador como admin
 */
export const createCommunity = async (
  name: string,
  description: string,
  isPublic: boolean,
  ownerId: string
) => {
  const { data, error } = await supabase
    .from('communities')
    .insert([{ name, description, is_public: isPublic, owner_id: ownerId }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar comunidade:', error);
    return null;
  }

  // Adiciona o dono como admin
  await supabase
    .from('community_members')
    .insert([{ community_id: data.id, user_id: ownerId, role: 'admin' }]);

  return data;
};

/**
 * Entrar em uma comunidade pública
 */
export const joinCommunity = async (communityId: string, userId: string) => {
  const { error } = await supabase
    .from('community_members')
    .insert([{ community_id: communityId, user_id: userId, role: 'member' }]);

  if (error) {
    console.error('Erro ao entrar na comunidade:', error);
    return false;
  }
  return true;
};

/**
 * Busca todas as mensagens de uma comunidade (com nome e foto do remetente)
 */
export const getCommunityMessages = async (communityId: string) => {
  const { data, error } = await supabase
    .from('community_messages')
    .select('*, profiles(name, photo)')
    .eq('community_id', communityId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erro ao buscar mensagens:', error);
    return [];
  }
  return data || [];
};

/**
 * Envia uma mensagem na comunidade
 */
export const sendCommunityMessage = async (
  communityId: string,
  senderId: string,
  content: string
) => {
  const { error } = await supabase
    .from('community_messages')
    .insert([{ community_id: communityId, sender_id: senderId, content }]);

  if (error) {
    console.error('Erro ao enviar mensagem:', error);
    return false;
  }
  return true;
};
