import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// ==== CONFIGURAÇÃO ====
// Em produção use token de produção, em teste use token de teste
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// ==== HANDLER ====
export default async function handler(req: any, res: any) {
  // CORS + Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.status(200).json({ status: 'webhook vivo' });

  if (req.method !== 'POST') return res.status(405).end();

  // Validação das chaves apenas dentro da execução para não quebrar o build se faltarem localmente
  if (!MP_ACCESS_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ ERRO CRÍTICO: Variáveis de ambiente faltando (MP_ACCESS_TOKEN, VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
    return res.status(500).json({ error: 'Server Misconfiguration' });
  }

  const mpClient = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
  const payment = new Payment(mpClient);
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    const payload = req.body;

    // O Mercado Pago manda assim: { "action": "payment.updated", "data": { "id": "123456789" }, "type": "payment" }
    // Às vezes manda o ID na raiz do objeto dependendo da versão do webhook
    const paymentId = payload?.data?.id || payload?.id;

    // Teste do painel do MP (id = 123456) → só confirma recebimento
    if (paymentId == '123456' || paymentId === 123456) {
      console.log('🧪 Teste do painel MP recebido com sucesso');
      return res.status(200).json({ received: true });
    }

    if (!paymentId) {
      console.warn('⚠️ Payload recebido sem ID de pagamento', payload);
      return res.status(200).end();
    }

    console.log(`🔍 Consultando pagamento ${paymentId}...`);

    // Busca os detalhes do pagamento na API do Mercado Pago
    const mpResponse = await payment.get({ id: Number(paymentId) });

    const status = mpResponse.status;
    const email = mpResponse.payer?.email;
    const externalRef = mpResponse.external_reference; // Passado no checkout ('monthly' ou 'yearly')

    console.log(`✅ Pagamento ${paymentId}: Status=${status} | Email=${email}`);

    if (status === 'approved' && email) {
      // Busca usuário pelo e-mail na tabela profiles
      const { data: user, error: searchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (searchError) {
          console.error('Erro ao buscar usuário no Supabase:', searchError);
      }

      if (user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            is_premium: true,
            subscription_type: externalRef === 'yearly' ? 'yearly' : 'monthly',
            subscription_id: paymentId.toString(),
            subscription_method: 'mercadopago',
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (updateError) {
            console.error('Erro ao atualizar perfil:', updateError);
        } else {
            console.log(`🎉 Usuário ${email} atualizado para PREMIUM com sucesso.`);
        }
      } else {
        console.warn(`⚠️ E-mail ${email} não encontrado no banco de dados do Supabase. O usuário precisa criar conta antes.`);
      }
    }

    return res.status(200).json({ ok: true });

  } catch (error: any) {
    console.error('❌ ERRO WEBHOOK:', error.message || error);

    // IMPORTANTE: retornar 200 mesmo com erro interno
    // senão o Mercado Pago fica reenviando a notificação por dias
    return res.status(200).json({ error: error.message });
  }
}