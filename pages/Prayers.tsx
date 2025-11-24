import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Card, Input, Button } from '../ui/UIComponents';
import { PRAYERS, NOVENAS } from '../constants';
import { Search, Heart, Book, X, Copy, Calendar } from 'lucide-react';
import { toggleFavorite } from '../services/storage';
import { toast } from 'sonner';
import { Prayer } from '../types';
import { useNavigate } from 'react-router-dom';

const PrayersPage: React.FC = () => {
  const { profile, updateProfile } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const navigate = useNavigate();

  const filteredPrayers = useMemo(() => PRAYERS.filter(p => (selectedCategory === 'all' || p.category === selectedCategory) && (p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))), [search, selectedCategory]);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'Basic', label: 'Básicas' },
    { id: 'Marian', label: 'Marianas' },
    { id: 'Novena', label: 'Novenas' },
    { id: 'Saint', label: 'Santos' },
    { id: 'Other', label: 'Outras' }
  ];
  
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Qualquer Época'];

  const handleLike = (e: React.MouseEvent, id: string) => { e.stopPropagation(); const newFavs = toggleFavorite(id); updateProfile({ ...profile, favorites: newFavs }); toast.success(newFavs.includes(id) ? 'Salvo nos favoritos' : 'Removido dos favoritos'); };
  const handleCopy = () => { if (selectedPrayer) { navigator.clipboard.writeText(`${selectedPrayer.title}\n\n${selectedPrayer.content}`); toast.success('Oração copiada!'); } };

  return (
    <>
      <div className="p-6 min-h-full pb-24 animate-fade-in">
        <div className="flex flex-col items-center mb-8 pt-4">
            <h1 className="text-3xl font-serif text-fiat-gold text-center drop-shadow-md tracking-wide uppercase border-b pb-4 border-fiat-gold/20 w-full">
              Tesouro de Orações
            </h1>
            <div className="w-2 h-2 bg-fiat-gold rounded-full mt-[-5px] ring-4 ring-[#05080f]"></div>
        </div>

        <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-fiat-gold/5 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Search className="absolute left-4 top-3.5 text-gray-500 w-4 h-4 z-10" />
            <Input 
              placeholder="Buscar oração..." 
              className="pl-11 bg-fiat-card-blue border-white/10 focus:border-fiat-gold h-12 relative z-10 rounded-xl text-sm" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
            {categories.map(cat => (
              <button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.id)} 
                  className={`whitespace-nowrap px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all border ${
                      selectedCategory === cat.id 
                      ? 'bg-fiat-gold text-fiat-navy border-fiat-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : 'bg-fiat-card-blue text-gray-400 border-white/5 hover:border-fiat-gold/30 hover:text-white'
                  }`}
              >
                  {cat.label}
              </button>
            ))}
        </div>

        {selectedCategory === 'Novena' ? (
          <div className="space-y-8">
             {months.map((month, index) => {
                const targetMonth = index === 12 ? 99 : index;
                const monthNovenas = NOVENAS.filter(n => n.month === targetMonth);
                
                if (monthNovenas.length === 0 && search === '') return null;
                if (search !== '' && !monthNovenas.some(n => n.title.toLowerCase().includes(search.toLowerCase()))) return null;
                return (
                  <div key={month} className="animate-slide-up">
                      <h2 className="text-fiat-gold font-serif text-lg mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-fiat-gold rounded-full"></span>{month}
                      </h2>
                      <div className="grid gap-3">
                          {monthNovenas.filter(n => search === '' || n.title.toLowerCase().includes(search.toLowerCase())).map(novena => (
                              <div key={novena.id} onClick={() => navigate(`/novena/${novena.id}`)} className="bg-fiat-card-blue p-4 rounded-xl border border-white/5 hover:border-fiat-gold/30 transition-all cursor-pointer flex items-center justify-between group hover:bg-white/5">
                                  <div>
                                      <h3 className="text-white font-serif group-hover:text-fiat-gold transition-colors">{novena.title}</h3>
                                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 uppercase tracking-wider">
                                          <Calendar size={10} /> {novena.startDateDisplay}
                                      </p>
                                  </div>
                                  <Button size="sm" variant="outline" className="text-[10px] h-7 border-white/10 text-gray-400 group-hover:border-fiat-gold group-hover:text-fiat-gold">
                                      REZAR
                                  </Button>
                              </div>
                          ))}
                      </div>
                  </div>
                );
             })}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrayers.map(prayer => (
                  <div key={prayer.id} onClick={() => setSelectedPrayer(prayer)} className="bg-fiat-card-blue rounded-xl p-5 border border-white/5 hover:border-fiat-gold/30 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg hover:shadow-xl">
                      <div className="flex justify-between items-start mb-4">
                           <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-fiat-gold/20 transition-colors">
                               <Book size={14} className="text-fiat-gold opacity-70" />
                           </div>
                           <button onClick={(e) => handleLike(e, prayer.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                               <Heart size={16} className={profile.favorites.includes(prayer.id) ? 'fill-red-500 text-red-500' : ''} />
                           </button>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-white group-hover:text-fiat-gold transition-colors mb-3 uppercase tracking-wide">
                          {prayer.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-serif italic leading-relaxed line-clamp-3 mb-4 border-l-2 border-white/5 pl-3 group-hover:border-fiat-gold/30 transition-colors">
                          {prayer.content}
                      </p>
                      <div className="flex items-center justify-end pt-2 border-t border-white/5">
                           <span className="text-[9px] text-fiat-gold font-bold uppercase tracking-widest flex items-center gap-1 opacity-70 group-hover:opacity-100">
                               Ler Completa <span className="w-1 h-1 bg-fiat-gold rounded-full animate-pulse"></span>
                           </span>
                      </div>
                  </div>
              ))}
          </div>
        )}

        {selectedCategory !== 'Novena' && filteredPrayers.length === 0 && (
          <div className="text-center py-20 text-gray-500 animate-fade-in">
              <Book size={48} className="mx-auto mb-4 opacity-20" />
              <p>Nenhuma oração encontrada.</p>
          </div>
        )}
      </div>

      {selectedPrayer && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setSelectedPrayer(null)} />
            <div className="bg-fiat-card-blue w-full sm:max-w-2xl h-[95vh] sm:h-[85vh] sm:rounded-2xl border border-fiat-gold/20 shadow-2xl relative flex flex-col overflow-hidden animate-slide-up">
                <div className="flex justify-between items-center p-4 border-b border-white/5 bg-black/20">
                     <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={(e) => handleLike(e, selectedPrayer.id)} className="text-gray-400 hover:text-red-500 hover:bg-white/5">
                            <Heart size={18} className={profile.favorites.includes(selectedPrayer.id) ? 'fill-red-500 text-red-500' : ''} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-gray-400 hover:text-fiat-gold hover:bg-white/5">
                            <Copy size={18} />
                        </Button>
                     </div>
                     <Button variant="ghost" size="sm" onClick={() => setSelectedPrayer(null)} className="hover:bg-white/5 text-gray-400 hover:text-white rounded-full p-2">
                        <X size={20} />
                     </Button>
                </div>
                <div className="overflow-y-auto flex-1 p-8 custom-scrollbar relative bg-gradient-to-b from-fiat-card-blue to-[#0a0f1a]">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-lg mx-auto pb-10">
                        <div className="space-y-2 w-full border-b border-white/5 pb-6">
                            <div className="w-12 h-12 mx-auto bg-fiat-gold/5 rounded-full flex items-center justify-center border border-fiat-gold/10 mb-4">
                                <Book size={20} className="text-fiat-gold" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif text-fiat-gold drop-shadow-sm leading-tight uppercase tracking-wide">
                                {selectedPrayer.title}
                            </h2>
                            {selectedPrayer.latin && (
                                <p className="text-xs text-gray-500 italic font-serif">"{selectedPrayer.latin}"</p>
                            )}
                        </div>
                        <div className="text-lg text-gray-300 font-serif leading-loose whitespace-pre-wrap text-justify sm:text-center relative">
                            <span className="text-5xl float-left mr-3 mt-[-10px] text-fiat-gold font-serif opacity-50">{selectedPrayer.content.charAt(0)}</span>
                            {selectedPrayer.content.slice(1)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default PrayersPage;