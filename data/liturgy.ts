import { DailyLiturgy, LiturgyReading } from '../types';

// Dados de Fallback (Caso esteja offline ou API falhe)
const FALLBACK_LITURGY: DailyLiturgy = {
  date: new Date().toISOString().split('T')[0],
  color: 'white',
  saint: 'Apresentação de Nossa Senhora',
  title: 'Memória da Apresentação da Bem-Aventurada Virgem Maria',
  readings: {
    firstReading: {
      title: 'Leitura da Profecia de Zacarias',
      reference: 'Zc 2, 14-17',
      text: 'Rejubila, alegra-te, cidade de Sião...'
    },
    psalm: {
      title: 'Salmo Responsorial',
      reference: 'Lc 1, 46-55',
      text: 'O Poderoso fez em mim maravilhas e santo é o seu nome.'
    },
    gospel: {
      title: 'Evangelho',
      reference: 'Mateus 12, 46-50',
      text: 'Naquele tempo, enquanto Jesus falava às multidões...'
    }
  }
};

// Mapeia as cores da API (pt-BR) para as cores do tema (en)
const mapColor = (colorName: string): string => {
  const c = colorName.toLowerCase();
  if (c.includes('verde')) return 'green';
  if (c.includes('roxo') || c.includes('lilás')) return 'purple';
  if (c.includes('vermelho')) return 'red';
  if (c.includes('rosa')) return 'rose';
  return 'white'; // Branco ou Dourado
};

export const getDailyLiturgy = async (): Promise<DailyLiturgy> => {
  try {
    // API pública confiável que segue o calendário litúrgico do Brasil (CNBB)
    const response = await fetch('https://liturgia.up.railway.app/');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar liturgia');
    }

    const data = await response.json();

    // Transformar dados da API para o formato do nosso App
    return {
      date: data.data || new Date().toISOString().split('T')[0],
      color: mapColor(data.cor || 'white'),
      saint: data.santo || '',
      title: data.liturgia || 'Liturgia Diária',
      readings: {
        firstReading: {
          title: '1ª Leitura',
          reference: data.primeiraLeitura?.referencia || '',
          text: data.primeiraLeitura?.texto || ''
        },
        psalm: {
          title: 'Salmo',
          reference: data.salmo?.referencia || '',
          text: (data.salmo?.refrao ? `Refrão: ${data.salmo.refrao}\n\n` : '') + (data.salmo?.texto || '')
        },
        gospel: {
          title: 'Evangelho',
          reference: data.evangelho?.referencia || '',
          text: data.evangelho?.texto || ''
        }
      }
    };

  } catch (error) {
    console.warn('Usando liturgia offline:', error);
    return FALLBACK_LITURGY;
  }
};