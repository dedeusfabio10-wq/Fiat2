
import { supabase } from './supabase';
import { UserProfile } from '../types';

export const createSubscription = async (plan: 'monthly' | 'yearly') => {
  // 1. Pega o usuário atual para vincular ao pagamento
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
      return { error: true, message: 'Usuário não logado. Faça login para assinar.' };
  }

  try {
    // 2. Chama nossa API Serverless para gerar o link de pagamento
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan,
        userId: user.id,
        email: user.email || user.user_metadata?.email
      }),
    });

    if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor de pagamento');
    }

    const data = await response.json();
    
    if (!data.init_point) {
        throw new Error('Link de pagamento não gerado');
    }

    // 3. Retorna o link direto do Mercado Pago
    return { 
        init_point: data.init_point, 
        error: false 
    };

  } catch (error) {
    console.error('[MercadoPago Service] Erro:', error);
    return { error: true, message: 'Erro ao iniciar pagamento. Tente novamente.' };
  }
};

// Mantido apenas para compatibilidade de tipos
export const cancelSubscription = async (): Promise<Partial<UserProfile>> => {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve({
              is_premium: false,
              subscriptionType: undefined,
              subscriptionId: undefined,
              subscriptionMethod: undefined,
              premium_expires_at: undefined
          });
      }, 1000);
  });
};
