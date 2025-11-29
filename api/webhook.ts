import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    console.log('Webhook recebido');

    // Parse do body
    let payload = req.body;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); }
      catch (e) { return res.status(400).json({ error: 'Invalid JSON' }); }
    }

    // Variáveis de ambiente
    const token = process.env.MP_ACCESS_TOKEN || process.env.VITE_MP_ACCESS_TOKEN;
    const sbUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

    if (!token || !sbUrl || !sbKey) {
      console.error('Variáveis de ambiente faltando');
      return res.status(200).json({ error: 'Config error' });
    }

    // ID do pagamento
    const paymentId = payload?.data?.id || payload?.id;
    if (!paymentId) {
      console.log('Payload sem ID → ignorado');
      return res.status(200).end();
    }

    // Teste do painel do MP
    if (String(paymentId) === '123456') {
      console.log('Teste do painel MP recebido');
      return res.status(200).json({ test: true });
    }

    console.log(`Processando pagamento ${paymentId}`);

    // Clientes
    const mpClient = new MercadoPagoConfig({ accessToken: token });
    const paymentClient = new Payment(mpClient);
    const supabase = createClient(sbUrl, sbKey);

    // Busca o pagamento no Mercado Pago
    let mpResponse;
    try {
      mpResponse = await paymentClient.get({ id: Number(paymentId) });
    } catch (err: any) {
      console.error('Erro ao consultar MP:', err.message);
      return res.status(200).json({ error: 'MP API error' });
    }

    const status = mpResponse.status;
    const payerEmail = mpResponse.payer?.email?.toLowerCase();
    const description = (mpResponse.description || '').toLowerCase();

    // 1º tentativa: external_reference (o ideal)
    let userId = mpResponse.external_reference;

    // 2º tentativa: metadata.user_id (você passa na criação do payment)
    if (!userId && mpResponse.metadata?.user_id) {
      userId = mpResponse.metadata.user_id;
      console.log(`userId via metadata: ${userId}`);
    }

    // 3º tentativa: busca no Supabase pelo email do payer
    if (!userId && payerEmail) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .ilike('email', payerEmail)
        .single();

      if (profile?.id) {
        userId = profile.id;
        console.log(`userId encontrado por email (${payerEmail}): ${userId}`);
      }
    }

    // Determina o tipo de plano
    const planType = mpResponse.metadata?.plan_type ||
                     (description.includes('anual') || description.includes('year') ? 'yearly' : 'monthly');

    console.log(`Status: ${status} | Email: ${payerEmail} | UserId: ${userId} | Plano: ${planType}`);

    // Só ativa se for aprovado e tiver userId
    if (status === 'approved' && userId) {
      const now = new Date();
      const expiresAt = planType === 'yearly'
        ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
        : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email: payerEmail,
          is_premium: true,
          premium_expires_at: expiresAt.toISOString(),
          subscription_type: planType,
          subscription_id: String(paymentId),
          subscription_method: 'mercadopago',
          updated_at: now.toISOString(),
        }, { onConflict: 'id' });

      if (error) {
        console.error('Erro no upsert Supabase:', error);
      } else {
        console.log(`PREMIUM ATIVADO → UserId: ${userId} | Plano: ${planType}`);
      }
    } else {
      console.log(`Ignorado → status: ${status} | tem userId: ${!!userId}`);
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Erro inesperado no webhook:', err);
    return res.status(200).json({ error: err.message });
  }
}
