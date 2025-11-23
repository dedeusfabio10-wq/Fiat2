
import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from '../ui/UIComponents';
import { ChevronRight, Sun, Cross, Gift, Flame, Star } from 'lucide-react';
import { DAILY_QUOTES, MYSTERIES } from '../constants';
import { IconRosary } from '../ui/Icons';

const HomePage: React.FC = () => {
  const { profile, themeColors } = useContext(AppContext);
  const navigate = useNavigate();

  const greeting = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // Lógica programada: Ano Novo (26/12 a 06/01)
    if ((month === 11 && day > 25) || (month === 0 && day <= 6)) {
        return "Próspero Ano Novo";
    }
    // Natal
    if ((month === 11 && day >= 25)) {
        return "Feliz Natal";
    }
    // Advento
    if ((month === 10 && day >= 25) || (month === 11 && day <= 24)) {
        return "Santo Advento";
    }

    return "Salve Maria";
  }, []);

  const todayMystery = useMemo(() => {
    const day = new Date().getDay();
    return MYSTERIES.find(m => m.days.includes(day)) || MYSTERIES[0];
  }, []);

  const dailyQuote = useMemo(() => DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)], []);
  const activeNovena = profile.active_novenas[0] || null;
  const isSaturday = new Date().getDay() === 6;
  
  // Is Advent?
  const isAdvent = new Date().getMonth() === 10 || new Date().getMonth() === 11; // Nov/Dec

  // Determine card background color based on theme
  const themeCardColor = useMemo(() => {
    switch (profile.customTheme) {
      case 'purple': return 'bg-[#2e1065]';
      case 'rose': return 'bg-[#831843]';
      case 'white': return 'bg-slate-700';
      case 'green': default: return 'bg-fiat-card-green';
    }
  }, [profile.customTheme]);

  return (
    <div className="p-6 space-y-6 animate-fade-in pb-32">
      <div className="flex justify-between items-start pt-4">
        <div>
          <h1 className="text-xl font-serif text-white leading-tight tracking-wide flex items-center gap-2">
            {greeting.toUpperCase()} {greeting.includes('Advento') ? <Star size={18} className="text-purple-400 animate-pulse"/> : <Gift size={18} className="text-red-500 animate-pulse" />}, <br/>
            <span style={{ color: themeColors.primary }} className="font-bold text-2xl tracking-wider">{profile.name?.toUpperCase() || 'ALMA DEVOTA'}</span>
          </h1>
          <p className="text-[10px] text-fiat-gold/80 mt-2 font-sans uppercase tracking-[0.2em] border-l-2 border-fiat-gold pl-2">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        {profile.streak > 0 && (
          <div className="bg-white/5 px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 backdrop-blur-md">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-white">{profile.streak} dias</span>
          </div>
        )}
      </div>

      <div className="relative py-6 px-2 text-center">
        <p className="text-base italic text-white/90 px-6 font-serif leading-relaxed tracking-wide">
          "{dailyQuote.text}"
        </p>
        <p className="text-xs mt-3 font-bold uppercase tracking-[0.2em]" style={{ color: themeColors.primary }}>
          — {dailyQuote.author}
        </p>
      </div>
      
      {/* Cenáculo Card */}
      <div 
        onClick={() => navigate('/cenaculo')}
        className={`relative overflow-hidden rounded-2xl p-1 cursor-pointer group transition-all ${isSaturday ? 'animate-pulse-slow' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-amber-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 relative flex items-center justify-between border border-red-500/30">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <Flame size={24} className="text-white animate-pulse" />
                </div>
                <div>
                    <h3 className="text-white font-serif text-lg font-bold">Cenáculo com Maria</h3>
                    <p className="text-xs text-red-200 uppercase tracking-wider font-medium">
                        {isSaturday ? 'Reze conosco hoje!' : 'Todo sábado'}
                    </p>
                </div>
            </div>
            <ChevronRight className="text-red-300" />
        </div>
      </div>

      {/* ADVENTO CARD (Conditional) */}
      {isAdvent && (
          <div 
            onClick={() => navigate('/advento')}
            className="relative overflow-hidden rounded-2xl p-1 cursor-pointer group transition-all shadow-lg shadow-purple-900/20 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#581c87]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            
            <div className="bg-black/10 backdrop-blur-sm rounded-xl p-5 relative flex items-center justify-between border border-purple-400/30">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500">
                        <Star size={24} className="text-yellow-300 animate-pulse" fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-white font-serif text-xl font-bold">Especial Advento</h3>
                        <p className="text-xs text-purple-200 uppercase tracking-wider font-medium flex items-center gap-1">
                            Coroa & Calendário <ChevronRight size={10} />
                        </p>
                    </div>
                </div>
            </div>
          </div>
      )}

      {/* Main Rosary Card */}
      <div 
        onClick={() => navigate('/rosary')} 
        className={`relative overflow-hidden rounded-2xl ${themeCardColor} border border-white/5 p-6 shadow-2xl cursor-pointer group transition-all hover:scale-[1.01]`}
      >
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-20">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-widest border border-white/10">
              Liturgia de Hoje
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 animate-pulse-slow">
               <IconRosary size={18} className="text-white opacity-90" />
            </div>
          </div>
          
          <h2 className="text-3xl font-serif text-white leading-none mb-2 drop-shadow-md uppercase tracking-wide">
            {todayMystery.name}
          </h2>
          <p className="text-sm text-gray-300 line-clamp-2 mb-6 font-medium leading-relaxed opacity-80">
            Meditamos os mistérios da vida de Cristo através do olhar de Maria.
          </p>
          
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em]" style={{ color: themeColors.primary }}>
            Rezar Agora <ChevronRight size={16} />
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => navigate('/prayers')} className={`${themeCardColor} p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors flex flex-col justify-between h-32 group`}>
          <Sun className="text-sacred-gold opacity-80 group-hover:scale-110 transition-transform" size={24} />
          <div>
             <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Diário</span>
             <span className="text-base font-serif text-white font-medium">Oração da Manhã</span>
          </div>
        </div>
        
        <div onClick={() => navigate('/viasacra')} className={`${themeCardColor} p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors flex flex-col justify-between h-32 relative overflow-hidden group`}>
          <div className="absolute right-0 top-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <Cross className="text-gray-300 opacity-80 group-hover:scale-110 transition-transform" size={24} />
          <div className="relative z-10">
             <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Quaresma</span>
             <span className="text-base font-serif text-white font-medium">Via Sacra</span>
          </div>
        </div>
      </div>

      {activeNovena ? (
          <div className="bg-gradient-to-r from-fiat-card-blue to-[#0a101f] p-5 rounded-2xl border border-blue-500/20 flex items-center gap-4 shadow-lg" onClick={() => navigate(`/novena/${activeNovena.novenaId}`)}>
             <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-400/30 relative">
               <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin-slow"></div>
               <span className="text-lg font-serif text-blue-200 font-bold">{activeNovena.currentDay}</span>
             </div>
             <div className="flex-1">
               <h3 className="text-white font-medium font-serif">Novena Ativa</h3>
               <p className="text-xs text-blue-200/70">Continue sua oração hoje</p>
             </div>
             <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-200 hover:bg-blue-900/50">Rezar</Button>
          </div>
      ) : (
         <div className="bg-fiat-card-blue p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer hover:border-sacred-gold/30 transition-colors" onClick={() => navigate('/calendar')}>
            <span className="text-gray-400 text-sm font-serif italic">Nenhuma novena ativa</span>
            <span className="text-sacred-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1">Iniciar <ChevronRight size={12}/></span>
         </div>
      )}
    </div>
  );
};

export default HomePage;
