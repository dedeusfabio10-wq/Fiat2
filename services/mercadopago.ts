import { UserProfile } from '../types';

export const createPixPayment = async (email: string, amount: number, description: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response
  return {
    id: Math.floor(Math.random() * 1000000).toString(),
    status: 'pending',
    point_of_interaction: {
      transaction_data: {
        qr_code: "00020126580014BR.GOV.BCB.PIX0136a629532e-7693-4846-b061-4422002436365204000053039865802BR5925Fiat Santuario Digital6009Sao Paulo62070503***6304E2CA",
        qr_code_base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" // 1x1 pixel placeholder
      }
    }
  };
};

export const checkPaymentStatus = async (paymentId: string) => {
  // Simulate checking status
  const chance = Math.random();
  if (chance > 0.7) return 'approved';
  return 'pending';
};

export const createSubscription = async (email: string, plan: 'monthly' | 'yearly') => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: `sub_${Math.random().toString(36).substr(2, 9)}`,
    init_point: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=mock_preference"
  };
};

export const activatePremium = async (method: 'pix' | 'card', plan: 'monthly' | 'yearly', subId?: string): Promise<Partial<UserProfile>> => {
  return {
    is_premium: true,
    subscriptionType: plan,
    subscriptionMethod: method,
    subscriptionId: subId || `pay_${Math.random().toString(36).substr(2, 9)}`
  };
};

export const cancelSubscription = async (): Promise<Partial<UserProfile>> => {
  // Simulate API Call
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
