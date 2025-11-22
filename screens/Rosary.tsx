import React, { useState, useEffect } from 'react';
import { Button, Card } from '../components/UiComponents';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, Music, X, RefreshCw } from 'lucide-react';

export const Rosary: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beadIndex, setBeadIndex] = useState(0);
  const [mysteryIndex, setMysteryIndex] = useState(0);
  
  // Expanded Data for Mysteries
  const mysteries = {
    name: "Mistérios Dolorosos",
    day: "Terça-feira e Sexta-feira",
    list: [
      { title: "Agonia de Jesus no Horto", scripture: "Pai, se queres, afasta de mim este cálice; contudo, não se faça a minha vontade, mas a tua." },
      { title: "A Flagelação de Jesus", scripture: "Então Pilatos mandou prender Jesus e açoitá-lo." },
      { title: "Coroação de Espinhos", scripture: "Teceram uma coroa de espinhos e puseram-lha na cabeça." },
      { title: "Jesus carrega a Cruz", scripture: "Jesus tomou a cruz sobre si e saiu para o lugar chamado Calvário." },
      { title: "Crucificação e Morte", scripture: "Jesus, dando um grande grito, expirou." }
    ]
  };

  const totalBeads = 10; // Per mystery for visual simplicity in this view
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setBeadIndex(prev => {
          if (prev >= 10) {
            setIsPlaying(false); // Pause at end of decade
            return 0;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentMystery = mysteries.list[mysteryIndex];

  return (
    <div className="pb-24 pt-6 px-4 min-h-screen bg-starry flex flex-col animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 relative">
        <h2 className="text-[10px] text-fiat-gold uppercase tracking-[0.3em] mb-2 opacity-80">{mysteries.day}</h2>
        <h1 className="font-serif text-2xl text-white mb-1 drop-shadow-lg">{mysteries.name}</h1>
        <p className="text-fiat-muted text-xs max-w-xs mx-auto">Meditamos sobre a Paixão de Nosso Senhor.</p>
      </div>

      {/* Main Visual */}
      <div className="flex-1 flex flex-col items-center justify-center relative mb-8">
        
        {/* Background Halo */}
        <div className="absolute w-64 h-64 bg-fiat-gold/5 rounded-full blur-3xl animate-pulse"></div>

        {/* Rosary Circle Visualization */}
        <div className="w-72 h-72 rounded-full border border-white/10 relative flex items-center justify-center backdrop-blur-sm bg-fiat-card/30 shadow-2xl">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle 
              cx="50" cy="50" r="48" 
              fill="none" 
              stroke="#d4af37" 
              strokeWidth="2"
              strokeDasharray="301.59"
              strokeDashoffset={301.59 - (301.59 * (beadIndex / 10))}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          
          <div className="text-center p-8 z-10">
            <span className="block text-[10px] text-fiat-gold mb-3 uppercase tracking-widest border border-fiat-gold/30 rounded-full px-2 py-0.5 w-fit mx-auto">
              {mysteryIndex + 1}º Mistério
            </span>
            <h3 className="font-serif text-lg text-white mb-4 leading-tight">{currentMystery.title}</h3>
            <p className="text-xs text-fiat-muted italic font-serif leading-relaxed opacity-80">"{currentMystery.scripture}"</p>
          </div>
        </div>

        {/* Beads Visual */}
        <div className="flex gap-1 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${i < beadIndex ? 'bg-fiat-gold shadow-[0_0_8px_#d4af37]' : i === beadIndex ? 'bg-white scale-150' : 'bg-white/10'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-sm mx-auto w-full space-y-6 bg-fiat-card/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between text-fiat-gold px-2">
           <button 
             onClick={() => { setMysteryIndex(Math.max(0, mysteryIndex - 1)); setBeadIndex(0); }} 
             className="p-2 hover:bg-white/5 rounded-full transition-colors disabled:opacity-30"
             disabled={mysteryIndex === 0}
           >
             <ChevronLeft />
           </button>
           <div className="text-center">
             <span className="text-xs text-fiat-muted uppercase block">Ave Maria</span>
             <span className="font-serif text-xl text-white">{beadIndex + 1}<span className="text-sm text-white/30">/10</span></span>
           </div>
           <button 
             onClick={() => { setMysteryIndex(Math.min(4, mysteryIndex + 1)); setBeadIndex(0); }}
             className="p-2 hover:bg-white/5 rounded-full transition-colors disabled:opacity-30"
             disabled={mysteryIndex === 4}
           >
             <ChevronRight />
           </button>
        </div>

        <div className="flex justify-center items-center gap-6">
           <button className="p-3 rounded-full bg-white/5 text-fiat-muted hover:text-white hover:bg-white/10 transition">
             <RefreshCw size={18} onClick={() => setBeadIndex(0)} />
           </button>
           <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-fiat-gold to-[#b8902b] text-fiat-navy shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
           >
             {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
           </button>
           <button className="p-3 rounded-full bg-white/5 text-fiat-muted hover:text-white hover:bg-white/10 transition">
             <Volume2 size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};