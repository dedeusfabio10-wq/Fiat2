import { UserProfile } from '../types';

// Função segura para ler variáveis de ambiente no Vite
const getEnvVar = (key: string): string => {
  // @ts-ignore
  const env = import.meta.env || (window as any).__env || {};
  return env[key] || '';
};

export const createSubscription = async (email: string, plan: 'monthly' | 'yearly') => {
  // Mapeia o plano para a variável de ambiente correta
  const linkMonthly = getEnvVar('VITE_MP_LINK_MONTHLY');
  const linkYearly = getEnvVar('VITE_MP_LINK_YEARLY');
  
  const link = plan === 'monthly' ? linkMonthly : linkYearly;

  console.log(`[MercadoPago] Tentando abrir plano: ${plan}`);

  // Validação para evitar erros silenciosos
  if (!link || link === '' || link.includes('placeholder')) {
      console.error("⚠️ LINKS DE PAGAMENTO NÃO CONFIGURADOS");
      console.warn("Vá no painel da Vercel > Settings > Environment Variables.");
      console.warn("Adicione VITE_MP_LINK_MONTHLY e VITE_MP_LINK_YEARLY com os links do Mercado Pago.");
      
      return {
        id: 'error',
        init_point: null,
        error: true
      };
  }

  // Retorna o link real
  return {
    id: `sub_${Math.random().toString(36).substr(2, 9)}`,
    init_point: link,
    error: false
  };
};

// Simulação de cancelamento (na vida real, seria via API ou Portal do Cliente)
export const cancelSubscription = async (): Promise<Partial<UserProfile>> => {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve({
              is_premium: false,
              subscriptionType: undefined,
              subscriptionId: undefined,
              subscriptionMethod: undefined
          });
      }, 1000);
  });
};