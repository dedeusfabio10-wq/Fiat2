import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../ui/UIComponents';
import { AppContext } from '../contexts/AppContext';
import { NOVENAS, SAINTS } from '../constants';
import { Search, Heart, Calendar as CalendarIcon, BookOpen, X, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { toggleFavorite } from '../services/storage';
import { SaintIcon } from '../ui/SaintIcons';
import { getDailyLiturgy } from '../data/liturgy';
import { LiturgyReading, DailyLiturgy } from '../types';

const CalendarPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'liturgy' | 'saints'>('liturgy');
  const { profile, updateProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedReading, setSelectedReading] = useState<LiturgyReading | null>(null);
  
  // Liturgy State
  const [dailyLiturgy, setDailyLiturgy] = useState<DailyLiturgy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiturgy = async () => {
      setIsLoading(true);
      const data = await getDailyLiturgy();
      setDailyLiturgy(data);
      setIsLoading(false);
    };
    fetchLiturgy();
  }, []);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const upcomingNovenas = NOVENAS.filter(novena => {
    if (novena.month === undefined) return false;
    const m = novena.month;
    const c = currentMonth;
    return m === c || m === (c + 1) % 12 || m === (c + 2) % 12;
  }).sort((a, b) => {
    const diffA = (a.month! - currentMonth + 12) % 12;
    const diffB = (b.month! - currentMonth + 12) % 12;
    return diffA - diffB;
  });

  const [saintSearch, setSaintSearch] = useState('');
  const filteredSaints = SAINTS.filter(s => s.name.toLowerCase().includes(saintSearch.toLowerCase()));

  const handleSubscribe = (id: string) => { navigate(`/novena/${id}`); };
  const handleLikeSaint = (id: string) => { const newFavs = toggleFavorite(id); updateProfile({ ...profile, favorites: newFavs }); };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'purple': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'red': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'rose': return 'text-pink-500 bg-pink-500/10 border-pink-500/20';
      case 'white': default: return 'text-white bg-white/10 border-white/20';
    }
  };

  // Determine card background color based on theme (used for Saints tab)
  const themeCardColor = useMemo(() => {
    switch (profile.customTheme) {
      case 'purple': return 'bg-[#2e1065]';
      case 'rose': return 'bg-[#831843]';
      case 'white': return 'bg-slate-700';
      case 'green': default: return 'bg-fiat-card-green';
    }
  }, [profile.customTheme]);

  // Dynamic Styles based on Liturgical Color for the Liturgy Tab
  const liturgyStyles = useMemo(() => {
    if (!dailyLiturgy) return {
        cardBg: themeCardColor,
        accentText: 'text-fiat-gold',
        border: 'border-white/5',
        subtleBg: 'bg-fiat-gold/5',
        iconColor: 'text-fiat-gold'
    };
    
    switch (dailyLiturgy.color) {
      case 'green': return { 
        cardBg: 'bg-gradient-to-br from-[#0c2b1e] to-[#05140e]', 
        accentText: 'text-green-400', 
        border: 'border-green-500/30',
        subtleBg: 'bg-green-500/10',
        iconColor: 'text-green-400'
      };
      case 'purple': return { 
        cardBg: 'bg-gradient-to-br from-[#2e1065] to-[#170636]', 
        accentText: 'text-purple-400', 
        border: 'border-purple-500/30',
        subtleBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400'
      };
      case 'red': return { 
        cardBg: 'bg-gradient-to-br from-[#450a0a] to-[#210303]', 
        accentText: 'text-red-500', 
        border: 'border-red-500/30',
        subtleBg: 'bg-red-500/10',
        iconColor: 'text-red-500'
      };
      case 'rose': return { 
        cardBg: 'bg-gradient-to-br from-[#831843] to-[#450a22]', 
        accentText: 'text-pink-400', 
        border: 'border-pink-500/30',
        subtleBg: 'bg-pink-500/10',
        iconColor: 'text-pink-400'
      };
      default: return { // White/Gold
        cardBg: 'bg-gradient-to-br from-[#27272a] to-[#18181b]', 
        accentText: 'text-yellow-400', 
        border: 'border-yellow-500/30',
        subtleBg: 'bg-yellow-500/10',
        iconColor: 'text-yellow-400'
      };
    }
  }, [dailyLiturgy, themeCardColor]);

  return (
    <div className="p-6 pb-24 min-h-full">
      <div className="flex items-center justify-between mb-8 pt-2 border-b border-white/5 pb-4">
        <h1 className="text-2xl font-serif text-white tracking-wide">SACRO CALENDÁRIO</h1>
        <div className="flex bg-fiat-card-blue rounded-lg p-1 border border-white/5">
          <button onClick={() => setActiveTab('liturgy')} className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'liturgy' ? 'bg-fiat-gold text-fiat-navy shadow-sm' : 'text-gray-400 hover:text-white'}`}>Liturgia</button>
          <button onClick={() => setActiveTab('saints')} className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${activeTab === 'saints' ? 'bg-fiat-gold text-fiat-navy shadow-sm' : 'text-gray-400 hover:text-white'}`}>Santos</button>
        </div>
      </div>

      {activeTab === 'liturgy' ? (
        <div className="animate-fade-in space-y-6">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20 space-y-4">
                 <Loader2 size={32} className="text-fiat-gold animate-spin" />
                 <p className="text-xs text-gray-500 uppercase tracking-widest">Carregando Liturgia...</p>
             </div>
          ) : dailyLiturgy && (
            <>
              {/* Santo do Dia Card (Dynamic Color) */}
              <div className={`${liturgyStyles.cardBg} rounded-2xl p-6 border ${liturgyStyles.border} shadow-xl relative overflow-hidden transition-all duration-700`}>
                 {/* Glow Effect specific to color */}
                 <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 opacity-20 ${liturgyStyles.subtleBg.replace('/10','/50')}`}></div>
                 
                 <div className="relative z-10 flex gap-5 items-center">
                    <div className={`w-20 h-24 bg-black/20 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-white/10 shadow-inner`}>
                       <SaintIcon id="generic" className={`w-10 h-10 opacity-90 ${liturgyStyles.iconColor}`} />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <Sparkles size={12} className={liturgyStyles.accentText} />
                          <span className={`${liturgyStyles.accentText} text-[10px] font-bold uppercase tracking-widest`}>Santo do Dia</span>
                       </div>
                       <h2 className="text-xl font-serif text-white leading-tight uppercase tracking-wide">{dailyLiturgy.saint || 'Dia Ferial'}</h2>
                       <p className="text-xs text-gray-300 mt-2 line-clamp-2 font-serif italic opacity-80">
                          {dailyLiturgy.saint ? `Memória de ${dailyLiturgy.saint}.` : 'Tempo Comum.'}
                       </p>
                    </div>
                 </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={16} className={liturgyStyles.accentText} />
                    <h3 className={`${liturgyStyles.accentText} font-serif text-sm tracking-[0.2em] uppercase font-bold`}>Missal do Dia</h3>
                </div>
                
                {/* Missal Card - Dynamic Color */}
                <div className={`${liturgyStyles.cardBg} rounded-2xl border ${liturgyStyles.border} overflow-hidden shadow-lg transition-all duration-700`}>
                  <div className="p-5 border-b border-white/5 bg-black/20">
                      <h4 className="text-white font-serif text-sm mb-3 leading-relaxed uppercase">{dailyLiturgy.title}</h4>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${getColorClass(dailyLiturgy.color)}`}>
                          Cor Litúrgica: {dailyLiturgy.color === 'green' ? 'Verde' : dailyLiturgy.color === 'purple' ? 'Roxo' : dailyLiturgy.color === 'rose' ? 'Rosa' : dailyLiturgy.color === 'red' ? 'Vermelho' : 'Branco'}
                      </span>
                  </div>
                  <div className="divide-y divide-white/5">
                    <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between group" onClick={() => setSelectedReading(dailyLiturgy.readings.firstReading)}>
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${liturgyStyles.accentText}`}>1ª Leitura</p>
                            <p className="text-sm text-gray-300 font-serif">{dailyLiturgy.readings.firstReading.reference}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
                    </div>
                    <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between group" onClick={() => setSelectedReading(dailyLiturgy.readings.psalm)}>
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${liturgyStyles.accentText}`}>Salmo Responsorial</p>
                            <p className="text-sm text-gray-300 font-serif">{dailyLiturgy.readings.psalm.reference}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white" />
                    </div>
                    <div className={`p-4 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between group ${liturgyStyles.subtleBg}`} onClick={() => setSelectedReading(dailyLiturgy.readings.gospel)}>
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${liturgyStyles.accentText}`}>Evangelho</p>
                            <p className="text-sm text-white font-serif font-medium">{dailyLiturgy.readings.gospel.reference}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-white/10`}>
                            <BookOpen size={14} className={liturgyStyles.accentText} />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="pt-6 border-t border-white/5 mt-4">
            <div className="flex flex-col items-center justify-center mb-6">
                <h2 className="text-lg font-serif text-gray-400 font-bold uppercase tracking-[0.3em]">{monthNames[currentMonth]}</h2>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-8">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="text-[10px] text-gray-600 font-bold py-2">{d}</div>)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                  <div key={day} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium relative transition-all ${
                      day === currentDay 
                      ? 'bg-fiat-gold text-fiat-navy shadow-[0_0_10px_#d4af37] scale-110 z-10 font-bold' 
                      : 'bg-fiat-card-blue text-gray-500 hover:bg-white/5 border border-white/5'
                  }`}>
                      {day}
                      {day % 7 === 0 && <div className="absolute bottom-1.5 w-1 h-1 bg-red-500 rounded-full" />}
                  </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Novenas Recomendadas</h3>
            <div className="space-y-3">
              {upcomingNovenas.map(novena => {
                const isActive = profile.active_novenas.some(n => n.novenaId === novena.id);
                return (
                  <div key={novena.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${isActive ? 'bg-fiat-card-green border-fiat-gold/30' : 'bg-fiat-card-blue border-white/5'}`} onClick={() => handleSubscribe(novena.id)}>
                    <div className="flex-1">
                        <h4 className={`font-serif text-sm ${isActive ? 'text-fiat-gold' : 'text-white'}`}>{novena.title}</h4>
                        <p className="text-[10px] text-gray-500 mt-1 line-clamp-1 uppercase tracking-wide">{novena.startDateDisplay} • {novena.description}</p>
                    </div>
                    <Button size="sm" variant={isActive ? 'sacred' : 'outline'} className="text-[10px] h-7 px-3 border-white/10">
                        {isActive ? 'REZAR' : 'VER'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in space-y-6">
          <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-500 w-4 h-4" />
              <Input placeholder="Buscar Santo..." className="pl-11 bg-fiat-card-blue border-white/5 h-12 rounded-xl" value={saintSearch} onChange={e => setSaintSearch(e.target.value)} />
          </div>
          <div className="grid gap-4">
            {filteredSaints.map(saint => {
              const isFav = profile.favorites.includes(saint.id);
              return (
                <div key={saint.id} className={`flex gap-4 ${themeCardColor} p-5 rounded-xl border border-white/5 hover:border-fiat-gold/20 transition-all group shadow-lg`}>
                  <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center border border-white/10 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <SaintIcon id={saint.id} className="w-6 h-6 text-fiat-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-serif text-white font-bold text-sm uppercase tracking-wide group-hover:text-fiat-gold transition-colors">{saint.name}</h3>
                        <button onClick={() => handleLikeSaint(saint.id)} className="p-1 hover:bg-white/10 rounded-full -mt-1 -mr-1">
                            <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
                        </button>
                    </div>
                    <p className="text-[9px] text-fiat-gold font-bold uppercase tracking-widest mb-2 mt-1">{saint.date} • {saint.title}</p>
                    <p className="text-xs text-gray-300 line-clamp-2 mb-3 font-serif leading-relaxed opacity-90">{saint.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedReading && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedReading(null)}>
          <div className="bg-fiat-card-blue rounded-2xl border border-fiat-gold/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fiat-gold to-transparent opacity-50"></div>
            <div className="p-8 relative">
              <button onClick={() => setSelectedReading(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
              
              <div className="text-center mb-8">
                  <div className="w-12 h-12 mx-auto bg-fiat-gold/10 rounded-full flex items-center justify-center mb-4 border border-fiat-gold/20">
                      <BookOpen size={20} className="text-fiat-gold" />
                  </div>
                  <h2 className="text-2xl font-serif text-white mb-2 uppercase tracking-wide leading-snug">{selectedReading.title}</h2>
                  <p className="text-sm text-fiat-gold font-bold uppercase tracking-widest">{selectedReading.reference}</p>
              </div>
              
              {selectedReading.title.includes('Evangelho') && (
                  <p className="text-center font-serif italic text-gray-400 text-sm mb-8 border-y border-white/5 py-3 mx-8">
                      PROCLAMAÇÃO DO EVANGELHO DE JESUS CRISTO<br />SEGUNDO {selectedReading.reference.split(' ')[0].toUpperCase()}
                  </p>
              )}
              
              <div className="text-gray-200 text-base leading-loose space-y-4 font-serif text-justify opacity-90 px-2 md:px-6">
                  {selectedReading.text.split('\n\n').map((paragrafo, i) => <p key={i}>{paragrafo.trim()}</p>)}
              </div>
              
              {selectedReading.title.includes('Evangelho') && (
                  <p className="text-fiat-gold text-center font-serif italic text-sm mt-8 opacity-80">— Glória a vós, Senhor!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;