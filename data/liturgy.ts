import { DailyLiturgy } from '../types';

export const getDailyLiturgy = (): DailyLiturgy => {
  return {
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
};