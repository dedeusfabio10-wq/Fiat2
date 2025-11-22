import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // 1. Configurar Headers para evitar bloqueios
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  // Responder rapidamente a requisições OPTIONS (CORS pré-flight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Webhook do Mercado Pago é sempre POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('--- WEBHOOK INICIADO ---');

  // 2. Verificar Variáveis de Ambiente
  const accessToken = process.env.MP_ACCESS_TOKEN;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!accessToken || !supabaseUrl || !supabaseServiceKey) {
    console.error('ERRO CRÍTICO: Variáveis de ambiente não configuradas na Vercel.');
    return res.status(500).json({ error: 'Server internal configuration error' });
  }

  try {
    // Inicializar Clientes
    const client = new MercadoPagoConfig({ accessToken: accessToken });
    const payment = new Payment(client);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, data, type } = req.body || {};
    const id = data?.id;

    console.log(`Evento recebido: Action=${action}, Type=${type}, ID=${id}`);

    // Filtrar eventos relevantes (pagamento criado ou atualizado)
    if (action === 'payment.created' || action === 'payment.updated' || type === 'payment') {
      if (!id) {
        console.warn('ID de pagamento não encontrado no corpo da requisição.');
        return res.status(200).json({ warning: 'No ID provided' });
      }

      // Buscar status atualizado no Mercado Pago
      const paymentData = await payment.get({ id: id });
      const status = paymentData.status;
      const payerEmail = paymentData.payer?.email;
      const externalReference = paymentData.external_reference; 

      console.log(`Status do Pagamento ${id}: ${status} | Email: ${payerEmail}`);

      if (status === 'approved' && payerEmail) {
        console.log(`Pagamento Aprovado. Buscando usuário ${payerEmail}...`);

        // Buscar usuário no Supabase
        const { data: profiles, error: searchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', payerEmail)
          .limit(1);

        if (searchError) {
            console.error('Erro ao buscar perfil:', searchError);
            return res.status(500).json({ error: 'Database search failed' });
        }

        if (!profiles || profiles.length === 0) {
           console.warn(`Usuário com email ${payerEmail} não encontrado no banco de dados.`);
           // Retornamos 200 para não travar a fila do Mercado Pago
           return res.status(200).json({ warning: 'User not found', email: payerEmail });
        }

        const userId = profiles[0].id;

        // Atualizar Perfil para Premium
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
          console.error('Erro ao atualizar perfil:', updateError);
          return res.status(500).json({ error: 'Profile update failed' });
        }

        console.log(`SUCESSO: Usuário ${userId} agora é PREMIUM.`);
      }
    }

    // Sempre retornar 200 OK para o Mercado Pago saber que recebemos
    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error('Erro no processamento do Webhook:', error);
    // Retornar 500 faz o Mercado Pago tentar de novo mais tarde
    return res.status(500).json({ error: error.message });
  }
}