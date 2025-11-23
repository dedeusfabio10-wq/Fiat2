
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

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        spiritualDirector: item.spiritual_director,
        durationDays: item.duration_days,
        startDate: item.start_date,
        createdAt: item.created_at,
        streak: item.streak || 0,
        progress: item.progress || {},
        notes: item.notes || {},
        schedule: item.schedule || { morning: [], afternoon: [], night: [] }
    })) as SpiritualPlan[];

  } catch (e) {
    console.error("Erro no serviço de planos:", e);
    return [];
  }
};

export const getPlanById = async (id: string): Promise<SpiritualPlan | null> => {
  try {
    const { data, error } = await supabase
      .from('spiritual_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Erro ao buscar plano:', error);
      return null;
    }

    return {
        id: data.id,
        title: data.title,
        spiritualDirector: data.spiritual_director,
        durationDays: data.duration_days,
        startDate: data.start_date,
        createdAt: data.created_at,
        streak: data.streak || 0,
        progress: data.progress || {},
        notes: data.notes || {},
        schedule: data.schedule || { morning: [], afternoon: [], night: [] }
    } as SpiritualPlan;

  } catch (e) {
    return null;
  }
};

export const addPlan = async (plan: SpiritualPlan): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error("Usuário não logado");
        return false;
    }

    const dbPayload = {
        user_id: user.id,
        title: plan.title,
        spiritual_director: plan.spiritualDirector,
        duration_days: plan.durationDays,
        start_date: plan.startDate,
        schedule: plan.schedule,
        progress: {},
        notes: {},
        streak: 0
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

export const updatePlan = async (plan: SpiritualPlan): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('spiritual_plans')
            .update({
                progress: plan.progress,
                streak: plan.streak,
                notes: plan.notes
            })
            .eq('id', plan.id);
        
        if (error) throw error;
        return true;
    } catch (e) {
        console.error("Erro ao atualizar plano", e);
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
