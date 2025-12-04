import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Calendar, Star, Lock, ChevronRight, BookOpen, Gift } from 'lucide-react';
import { Button } from '../ui/UIComponents';
import { toast } from 'sonner';
import SEO from '../components/SEO';


// --- DADOS DO ADVENTO ---

const ADVENT_WEEKS = [
  {
    id: 1,
    title: "1º Domingo do Advento",
    theme: "Vigilância e Esperança",
    candleColor: "bg-purple-600",
    prayer: "Senhor, despertai em nós o desejo da vossa vinda. Que a luz desta primeira vela dissipe as trevas do nosso coração, para que estejamos atentos e vigilantes à vossa chegada.",
    action: "Acender a Vela da Profecia"
  },
  {
    id: 2,
    title: "2º Domingo do Advento",
    theme: "Conversão e Fé",
    candleColor: "bg-purple-600",
    prayer: "Ó Deus, que a voz de João Batista ecoe em nossa alma: 'Preparai o caminho do Senhor'. Que esta segunda vela ilumine os caminhos tortuosos da nossa vida para que o Menino Jesus encontre morada digna.",
    action: "Acender a Vela de Belém"
  },
  {
    id: 3,
    title: "3º Domingo do Advento (Gaudete)",
    theme: "Alegria",
    candleColor: "bg-pink-600", // Vela Rosa
    prayer: "Alegrai-vos sempre no Senhor! Hoje a luz brilha mais forte. Que esta vela rosa nos lembre que o Senhor está perto e a tristeza não tem mais lugar em quem espera o Salvador.",
    action: "Acender a Vela dos Pastores"
  },
  {
    id: 4,
    title: "4º Domingo do Advento",
    theme: "Paz e Amor",
    candleColor: "bg-purple-600",
    prayer: "Derramai, ó Deus, a vossa graça em nossos corações. Que, ao acendermos a última vela, contemplemos com Maria o mistério do Verbo que se fez carne e habitou entre nós.",
    action: "Acender a Vela dos Anjos"
  }
];

// === 24 DIAS DO ADVENTO COM FRASES ÚNICAS E AÇÕES ===
const ADVENT_CALENDAR_DAYS = [
  { day: 1, verse: "Vigiai, pois não sabeis o dia nem a hora.", reflection: "Começa o Advento. Hoje é dia de renovar a esperança.", action: "Fazer um propósito de oração diária" },
  { day: 2, verse: "Preparai o caminho do Senhor.", reflection: "João Batista clama no deserto. E você, está preparando o coração?", action: "Confessar-se esta semana" },
  { day: 3, verse: "Eis que envio o meu mensageiro diante de ti.", reflection: "Deus sempre envia alguém para nos preparar. Quem é o seu João Batista?", action: "Agradecer a alguém que te ajudou na fé" },
  { day: 4, verse: "E o Verbo se fez carne e habitou entre nós.", reflection: "Deus quis precisar de uma mãe. Que mistério de humildade!", action: "Rezar uma Ave-Maria pelos nascituros" },
  { day: 5, verse: "Levanta-te, ó Jerusalém, e sobe ao monte.", reflection: "É tempo de subir, de elevar o coração. Deixa o vale do pecado.", action: "Fazer um ato de caridade hoje" },
  { day: 6, verse: "São Nicolau", reflection: "Hoje celebramos São Nicolau, o verdadeiro Papai Noel que dava tudo em segredo.", action: "Fazer uma doação anônima" },
  { day: 7, verse: "A Imaculada Conceição está próxima", reflection: "Maria foi preservada do pecado. Ela é a aurora do novo dia.", action: "Consagrar-se a Nossa Senhora" },
  { day: 8, verse: "Ó Maria, cheia de graça!", reflection: "Imaculada Conceição — Maria é a Tota Pulchra, toda bela.", action: "Rezar o Terço em família" },
  { day: 9, verse: "Nossa Senhora de Guadalupe", reflection: "Maria apareceu a Juan Diego com o rosto moreno. Ela ama cada povo.", action: "Honrar a Virgem de Guadalupe" },
  { day: 10, verse: "Gaudete! Alegrai-vos!", reflection: "Domingo da alegria. O Senhor está perto!", action: "Sorrir para alguém hoje" },
  { day: 11, verse: "São João da Cruz", reflection: "Noite escura da alma. Às vezes Deus se esconde para nos atrair mais.", action: "Oferecer um sacrifício com amor" },
  { day: 12, verse: "Nossa Senhora de Guadalupe (México)", reflection: "As rosas no tilma de Juan Diego são sinal do céu.", action: "Colocar uma rosa diante de uma imagem de Maria" },
  { day: 13, verse: "Santa Luzia, virgem e mártir", reflection: "Luzia levou luz aos cristãos nas catacumbas. Você é luz?", action: "Ajudar alguém que está nas trevas" },
  { day: 14, verse: "São João da Cruz", reflection: "Tudo passa, só Deus basta.", action: "Fazer um momento de silêncio interior" },
  { day: 15, verse: "A árvore genealógica de Jesus", reflection: "Jesus quis ter uma família humana, com santos e pecadores.", action: "Rezar por sua família" },
  { day: 16, verse: "Começa a Novena de Natal", reflection: "Faltam 9 dias! Hoje começa a reta final.", action: "Iniciar a Novena de Natal" },
  { day: 17, verse: "Ó Sabedoria!", reflection: "Primeira Antífona do Ó. Jesus é a Sabedoria eterna.", action: "Ler um trecho do livro da Sabedoria" },
  { day: 18, verse: "Ó Adonai!", reflection: "Senhor que guiaste Moisés na sarça ardente.", action: "Adorar Jesus no Santíssimo" },
  { day: 19, verse: "Ó Raiz de Jessé!", reflection: "Tu és o sinal levantado para os povos.", action: "Fazer um gesto de paz com alguém" },
  { day: 20, verse: "Ó Chave de Davi!", reflection: "Tu abres e ninguém fecha.", action: "Perdoar quem te feriu" },
  { day: 21, verse: "Ó Oriente!", reflection: "Sol nascente que vem nos visitar.", action: "Assistir o nascer do sol rezando" },
  { day: 22, verse: "Ó Rei das nações!", reflection: "Pedra angular que une os povos.", action: "Rezar pela paz no mundo" },
  { day: 23, verse: "Ó Emanuel!", reflection: "Deus conosco. Ele já está no meio de nós.", action: "Receber Jesus na Eucaristia" },
  { day: 24, verse: "Hoje nasce o Salvador!", reflection: "É Natal! O Menino Deus chegou. Aleluia!", action: "Cantar um cântico de Natal em família" }
].map(item => ({
  day: item.day,
  content: {
    verse: item.verse,
    reflection: item.reflection,
    action: item.action
  }
}));

const AdventoPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado das Velas agora lido do localStorage
  const [litCandles, setLitCandles] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem('fiat-advent-candles');
      return saved ? JSON.parse(saved) : [false, false, false, false];
    } catch (e) {
      return [false, false, false, false];
    }
  });

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  
  const [openedDoor, setOpenedDoor] = useState<number | null>(null);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth(); // 11 = Dezembro
  const isDecember = currentMonth === 11;

  const handleToggleCandle = (index: number) => {
    const newLit = [...litCandles];
    newLit[index] = !newLit[index];
    setLitCandles(newLit);
    
    // Salva no localStorage
    localStorage.setItem('fiat-advent-candles', JSON.stringify(newLit));
    
    if (newLit[index]) {
        setSelectedWeek(index);
        toast.success(`Vela do ${index + 1}º Domingo acesa!`, {
            icon: <Flame className="text-yellow-500" />
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2e1065] to-[#0f172a] text-white pb-32 animate-fade-in">
      <SEO title="Especial Advento 2025 – Coroa do Advento e Orações" description="Prepare-se para o Natal com a Coroa do Advento, orações diárias e calendário litúrgico." />
      
      {/* Header */}
      <div className="relative h-64 w-full overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2e1065]/60 to-[#1a0b2e]"></div>
         
         <div className="absolute top-0 left-0 w-full p-6 pt-12 z-20 flex justify-between items-start">
            <button onClick={() => navigate(-1)} className="p-2 bg-black/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                <ArrowLeft className="text-white" />
            </button>
         </div>

         <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-purple-500/20 border border-purple-400/30 rounded-full mb-4 animate-pulse-slow">
                <Star className="text-purple-300" fill="currentColor" size={20} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white drop-shadow-[0_2px_10px_rgba(147,51,234,0.5)] mb-2">
                Santo Advento
            </h1>
            <p className="text-purple-200/80 font-serif italic tracking-wide">Preparai o Caminho do Senhor</p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 space-y-12">
         
         {/* 1. COROA DO ADVENTO INTERATIVA */}
         <section>
             <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 p-8 rounded-3xl shadow-2xl text-center relative overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
                 <h2 className="text-xl font-serif text-white mb-8 relative z-10">Coroa do Advento</h2>
                 <div className="flex justify-center items-end gap-4 md:gap-8 h-48 mb-6 relative z-10">
                     {ADVENT_WEEKS.map((week, index) => (
                         <div key={index} className="flex flex-col items-center gap-2 group">
                             <div className={`transition-all duration-700 ${litCandles[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                 <div className="relative">
                                     <Flame size={32} className="text-yellow-400 animate-pulse" fill="currentColor" />
                                     <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-50 animate-pulse-slow"></div>
                                 </div>
                             </div>
                             <button 
                                onClick={() => handleToggleCandle(index)}
                                className={`w-8 md:w-12 rounded-t-lg transition-all duration-500 relative overflow-hidden border-b-0 border-white/20 shadow-lg
                                    ${week.candleColor} 
                                    ${litCandles[index] ? 'h-32 md:h-40 shadow-[0_0_30px_rgba(147,51,234,0.4)]' : 'h-32 md:h-40 opacity-60 hover:opacity-80'}
                                `}
                             >
                                 <div className="absolute top-0 left-0 w-full h-4 bg-white/10 rounded-t-lg"></div>
                                 <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                             </button>
                             <span className="text-[10px] uppercase font-bold text-purple-300/70">{index + 1}ª Sem</span>
                         </div>
                     ))}
                 </div>
                 {selectedWeek !== null && litCandles[selectedWeek] && (
                     <div className="mt-6 bg-purple-900/30 border border-purple-500/30 p-4 rounded-xl animate-slide-up">
                         <h3 className="text-purple-300 font-serif text-sm font-bold mb-2 uppercase tracking-widest">
                             {ADVENT_WEEKS[selectedWeek].title}
                         </h3>
                         <p className="text-white font-serif italic leading-relaxed text-sm">
                             "{ADVENT_WEEKS[selectedWeek].prayer}"
                         </p>
                     </div>
                 )}
                 {selectedWeek === null && (
                     <p className="text-xs text-gray-400 animate-pulse">Toque em uma vela para acender</p>
                 )}
             </div>
         </section>

         {/* 2. NOVENA DE NATAL (Destaque) */}
         <section>
             <div 
                onClick={() => navigate('/novena/novena-natal')}
                className="bg-gradient-to-r from-[#4a0404] to-[#2e1065] p-6 rounded-2xl border border-white/10 relative overflow-hidden group cursor-pointer shadow-lg hover:scale-[1.02] transition-transform"
             >
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                     <Gift size={100} />
                 </div>
                 <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-2">
                         <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">16 a 24 de Dez</span>
                     </div>
                     <h2 className="text-2xl font-serif text-white mb-1">Novena de Natal</h2>
                     <p className="text-gray-300 text-sm max-w-xs mb-4">Prepare o seu coração para o nascimento do Menino Jesus com meditações diárias.</p>
                     <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                         Começar Agora <ChevronRight size={14} />
                     </div>
                 </div>
             </div>
         </section>

         {/* 3. CALENDÁRIO DO ADVENTO */}
         <section>
             <div className="flex items-center gap-3 mb-6">
                 <Calendar className="text-purple-400" />
                 <h2 className="text-xl font-serif text-white">Calendário do Advento</h2>
             </div>
             
             <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                 {ADVENT_CALENDAR_DAYS.map((item) => {
                     const isLocked = !isDecember || item.day > today;
                     const isOpen = openedDoor === item.day;
                     
                     return (
                         <div key={item.day} className="relative aspect-square">
                             {isOpen ? (
  <div
    onClick={() => setOpenedDoor(null)}
    className="absolute inset-0 bg-white text-purple-900 rounded-xl p-3 flex flex-col justify-center text-center cursor-pointer animate-scale-in shadow-[0_0_30px_rgba(147,51,234,0.6)] z-50"
  >
    <BookOpen size={20} className="mx-auto mb-2 text-purple-600" />
    <div className="text-[10px] space-y-2 leading-tight font-serif">
      <p className="font-bold text-purple-900">"{item.content.verse}"</p>
      <p className="italic text-purple-700 text-[9px]">"{item.content.reflection}"</p>
      <p className="font-bold text-purple-800 underline mt-2">
        Hoje: {item.content.action}
      </p>
    </div>
  </div>
) : (
                                 <button 
                                    onClick={() => {
                                        if (isLocked) {
                                            toast.error(`Aguarde até dia ${item.day} de Dezembro!`);
                                        } else {
                                            setOpenedDoor(item.day);
                                            if (navigator.vibrate) navigator.vibrate(20);
                                        }
                                    }}
                                    className={`w-full h-full rounded-xl border flex flex-col items-center justify-center transition-all relative overflow-hidden
                                        ${isLocked 
                                            ? 'bg-[#1a0b2e] border-purple-900/50 text-gray-600' 
                                            : 'bg-gradient-to-br from-purple-800 to-purple-900 border-purple-500/50 text-white hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]'}
                                    `}
                                 >
                                     {isLocked && <Lock size={12} className="absolute top-2 right-2 opacity-50" />}
                                     <span className={`font-serif font-bold ${isLocked ? 'text-xl' : 'text-2xl'}`}>{item.day}</span>
                                     {!isLocked && <span className="text-[8px] uppercase tracking-widest opacity-70 mt-1">Abrir</span>}
                                 </button>
                             )}
                         </div>
                     );
                 })}
             </div>
         </section>

         {/* 4. ANTÍFONAS DO Ó (Reta Final) */}
         <section className="bg-[#1a0b2e] border border-purple-500/20 rounded-2xl p-6 text-center">
             <h3 className="text-purple-300 font-serif text-lg mb-2">Reta Final: As Antífonas do Ó</h3>
             <p className="text-gray-400 text-xs mb-4 px-4">De 17 a 23 de dezembro, a Igreja clama com títulos messiânicos.</p>
             <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-900/50 w-full" onClick={() => navigate('/calendar')}>
                 Ver Liturgia Diária
             </Button>
         </section>

         <div className="h-8"></div>
      </div>
    </div>
  );
};

export default AdventoPage;
