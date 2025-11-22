
import React, { useState, useContext } from 'react';
import Rosary from '../ui/Rosary';
import { MYSTERIES, DEVOTIONAL_ROSARIES } from '../constants';
import { Button } from '../ui/UIComponents';
import { ChevronRight, X, Heart, Copy, Play } from 'lucide-react';
import { DevotionalRosary } from '../types';
import { AppContext } from '../App';
import { toggleFavorite } from '../services/storage';
import { toast } from 'sonner';
import { IconRosary } from '../ui/Icons';
import { initAudio } from '../services/audio';

const VOICES = {
  female: { name: "Voz Mariana ♡" },
  male: { name: "Voz Sacerdotal ✝️" }
};

const RosaryPage: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [selectedDevotional, setSelectedDevotional] = useState<DevotionalRosary | null>(null);
  const { profile, updateProfile } = useContext(AppContext);
  const [selectedVoice, setSelectedVoice] = useState<'female' | 'male'>((localStorage.getItem('fiat-rosary-voice') as 'female' | 'male') || 'female');
  const day = new Date().getDay();
  const mystery = MYSTERIES.find(m => m.days.includes(day)) || MYSTERIES[0];

  const handleComplete = () => { toast.success("Terço finalizado! Salve Maria Puríssima! ♡"); };
  const handleLike = (e: React.MouseEvent, id: string) => { e.stopPropagation(); const newFavs = toggleFavorite(id); updateProfile({ ...profile, favorites: newFavs }); toast.success(newFavs.includes(id) ? 'Adicionado aos favoritos ♡' : 'Removido dos favoritos'); };
  const handleCopy = () => { if (selectedDevotional) { navigator.clipboard.writeText(`${selectedDevotional.title}\n\n${selectedDevotional.content}`); toast.success('Terço copiado!'); } };
  const changeVoice = (voice: 'female' | 'male') => { setSelectedVoice(voice); localStorage.setItem('fiat-rosary-voice', voice); toast.success(`Voz alterada para: ${VOICES[voice].name}`); };

  const handleStart = () => {
    // Inicializa o áudio na interação do usuário para desbloquear o som no navegador
    initAudio();
    setStarted(true);
  };

  if (started) return <Rosary mystery={mystery} onComplete={handleComplete} voice={selectedVoice} />;

  return (
    <div className="h-full flex flex-col p-6 relative overflow-y-auto pb-32">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1560116422-196535370997?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-25 pointer-events-none mix-blend-luminosity"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-sacred-sapphire/95 via-sacred-sapphire/80 to-sacred-sapphire/95 pointer-events-none"></div>
      <div className="relative z-10 space-y-8 max-w-md mx-auto w-full pt-4">
        <div className="bg-white/5 backdrop-blur-xl border border-sacred-gold/20 rounded-2xl p-5 text-center space-y-4 animate-fade-in">
          <p className="text-sacred-gold/80 text-xs uppercase tracking-widest">Escolha a voz que guiará sua oração</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => changeVoice('female')} className={`px-6 py-3 rounded-xl font-serif text-sm transition-all border-2 ${selectedVoice === 'female' ? 'bg-sacred-gold/20 border-sacred-gold text-sacred-gold shadow-lg shadow-sacred-gold/20' : 'border-white/20 text-gray-400 hover:border-sacred-gold/40'}`}><Heart className="inline mr-2" size={16} />Voz Mariana</button>
            <button onClick={() => changeVoice('male')} className={`px-6 py-3 rounded-xl font-serif text-sm transition-all border-2 ${selectedVoice === 'male' ? 'bg-sacred-gold/20 border-sacred-gold text-sacred-gold shadow-lg shadow-sacred-gold/20' : 'border-white/20 text-gray-400 hover:border-sacred-gold/40'}`}><span className="mr-2">✝️</span>Voz Sacerdotal</button>
          </div>
        </div>
        <div className="text-center space-y-8 animate-fade-in">
          <div><h2 className="text-sacred-gold text-xs uppercase tracking-[0.3em] mb-3 opacity-90">Liturgia de Hoje</h2><h1 className="text-3xl md:text-4xl font-serif text-white mb-2 drop-shadow-lg leading-tight">{mystery.name}</h1><p className="text-gray-300 text-sm font-light font-serif italic">"Eis a serva do Senhor, faça-se em mim segundo a vossa palavra."</p></div>
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center group cursor-pointer" onClick={handleStart}><div className="absolute inset-0 rounded-full border border-sacred-gold/20 bg-sacred-gold/5 animate-pulse-slow shadow-[0_0_50px_rgba(212,175,55,0.15)]"></div><div className="w-40 h-40 rounded-full overflow-hidden border-2 border-sacred-gold/30 relative z-10 shadow-2xl bg-gradient-to-br from-black/60 to-sacred-sapphire flex items-center justify-center backdrop-blur-sm"><IconRosary size={80} className="text-sacred-gold opacity-80 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-700" /></div><div className="absolute z-20 bg-sacred-gold/90 text-sacred-sapphire rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm border border-white/20"><Play size={24} fill="currentColor" /></div></div>
          <Button variant="sacred" size="lg" onClick={handleStart} className="w-full max-w-xs shadow-[0_0_20px_rgba(212,175,55,0.3)] py-6 text-base tracking-wider font-serif">INICIAR ORAÇÃO</Button>
        </div>
        <div className="pt-8 border-t border-white/10 animate-slide-up">
          <div className="flex items-center gap-4 mb-6 opacity-80"><div className="h-px flex-1 bg-gradient-to-r from-transparent to-sacred-gold/40"></div><h3 className="text-sacred-gold font-serif text-sm tracking-widest uppercase">Terços Devocionais</h3><div className="h-px flex-1 bg-gradient-to-l from-transparent to-sacred-gold/40"></div></div>
          <div className="grid grid-cols-1 gap-3">{DEVOTIONAL_ROSARIES.map(rosary => (<div key={rosary.id} onClick={() => setSelectedDevotional(rosary)} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-sacred-gold/30 p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between group"><div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-sacred-gold/70 group-hover:text-sacred-gold border border-white/5 group-hover:border-sacred-gold/20 transition-colors"><div className="w-2 h-2 bg-current rounded-full shadow-[0_0_5px_currentColor]"></div></div><div><span className="font-medium text-white group-hover:text-sacred-gold transition-colors block">{rosary.title}</span><span className="text-[10px] text-gray-500 font-serif italic">Devoção particular</span></div></div><ChevronRight size={16} className="text-gray-600 group-hover:text-sacred-gold transition-colors" /></div>))}</div>
        </div>
      </div>
      {selectedDevotional && (<div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 animate-fade-in"><div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setSelectedDevotional(null)} /><div className="bg-[#0f172a] w-full sm:max-w-2xl h-[95vh] sm:h-[85vh] sm:rounded-2xl border-t sm:border border-sacred-gold/30 shadow-2xl relative flex flex-col overflow-hidden animate-slide-up"><div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40 backdrop-blur-xl"><div className="flex gap-1"><Button variant="ghost" onClick={(e) => handleLike(e, selectedDevotional.id)}><Heart size={20} className={profile.favorites.includes(selectedDevotional.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} /></Button><Button variant="ghost" onClick={handleCopy}><Copy size={20} className="text-gray-400" /></Button></div><Button variant="ghost" onClick={() => setSelectedDevotional(null)}><X size={24} /></Button></div><div className="overflow-y-auto flex-1 p-6 sm:p-10 custom-scrollbar bg-gradient-to-b from-[#0f172a] to-[#0a0f1d]"><div className="flex flex-col items-center text-center space-y-8 max-w-lg mx-auto pb-10"><div className="space-y-2"><h2 className="text-2xl md:text-3xl font-serif text-sacred-gold drop-shadow-lg">{selectedDevotional.title}</h2><p className="text-sm text-gray-400 italic font-serif">{selectedDevotional.description}</p></div><div className="text-lg text-slate-200 font-serif leading-loose whitespace-pre-wrap text-left w-full">{selectedDevotional.content}</div></div></div></div></div>)}
    </div>
  );
};

export default RosaryPage;
