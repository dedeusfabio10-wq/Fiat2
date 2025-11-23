import { UserProfile } from '../types';

const getEnvVar = (key: string): string => {
  // @ts-ignore
  const env = import.meta.env || (window as any).__env || {};
  return env[key] || '';
};

export const createSubscription = async (email: string, plan: 'monthly' | 'yearly') => {
  // IMPORTANTE: Use links de "Check-out Pro" (Pagamento Único) no Mercado Pago.
  // Não use links de assinatura recorrente se quiser permitir PIX sem login.
  const linkMonthly = getEnvVar('VITE_MP_LINK_MONTHLY') || getEnvVar('VITE_MP_LINK_MENSAL');
  const linkYearly = getEnvVar('VITE_MP_LINK_YEARLY') || getEnvVar('VITE_MP_LINK_ANUAL');
  
  const link = plan === 'monthly' ? linkMonthly : linkYearly;

  console.log(`[MercadoPago] Produto selecionado: ${plan}`);
  
  if (!link || link === '' || link.includes('placeholder')) {
      console.error("⚠️ LINKS DE PAGAMENTO NÃO CONFIGURADOS");
      return {
        id: 'error',
        init_point: null,
        error: true
      };
  }

  // Retorna o link direto
  return {
    id: `prod_${Math.random().toString(36).substr(2, 9)}`,
    init_point: link,
    error: false
  };
};

// Mantido apenas para compatibilidade de tipos, mas não usado no fluxo de pagamento único
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