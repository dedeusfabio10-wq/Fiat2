import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // 1. Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    console.log('🔔 Webhook recebido. Método:', req.method);

    // 2. Parse Seguro do Body
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        console.error('❌ Erro ao fazer parse do body:', e);
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }

    // 3. Verificação de Variáveis
    const token = process.env.MP_ACCESS_TOKEN || process.env.VITE_MP_ACCESS_TOKEN;
    const sbUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

    if (!token || !sbUrl || !sbKey) {
      console.error('❌ ERRO CRÍTICO: Variáveis de ambiente faltando.');
      return res.status(200).json({ error: 'Server Misconfiguration' });
    }

    // 4. Extração do ID do Pagamento
    const paymentId = payload?.data?.id || payload?.id;

    if (!paymentId) {
        console.log('⚠️ Payload sem ID de pagamento. Ignorando.');
        return res.status(200).json({ ignored: true, reason: 'No payment ID' });
    }

    if (String(paymentId) === '123456') {
        console.log('ℹ️ Notificação de teste do MP recebida.');
        return res.status(200).json({ received: true, test: true });
    }

    console.log(`🔄 Processando Pagamento ID: ${paymentId}`);

    // 5. Inicialização dos Clientes
    const mpClient = new MercadoPagoConfig({ accessToken: token });
    const payment = new Payment(mpClient);
    const supabase = createClient(sbUrl, sbKey);

    // 6. Busca dados do pagamento no Mercado Pago
    let mpResponse;
    try {
        mpResponse = await payment.get({ id: Number(paymentId) });
    } catch (mpError: any) {
        console.error(`❌ Erro ao consultar MP (ID ${paymentId}):`, mpError);
        return res.status(200).json({ error: 'Mercado Pago API Error', details: mpError.message });
    }

    if (!mpResponse) {
        return res.status(200).json({ error: 'Empty response from MP' });
    }

    const status = mpResponse.status;
    const userId = mpResponse.external_reference;
    const metadata = mpResponse.metadata || {};
    const userEmail = mpResponse.payer?.email;
    
    const description = mpResponse.description || '';
    const planType = metadata.plan_type || (description.toLowerCase().includes('anual') ? 'yearly' : 'monthly');

    console.log(`📊 Status: ${status} | User: ${userId} | Plan: ${planType}`);

    // 7. Atualização/Criação do Perfil (UPSERT)
    // REQUISITO: Só cria o perfil no Supabase (tabela profiles) quando o pagamento é aprovado.
    if (status === 'approved' && userId) {
      const now = new Date();
      let expiresAt = new Date();

      if (planType === 'yearly') {
        expiresAt.setFullYear(now.getFullYear() + 1);
      } else {
        expiresAt.setDate(now.getDate() + 30);
      }

      // CRUCIAL: Usamos upsert para CRIAR o perfil se ele não existir (sign up sem profile)
      // ou ATUALIZAR se já existir.
      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          id: userId, // Chave primária (Link com Auth)
          email: userEmail, // Garante que o email esteja salvo
          is_premium: true,
          premium_expires_at: expiresAt.toISOString(),
          subscription_type: planType,
          subscription_id: String(paymentId),
          subscription_method: 'mercadopago',
          updated_at: new Date().toISOString(),
          // Valores padrão caso esteja criando agora (Sign Up tardio do profile)
          streak: 0,
          rosaries_prayed: 0,
          onboarding_completed: true
        }, { onConflict: 'id' }); // Garante update se ID existir
      
      if (dbError) {
          console.error('❌ Erro Supabase:', dbError);
          return res.status(200).json({ error: 'Database update failed', details: dbError });
      }

      console.log(`✅ Sucesso! Usuário ${userId} ativado/criado como Premium.`);
    } else {
        console.log(`ℹ️ Pagamento não aprovado ou sem UserID.`);
    }

    return res.status(200).json({ success: true, status: status });

  } catch (globalError: any) {
    console.error('💥 ERRO NÃO TRATADO:', globalError);
    return res.status(200).json({ error: 'Internal Server Error', message: globalError.message });
  }
}