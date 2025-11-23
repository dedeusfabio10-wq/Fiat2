import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// ==== CONFIGURAÇÃO ====
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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
    const paymentId = payload?.data?.id || payload?.id;

    if (paymentId == '123456' || paymentId === 123456) {
      return res.status(200).json({ received: true });
    }

    if (!paymentId) return res.status(200).end();

    const mpResponse = await payment.get({ id: Number(paymentId) });
    const status = mpResponse.status;
    const email = mpResponse.payer?.email;
    const externalRef = mpResponse.external_reference; // 'monthly' ou 'yearly'

    console.log(`Pagamento ${paymentId}: ${status} | Ref: ${externalRef} | Email: ${email}`);

    if (status === 'approved' && email) {
      // Cálculo da data de expiração
      const now = new Date();
      let expiresAt = new Date();

      if (externalRef === 'yearly') {
        expiresAt.setFullYear(now.getFullYear() + 1); // +1 ano
      } else {
        expiresAt.setDate(now.getDate() + 30); // +30 dias (padrão mensal)
      }

      const { data: user } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (user) {
        await supabase
          .from('profiles')
          .update({
            is_premium: true,
            premium_expires_at: expiresAt.toISOString(), // Salva a data limite
            subscription_type: externalRef === 'yearly' ? 'yearly' : 'monthly',
            subscription_id: paymentId.toString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        console.log(`✅ Usuário ${email} ativado até ${expiresAt.toISOString()}`);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('❌ Erro no webhook:', error.message);
    return res.status(200).json({ error: error.message });
  }
}