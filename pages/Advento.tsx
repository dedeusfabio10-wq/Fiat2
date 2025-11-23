
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Calendar, Star, Lock, ChevronRight, BookOpen, Gift } from 'lucide-react';
import { Button, Card } from '../ui/UIComponents';
import { toast } from 'sonner';

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

const ADVENT_CALENDAR_DAYS = Array.from({ length: 24 }, (_, i) => ({
  day: i + 1,
  content: {
    verse: "E o Verbo se fez carne e habitou entre nós.",
    reflection: "Hoje, prepare uma manjedoura em seu coração. O que você pode oferecer a Jesus?",
    action: "Rezar uma Ave-Maria pelos nascituros."
  }
}));

const AdventoPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado das Velas (simulado para demonstração, idealmente persistido)
  const [litCandles, setLitCandles] = useState<boolean[]>([false, false, false, false]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  
  // Estado do Calendário
  const [openedDoor, setOpenedDoor] = useState<number | null>(null);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth(); // 11 = Dezembro
  
  // Lógica simplificada: Em produção, validar se é Dezembro.
  // Para teste, vamos assumir que estamos em Dezembro ou permitir abrir tudo.
  const isDecember = currentMonth === 11 || currentMonth === 10; // Permitindo Nov para teste

  const toggleCandle = (index: number) => {
    const newLit = [...litCandles];
    newLit[index] = !newLit[index];
    setLitCandles(newLit);
    
    if (newLit[index]) {
        setSelectedWeek(index);
        toast.success(`Vela do ${index + 1}º Domingo acesa!`, {
            icon: <Flame className="text-yellow-500" />
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2e1065] to-[#0f172a] text-white pb-32 animate-fade-in">
      
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
                 {/* Glow de fundo */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

                 <h2 className="text-xl font-serif text-white mb-8 relative z-10">Coroa do Advento</h2>
                 
                 <div className="flex justify-center items-end gap-4 md:gap-8 h-48 mb-6 relative z-10">
                     {ADVENT_WEEKS.map((week, index) => (
                         <div key={index} className="flex flex-col items-center gap-2 group">
                             {/* Chama (Flame) */}
                             <div className={`transition-all duration-700 ${litCandles[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                 <div className="relative">
                                     <Flame size={32} className="text-yellow-400 animate-pulse" fill="currentColor" />
                                     <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-50 animate-pulse-slow"></div>
                                 </div>
                             </div>
                             
                             {/* Vela */}
                             <button 
                                onClick={() => toggleCandle(index)}
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

                 {/* Oração da Vela Acesa */}
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
                                    className="absolute inset-0 bg-white text-purple-900 rounded-xl p-2 flex flex-col items-center justify-center text-center cursor-pointer animate-scale-in shadow-[0_0_20px_rgba(255,255,255,0.3)] z-10"
                                 >
                                     <BookOpen size={16} className="mb-1 opacity-50" />
                                     <p className="text-[8px] leading-tight font-serif line-clamp-3 font-bold">"{item.content.verse}"</p>
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
