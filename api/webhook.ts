import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // 1. Configurar Headers CORS e JSON
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Tratamento de Pre-flight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Teste simples via browser (GET)
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'Webhook online', time: new Date().toISOString() });
  }

  // Apenas POST é aceito para o webhook real
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('--- 🔔 WEBHOOK MERCADO PAGO INICIADO ---');

  // 2. Validar Variáveis de Ambiente
  const accessToken = process.env.MP_ACCESS_TOKEN;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!accessToken || !supabaseUrl || !supabaseServiceKey) {
    console.error('❌ ERRO CRÍTICO: Variáveis de ambiente ausentes.');
    return res.status(500).json({ error: 'Internal Server Error: Config missing' });
  }

  try {
    // Inicializar clientes
    const client = new MercadoPagoConfig({ accessToken: accessToken });
    const payment = new Payment(client);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, type, data } = req.body || {};
    const id = data?.id || req.body?.data?.id;

    console.log(`📩 Evento recebido: ${action || type} | ID: ${id}`);

    // Filtrar eventos de pagamento
    if (action === 'payment.created' || action === 'payment.updated' || type === 'payment') {
      if (!id) {
        console.warn('⚠️ ID de pagamento não encontrado no corpo da requisição.');
        return res.status(200).json({ message: 'No ID provided, ignored' });
      }

      console.log(`🔍 Consultando pagamento ${id} no Mercado Pago...`);

      // Buscar detalhes do pagamento
      const paymentData = await payment.get({ id: id });
      const status = paymentData.status;
      const payerEmail = paymentData.payer?.email;
      const externalReference = paymentData.external_reference;

      console.log(`✅ Status: ${status} | Email: ${payerEmail} | Ref: ${externalReference}`);

      if (status === 'approved' && payerEmail) {
        console.log(`🚀 Pagamento APROVADO. Atualizando usuário ${payerEmail}...`);

        // 1. Encontrar usuário pelo email
        const { data: profiles, error: searchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', payerEmail)
          .limit(1);

        if (searchError) {
          console.error('❌ Erro ao buscar perfil:', searchError);
          throw searchError;
        }

        if (!profiles || profiles.length === 0) {
          console.warn(`⚠️ Usuário com email ${payerEmail} não encontrado no Supabase.`);
          // Retornar 200 para não travar o Mercado Pago, pois o erro é de negócio (email não existe)
          return res.status(200).json({ warning: 'User not found', email: payerEmail });
        }

        const userId = profiles[0].id;

        // 2. Atualizar usuário para Premium
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            is_premium: true,
            subscription_type: externalReference === 'yearly' ? 'yearly' : 'monthly',
            subscription_id: id.toString(),
            subscription_method: paymentData.payment_type_id || 'credit_card',
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (updateError) {
          console.error('❌ Erro ao atualizar perfil:', updateError);
          throw updateError;
        }

        console.log(`🎉 SUCESSO! Usuário ${userId} agora é Premium.`);
      } else {
        console.log(`ℹ️ Pagamento não aprovado ou email ausente. Status: ${status}`);
      }
    } else {
      console.log('ℹ️ Evento ignorado (não é atualização de pagamento).');
    }

    // Sempre retornar 200 para o Mercado Pago
    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error('❌ ERRO NO WEBHOOK:', error);
    // Retornar 500 faz o Mercado Pago tentar novamente mais tarde
    return res.status(500).json({ error: error.message });
  }
}