import { SpiritualPlan } from '../types';

// NOTE: Currently using LocalStorage for MVP/Offline capability.
// In a full production version with Supabase Data Sync, these functions 
// would be replaced by Supabase DB calls using the 'profiles' and 'spiritual_plans' tables.

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

export const getPlans = (): SpiritualPlan[] => {
  return JSON.parse(localStorage.getItem('fiat-plans') || '[]');
};

export const addPlan = (plan: SpiritualPlan) => {
  const plans = getPlans();
  plans.push(plan);
  localStorage.setItem('fiat-plans', JSON.stringify(plans));
};

export const deletePlan = (id: string) => {
  const plans = getPlans().filter(p => p.id !== id);
  localStorage.setItem('fiat-plans', JSON.stringify(plans));
};