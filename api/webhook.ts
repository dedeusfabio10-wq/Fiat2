
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// ==== CONFIGURAÇÃO ROBUSTA ====
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || process.env.VITE_MP_ACCESS_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.status(200).json({ status: 'webhook vivo' });

  if (!MP_ACCESS_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ ERRO CRÍTICO: Variáveis de ambiente faltando.');
    return res.status(500).json({ error: 'Server Misconfiguration' });
  }

  const mpClient = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
  const payment = new Payment(mpClient);
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    const payload = req.body;
    // Mercado Pago pode enviar o ID em diferentes campos dependendo da versão da notificação
    let paymentId = payload?.data?.id || payload?.id;

    // Ignora notificações de teste padrão do MP
    if (paymentId == '123456' || paymentId === 123456) {
      return res.status(200).json({ received: true });
    }

    if (!paymentId) {
        return res.status(200).json({ ignored: true });
    }

    // Busca detalhes do pagamento
    const mpResponse = await payment.get({ id: Number(paymentId) });
    const status = mpResponse.status;
    
    // DADOS CRUCIAIS
    // external_reference agora contém o ID do usuário no Supabase (definido no create-checkout.ts)
    const userId = mpResponse.external_reference; 
    const metadata = mpResponse.metadata || {};
    const planType = metadata.plan_type || (mpResponse.description?.includes('Anual') ? 'yearly' : 'monthly');

    console.log(`🔔 Pagamento ${paymentId}: ${status} | UserID: ${userId} | Plan: ${planType}`);

    if (status === 'approved' && userId) {
      const now = new Date();
      let expiresAt = new Date();

      if (planType === 'yearly') {
        expiresAt.setFullYear(now.getFullYear() + 1); // +1 ano
      } else {
        expiresAt.setDate(now.getDate() + 30); // +30 dias
      }

      // Atualiza DIRETAMENTE pelo ID do usuário (mais seguro que email)
      const { error } = await supabase
        .from('profiles')
        .update({
          is_premium: true,
          premium_expires_at: expiresAt.toISOString(),
          subscription_type: planType,
          subscription_id: paymentId.toString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);
      
      if (error) {
          console.error('❌ Erro ao atualizar Supabase:', error);
          return res.status(500).json({ error: 'Database update failed' });
      }

      console.log(`✅ Usuário ${userId} ativado com sucesso.`);
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('❌ Erro no webhook:', error.message);
    return res.status(200).json({ error: error.message }); // Retorna 200 para parar retry do MP em caso de erro nosso
  }
}
