
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// ==== CONFIGURAÇÃO ROBUSTA ====
// Tenta pegar a variável padrão do Vercel, se falhar, tenta a versão VITE_
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
    
    // Mercado Pago pode enviar dados de formas diferentes dependendo da versão do webhook
    // Às vezes vem em `data.id`, às vezes em `id` (v0), ou via query params se for configurado IPN
    let paymentId = payload?.data?.id || payload?.id;

    // Log para debug
    console.log('Webhook Payload:', JSON.stringify(payload));

    if (paymentId == '123456' || paymentId === 123456) {
      return res.status(200).json({ received: true });
    }

    if (!paymentId) {
        // Se não achou ID, tenta verificar se é uma notificação do tipo merchant_order e ignora por enquanto
        return res.status(200).json({ ignored: true });
    }

    const mpResponse = await payment.get({ id: Number(paymentId) });
    const status = mpResponse.status;
    const email = mpResponse.payer?.email;
    const externalRef = mpResponse.external_reference; // 'monthly' ou 'yearly'

    console.log(`Pagamento ${paymentId}: ${status} | Ref: ${externalRef} | Email: ${email}`);

    if (status === 'approved' && email) {
      const now = new Date();
      let expiresAt = new Date();

      if (externalRef === 'yearly') {
        expiresAt.setFullYear(now.getFullYear() + 1); // +1 ano
      } else {
        expiresAt.setDate(now.getDate() + 30); // +30 dias
      }

      // Busca case-insensitive
      const { data: user } = await supabase
        .from('profiles')
        .select('id')
        .ilike('email', email) 
        .single();

      if (user) {
        await supabase
          .from('profiles')
          .update({
            is_premium: true,
            premium_expires_at: expiresAt.toISOString(),
            subscription_type: externalRef === 'yearly' ? 'yearly' : 'monthly',
            subscription_id: paymentId.toString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        console.log(`✅ Usuário ${email} ativado.`);
      } else {
        console.warn(`⚠️ Usuário não encontrado no DB: ${email}`);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('❌ Erro no webhook:', error.message);
    // Retornamos 200 mesmo com erro para evitar que o Mercado Pago fique tentando reenviar infinitamente se o erro for nosso
    return res.status(200).json({ error: error.message });
  }
}
