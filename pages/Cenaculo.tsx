
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, BookOpen, Heart, Sparkles, Share2, Lock, CalendarClock, Play, Wind } from 'lucide-react';
import { Button, Card } from '../ui/UIComponents';
import { IconRosary } from '../ui/Icons';
import { CENACULO_CONSAGRACAO } from '../constants';
import { toast } from 'sonner';

// --- BANCO DE CONTEÚDO DINÂMICO ---
// O conteúdo muda baseado na semana do ano (Rotação)
const CENACULO_CONTENTS = [
  {
    id: 1,
    title: "A Grande Batalha",
    messageRef: "Livro Azul, nº 414",
    message: "Meus filhos prediletos, vivei este tempo de purificação com grande confiança. O meu Imaculado Coração é o vosso refúgio e o caminho que vos conduz a Deus. Nestes tempos de grande batalha espiritual, a vossa arma é o Santo Rosário. Rezai-o com amor, em família, nos cenáculos. Eu estou convosco e, através da vossa oração humilde, realizarei o triunfo do meu Coração no mundo.",
    gospelRef: "Lucas 12, 32",
    gospel: "Não tenhas medo, pequeno rebanho, porque foi do agrado de vosso Pai dar-vos o Reino.",
    homily: "A mensagem de Nossa Senhora se une perfeitamente ao Evangelho de hoje. Em tempos de incerteza, Jesus nos chama de 'pequeno rebanho'. Não pela quantidade, mas pela humildade. O Cenáculo é este lugar onde o pequeno rebanho se reúne ao redor da Mãe para perder o medo. A consagração é a chave para entrar nessa proteção divina."
  },
  {
    id: 2,
    title: "O Segundo Pentecostes",
    messageRef: "Livro Azul, nº 426",
    message: "O Espírito Santo descerá como fogo para renovar a face da terra. Preparai-vos no Cenáculo do meu Coração. Assim como os Apóstolos perseveravam em oração comigo, vós também deveis permanecer unidos. O mundo precisa de um novo Pentecostes de amor para que o gelo do egoísmo seja derretido.",
    gospelRef: "João 14, 26",
    gospel: "Mas o Paráclito, o Espírito Santo, que o Pai enviará em meu nome, ensinar-vos-á todas as coisas e vos recordará tudo o que vos tenho dito.",
    homily: "Maria é a Esposa do Espírito Santo. Onde Ela está, o Espírito desce poderosamente. Neste Cenáculo, pedimos não apenas graças pessoais, mas a renovação da Igreja. O Evangelho nos garante que não estamos órfãos; o Espírito nos ensina tudo. Escutemos a voz de Deus no silêncio deste sábado."
  },
  {
    id: 3,
    title: "A Família Consagrada",
    messageRef: "Livro Azul, nº 443",
    message: "Satanás quer destruir a família, mas eu estendo meu manto sobre as famílias que se consagram a mim. Fazei de vossas casas pequenos cenáculos. Rezai juntos. Onde se reza o Rosário, o mal não entra, a discórdia desaparece e a paz floresce.",
    gospelRef: "Mateus 19, 6",
    gospel: "Assim, já não são dois, mas uma só carne. Portanto, o que Deus uniu, o homem não separe.",
    homily: "Hoje a Mãe nos chama a olhar para dentro de nossas casas. O Cenáculo familiar é a fortaleza contra os ataques do mundo moderno. Ao rezarmos juntos, convidamos a Sagrada Família de Nazaré para habitar nossa sala. Que este sábado seja o recomeço da união em seu lar através da oração."
  },
  {
    id: 4,
    title: "Fé e Perseverança",
    messageRef: "Livro Azul, nº 521",
    message: "Não desanimeis diante das dificuldades. A vossa fé deve ser como a luz que brilha nas trevas. Eu sou a Mãe da Fé. Segurai minha mão e eu vos conduzirei em segurança através da tempestade até o porto seguro do Coração de Jesus.",
    gospelRef: "Marcos 11, 22-23",
    gospel: "Tende fé em Deus. Em verdade vos digo: se alguém disser a esta montanha: 'Ergue-te e lança-te ao mar', e não duvidar no seu coração... assim acontecerá.",
    homily: "A montanha que precisamos mover muitas vezes é a do nosso próprio desânimo. Nossa Senhora nos pede perseverança. O Cenáculo semanal é o 'abastecimento' da nossa fé. Não é um rito vazio, é um encontro real com a Mãe que nos fortalece para a semana que se inicia."
  }
];

const CenaculoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(false);
  const [overrideDate, setOverrideDate] = useState(false); // Para teste (Simular Sábado)

  // --- LÓGICA DE DATA E CONTEÚDO ---
  const { isSaturday, displayDate, content, daysUntilNext } = useMemo(() => {
    const today = new Date();
    // 0 = Dom, 1 = Seg ... 6 = Sáb
    const dayOfWeek = today.getDay(); 
    
    // Se for Sábado (6) OU se o override estiver ligado
    const isSat = dayOfWeek === 6 || overrideDate;
    
    // Calcular data do Próximo Sábado (se hoje não for sábado)
    const targetDate = new Date(today);
    if (!isSat) {
        const daysToadd = (6 - dayOfWeek + 7) % 7;
        targetDate.setDate(today.getDate() + daysToadd);
    }

    // Formatar Data
    const formattedDate = targetDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

    // Selecionar Conteúdo Baseado na Semana do Ano (para rodar o conteúdo)
    // Isso garante que todo sábado tenha um texto diferente, ciclando entre os 4 disponíveis
    const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
    const pastDays = Math.floor((targetDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
    
    const contentIndex = weekNumber % CENACULO_CONTENTS.length;
    
    return {
        isSaturday: isSat,
        displayDate: formattedDate,
        content: CENACULO_CONTENTS[contentIndex],
        daysUntilNext: (6 - dayOfWeek + 7) % 7
    };
  }, [overrideDate]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ 
          title: 'Cenáculo com Maria', 
          text: `Cenáculo deste sábado (${displayDate}): "${content.title}". Vamos rezar juntos?` 
        });
      } else {
        toast.success('Link copiado!');
      }
    } catch (err) {
      console.log('Compartilhamento cancelado');
    }
  };

  // --- TELA DE BLOQUEIO (SE NÃO FOR SÁBADO) ---
  if (!isSaturday) {
      return (
        <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-[url('/cenaculo.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
            
            <div className="relative z-10 max-w-sm w-full space-y-8">
                <div className="w-24 h-24 mx-auto bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/30 animate-pulse-slow">
                    <Lock size={40} className="text-red-400" />
                </div>
                
                <div>
                    <h1 className="text-3xl font-serif text-white mb-2">Cenáculo com Maria</h1>
                    <p className="text-gray-400 text-sm font-serif italic">
                        O Cenáculo abre suas portas apenas aos sábados.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                    <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Próximo Encontro</p>
                    <h2 className="text-2xl font-serif text-white">{displayDate}</h2>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                        <CalendarClock size={16} />
                        <span>Faltam {daysUntilNext} dias</span>
                    </div>
                </div>

                <Button variant="outline" onClick={() => navigate(-1)} className="w-full border-white/20 text-gray-300">
                    <ArrowLeft size={16} className="mr-2" /> Voltar ao Início
                </Button>

                {/* Botão de Debug para você testar */}
                <button 
                    onClick={() => setOverrideDate(true)}
                    className="text-[10px] text-gray-700 hover:text-red-500 mt-8 transition-colors flex items-center gap-1 mx-auto"
                >
                    <Play size={8} /> Simular Sábado (Modo Teste)
                </button>
            </div>
        </div>
      );
  }

  // --- TELA DO CENÁCULO (SE FOR SÁBADO) ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#450a0a] via-[#1c0505] to-[#05080f] text-white pb-32 animate-fade-in">
      
      {/* Header com Imagem de Pentecostes */}
      <div className="relative h-80 w-full overflow-hidden">
         <div className="absolute inset-0 bg-[url('/cenaculo.jpg')] bg-cover bg-center opacity-80 animate-scale-in" style={{ animationDuration: '10s' }}></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#450a0a]/40 to-[#1c0505]"></div>
         
         <div className="absolute top-0 left-0 w-full p-6 pt-12 z-20 flex justify-between items-start">
            <button onClick={() => navigate(-1)} className="p-2 bg-black/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                <ArrowLeft className="text-white" />
            </button>
            <button onClick={handleShare} className="p-2 bg-black/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Share2 className="text-white" size={20} />
            </button>
         </div>

         <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-red-600/20 border border-red-500/30 rounded-full mb-4 animate-pulse-slow">
                <Flame className="text-red-400" fill="currentColor" size={24} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white drop-shadow-[0_2px_10px_rgba(220,38,38,0.5)] mb-2">
                Cenáculo com Maria
            </h1>
            <p className="text-red-200/80 font-serif italic tracking-wide capitalize">Sábado, {displayDate}</p>
         </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
         
         {/* 1. Introdução */}
         <div className="bg-black/40 backdrop-blur-xl border border-red-500/20 p-6 rounded-2xl shadow-xl">
            <p className="text-gray-300 text-center text-sm font-serif leading-relaxed">
                "Onde dois ou três estiverem reunidos em meu nome, eu estarei no meio deles." (Mt 18,20). Unamo-nos ao Imaculado Coração.
            </p>
         </div>

         {/* 2. Invocação ao Espírito Santo */}
         <section className="space-y-4">
             <div className="flex items-center gap-2 text-amber-400 justify-center">
                 <Wind size={18} />
                 <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Invocação ao Espírito Santo</h2>
             </div>
             <Card className="bg-gradient-to-br from-amber-900/20 to-black border-amber-500/30 p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <p className="text-amber-100 font-serif text-center text-lg leading-relaxed italic relative z-10">
                    "Vinde, Espírito Santo, vinde por meio da poderosa intercessão do Imaculado Coração de Maria, vossa amadíssima Esposa."
                 </p>
                 <p className="text-center text-xs text-amber-500/60 mt-4 uppercase tracking-widest font-bold">
                    (Rezar 3 vezes)
                 </p>
             </Card>
         </section>

         {/* 3. Mensagem do Livro Azul */}
         <section className="space-y-4">
             <div className="flex items-center gap-2 text-red-400">
                 <Sparkles size={18} />
                 <h2 className="text-xs font-bold uppercase tracking-[0.2em]">A Mensagem</h2>
             </div>
             <Card className="bg-gradient-to-br from-[#2a0a0a] to-[#1a0505] border-red-900/30 p-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <h3 className="text-xl font-serif text-white mb-1">{content.title}</h3>
                 <p className="text-xs text-red-300/70 mb-4 uppercase tracking-wider">{content.messageRef}</p>
                 
                 <div className="relative">
                    <span className="absolute -left-2 -top-2 text-4xl text-red-500/20 font-serif">"</span>
                    <p className="text-gray-200 font-serif leading-loose text-justify italic indent-4 relative z-10">
                        {content.message}
                    </p>
                 </div>
             </Card>
         </section>

         {/* 4. Evangelho */}
         <section className="space-y-4">
             <div className="flex items-center gap-2 text-amber-400">
                 <BookOpen size={18} />
                 <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Santo Evangelho</h2>
             </div>
             <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6">
                 <p className="text-xs text-amber-500/70 mb-3 uppercase font-bold text-center">{content.gospelRef}</p>
                 <p className="text-amber-100 font-serif text-center text-lg leading-relaxed">
                    "{content.gospel}"
                 </p>
             </div>
         </section>

         {/* 5. Homilia / Reflexão */}
         <section className="space-y-4">
             <div className="flex items-center gap-2 text-gray-400">
                 <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                 <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Reflexão Sacerdotal</h2>
             </div>
             <p className="text-gray-300 font-serif leading-relaxed text-justify text-sm pl-4 border-l border-white/10">
                 {content.homily}
             </p>
         </section>

         <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent my-8"></div>

         {/* 6. Oração do Terço */}
         <section className="space-y-4 text-center">
             <h2 className="text-xl font-serif text-white">O Santo Rosário</h2>
             <p className="text-xs text-gray-400 max-w-xs mx-auto mb-4">
                 A oração predileta de Maria para estes tempos.
             </p>
             <Button 
                variant="sacred" 
                className="w-full h-14 text-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] bg-gradient-to-r from-red-700 to-red-900 border-red-500/30 text-white hover:from-red-600 hover:to-red-800"
                onClick={() => navigate('/rosary')}
             >
                 <IconRosary className="mr-2" /> Rezar Mistérios de Hoje
             </Button>
         </section>

         {/* 7. Consagração */}
         <section className="space-y-4 pt-4">
             <div className="text-center mb-4">
                <Heart className="mx-auto text-red-500 mb-2 animate-pulse" fill="currentColor" size={24} />
                <h2 className="text-xl font-serif text-white">Ato de Consagração</h2>
                <p className="text-xs text-gray-400">Ao Imaculado Coração de Maria</p>
             </div>
             
             <Card className="bg-white/5 border-white/10 p-6 relative">
                 <p className="text-gray-200 font-serif leading-loose text-justify text-sm">
                    {CENACULO_CONSAGRACAO.content}
                 </p>
                 <div className="mt-6 flex justify-center">
                    {isRead ? (
                        <span className="text-green-400 text-xs font-bold uppercase tracking-widest border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10 flex items-center gap-2 animate-fade-in">
                            <Heart size={14} fill="currentColor" /> Consagração Renovada
                        </span>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => { setIsRead(true); toast.success("Consagração renovada com amor! ♡"); }} className="border-white/20 text-gray-300 hover:text-white hover:border-white">
                            Confirmar Leitura
                        </Button>
                    )}
                 </div>
             </Card>
         </section>

         <div className="h-8"></div>
      </div>
    </div>
  );
};

export default CenaculoPage;
