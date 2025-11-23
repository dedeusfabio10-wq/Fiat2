import { supabase } from './supabase';
import { SpiritualPlan } from '../types';

// --- FAVORITOS (Mantidos no LocalStorage por performance/simplicidade ou movidos para profile no futuro) ---
export const toggleFavorite = (id: string): string[] => {
  const favs = JSON.parse(localStorage.getItem('fiat-favorites') || '[]');
  if (favs.includes(id)) {
    const newFavs = favs.filter((f: string) => f !== id);
    localStorage.setItem('fiat-favorites', JSON.stringify(newFavs));
    return newFavs;
  } else {
    const newFavs = [...favs, id];
    localStorage.setItem('fiat-favorites', JSON.stringify(newFavs));
    return newFavs;
  }
};

// --- PLANNER (Agora usando Supabase) ---

export const getPlans = async (): Promise<SpiritualPlan[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('spiritual_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar planos:', error);
      return [];
    }

    // Mapeia o snake_case do banco para camelCase do frontend se necessário, 
    // mas aqui assumimos que o frontend vai ler as propriedades corretamente ou fazemos o cast.
    // Como definimos a tabela com snake_case mas o tipo TS é camelCase, precisamos ajustar:
    
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        spiritualDirector: item.spiritual_director,
        durationDays: item.duration_days,
        startDate: item.start_date,
        createdAt: item.created_at,
        streak: 0, // Campo calculado localmente ou novo campo no DB
        progress: {}, // Campo novo no DB se quiser persistir progresso diário
        notes: {},
        schedule: item.schedule || { morning: [], afternoon: [], night: [] }
    })) as SpiritualPlan[];

  } catch (e) {
    console.error("Erro no serviço de planos:", e);
    return [];
  }
};

export const addPlan = async (plan: SpiritualPlan): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error("Usuário não logado");
        return false;
    }

    // Converter para formato do banco (snake_case)
    const dbPayload = {
        user_id: user.id,
        title: plan.title,
        spiritual_director: plan.spiritualDirector,
        duration_days: plan.durationDays,
        start_date: plan.startDate,
        schedule: plan.schedule
    };

    const { error } = await supabase
      .from('spiritual_plans')
      .insert([dbPayload]);

    if (error) {
        console.error('Erro ao salvar plano:', error);
        return false;
    }
    return true;
  } catch (e) {
    console.error("Erro ao salvar plano:", e);
    return false;
  }
};

export const deletePlan = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
        .from('spiritual_plans')
        .delete()
        .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (e) {
    console.error("Erro ao deletar plano:", e);
    return false;
  }
};