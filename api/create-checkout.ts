import { MercadoPagoConfig, Preference } from 'mercadopago';

// Tenta pegar do processo (Vercel) ou usa a variável VITE para fallback
// Isso garante compatibilidade em diferentes ambientes de build
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || process.env.VITE_MP_ACCESS_TOKEN;

export default async function handler(req: any, res: any) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!MP_ACCESS_TOKEN) {
      console.error('MP_ACCESS_TOKEN missing');
      return res.status(500).json({ error: 'Server configuration error: Missing Payment Token' });
  }

  const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

  try {
    const { plan, userId, email } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const preference = new Preference(client);
    
    const isYearly = plan === 'yearly';
    const price = isYearly ? 39.90 : 4.90;
    const title = isYearly ? 'Fiat Premium - Plano Anual' : 'Fiat Premium - Plano Mensal';

    // Determinar URL de retorno dinamicamente
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const origin = `${protocol}://${host}`;
    // Usar hash router path
    const returnUrl = `${origin}/#/profile`; 

    const response = await preference.create({
      body: {
        items: [
          {
            id: plan,
            title: title,
            quantity: 1,
            unit_price: price,
            currency_id: 'BRL',
          }
        ],
        payer: {
          email: email || 'customer@email.com' // Fallback se email não vier
        },
        // DADO CRÍTICO: Vincula o pagamento ao usuário do Supabase
        external_reference: userId,
        metadata: {
          plan_type: plan,
          user_id: userId
        },
        back_urls: {
          success: returnUrl,
          failure: returnUrl,
          pending: returnUrl
        },
        auto_return: 'approved',
        statement_descriptor: 'FIAT APP'
      }
    });

    return res.status(200).json({ init_point: response.init_point });
  } catch (error: any) {
    console.error('Error creating preference:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}