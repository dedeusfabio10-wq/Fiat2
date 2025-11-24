
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CATECHISM_CONTENT, SAINTS, APOSTOLIC_LINE, CHURCH_HISTORY, HOLY_MASS, CHURCH_HIERARCHY, CHURCH_MINISTRIES, MARIAN_DOGMAS, THE_APOSTLES, LITURGICAL_OBJECTS } from '../constants';
import { Button } from '../ui/UIComponents';
import PremiumModal from '../ui/PremiumModal';
import { Crown, Lock, ChevronDown, ChevronUp, BookOpen, Sparkles, Key, Shield, Landmark, Flame, Users, Heart, Bell, Music, Star, Grape, Circle, Cloud, Droplet, Sun, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SaintIcon } from '../ui/SaintIcons';

const CatechismPage: React.FC = () => {
  const { profile, updateProfile, isLoadingProfile } = useContext(AppContext);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Determine card background color based on theme
  const themeCardColor = useMemo(() => {
    switch (profile.customTheme) {
      case 'purple': return 'bg-[#2e1065]';
      case 'rose': return 'bg-[#831843]';
      case 'white': return 'bg-slate-700';
      case 'green': default: return 'bg-fiat-card-green';
    }
  }, [profile.customTheme]);

  // --- LOADING STATE ---
  if (isLoadingProfile) {
      return (
          <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="animate-spin text-sacred-gold w-8 h-8" />
          </div>
      );
  }

  if (!profile.is_premium) {
    return (
        <div className="p-6 flex flex-col items-center justify-center h-full min-h-[80vh] text-center space-y-8 animate-fade-in">
            <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-900 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.2)] animate-pulse-slow border-4 border-white/10">
                <Crown size={48} className="text-white" fill="currentColor" />
            </div>
            <div className="space-y-3">
                <h1 className="text-3xl font-serif text-sacred-gold drop-shadow-md">Catequese Católica</h1>
                <p className="text-gray-400 text-sm font-serif italic px-4 leading-relaxed">Aprofunde-se na Doutrina, nos Sacramentos e na vida dos Santos. Uma verdadeira escola de fé.</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-600/30 p-6 rounded-xl max-w-xs w-full">
                <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4 font-bold text-xs uppercase tracking-widest"><Lock size={14} /> Conteúdo Premium</div>
                <p className="text-sm text-gray-300 mb-6">Desbloqueie a Catequese, Planner e Voz Guiada.</p>
                <Button variant="sacred" className="w-full shadow-[0_0_20px_rgba(212,175,55,0.4)]" onClick={() => setShowPremiumModal(true)}>Obter Premium (R$ 4,90)</Button>
            </div>
        </div>
    );
  }

  const getMinistryIcon = (iconName: string) => {
    switch(iconName) {
      case 'Heart': return <Heart size={20} />;
      case 'Bell': return <Bell size={20} />;
      case 'Music': return <Music size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      case 'Users': return <Users size={20} />;
      case 'Key': return <Key size={20} />;
      case 'Crown': return <Crown size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Star': return <Star size={20} />;
      case 'Grape': return <Grape size={20} />;
      case 'Circle': return <Circle size={20} />;
      case 'Sun': return <Sun size={20} />;
      case 'Cloud': return <Cloud size={20} />;
      case 'Droplet': return <Droplet size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <div className="p-6 pb-32 min-h-screen animate-fade-in">
       <div className="flex justify-between items-center mb-8 pt-4 border-b border-white/5 pb-4">
           <div>
               <h1 className="text-2xl font-serif text-white tracking-wide">CATEQUESE</h1>
               <p className="text-[10px] text-fiat-gold uppercase tracking-[0.3em] font-bold">Crescer na Fé</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-fiat-card-green flex items-center justify-center border border-white/10">
               <BookOpen size={20} className="text-white" />
           </div>
       </div>
       <div className="space-y-4">
           {CATECHISM_CONTENT.map(section => (
               <div key={section.id} className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
                   <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                       <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider">{section.title}</h3>
                       {expandedSection === section.id ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
                   </div>
                   {expandedSection === section.id && (
                       <div className="p-5 pt-0 bg-black/10">
                           <div className="h-px w-full bg-white/5 mb-4"></div>
                           <div className="space-y-3">
                               {section.items.map(item => (
                                   <div key={item.id} className="bg-black/20 p-4 rounded-lg border border-white/5">
                                       <h4 className="text-fiat-gold font-bold text-xs uppercase tracking-widest mb-2">{item.title}</h4>
                                       <p className="text-gray-300 text-sm leading-relaxed font-serif italic opacity-90">{item.content}</p>
                                   </div>
                               ))}
                           </div>
                       </div>
                   )}
               </div>
           ))}
           
           {/* A Virgem Maria */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'maria' ? null : 'maria')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Crown size={18} className="text-fiat-gold" /> A Virgem Maria
                   </h3>
                   {expandedSection === 'maria' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'maria' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="mb-6 text-center px-4">
                            <p className="text-sm text-gray-300 italic font-serif">
                                "Deus quis servir-se de Maria na Encarnação e quer servir-se dela na santificação das almas." (São Luís Maria de Montfort)
                            </p>
                       </div>
                       <div className="space-y-6 relative z-10">
                           {MARIAN_DOGMAS.map((dogma) => (
                               <div key={dogma.id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-fiat-gold/30 transition-colors">
                                   <div className="flex items-center gap-3 mb-3">
                                       <div className="w-10 h-10 bg-fiat-gold/10 rounded-full flex items-center justify-center text-fiat-gold border border-fiat-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                                           {getMinistryIcon(dogma.icon)}
                                       </div>
                                       <h4 className="font-serif font-bold text-white text-lg leading-tight">{dogma.title}</h4>
                                   </div>
                                   <p className="text-sm text-gray-300 font-serif leading-relaxed pl-13 border-l-2 border-white/10 pl-4">
                                       {dogma.desc}
                                   </p>
                               </div>
                           ))}
                       </div>
                   </div>
               )}
           </div>

           {/* Os Santos Apóstolos */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'apostolos' ? null : 'apostolos')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Users size={18} className="text-fiat-gold" /> Os Santos Apóstolos
                   </h3>
                   {expandedSection === 'apostolos' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'apostolos' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="absolute left-[34px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-fiat-gold via-white/20 to-transparent opacity-30"></div>
                       <div className="space-y-6 relative z-10">
                           {THE_APOSTLES.map((apostle, index) => (
                               <div key={apostle.id} className="flex gap-4 items-start group">
                                   <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-black border-2 border-white/20 text-gray-500 transition-all z-10 relative mt-1 group-hover:border-fiat-gold group-hover:text-fiat-gold">
                                       <Shield size={18} />
                                   </div>
                                   <div className="flex-1 p-4 rounded-xl border bg-white/5 border-white/5 group-hover:bg-white/10 transition-colors">
                                       <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-serif font-bold text-white text-lg">{apostle.name}</h4>
                                            <span className="text-[10px] uppercase tracking-widest text-fiat-gold font-bold border border-fiat-gold/20 px-2 py-0.5 rounded">{apostle.symbol}</span>
                                       </div>
                                       <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{apostle.title}</p>
                                       <p className="text-sm text-gray-300 font-serif leading-relaxed italic border-t border-white/5 pt-2">
                                           "{apostle.desc}"
                                       </p>
                                   </div>
                               </div>
                           ))}
                           <div className="text-center py-4">
                               <p className="text-xs text-gray-500 italic font-serif">"Ide por todo o mundo e pregai o Evangelho a toda criatura." (Mc 16,15)</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>

           {/* Objetos Litúrgicos (NOVA SEÇÃO VISUAL) */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'objetos' ? null : 'objetos')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Grape size={18} className="text-fiat-gold" /> Objetos Litúrgicos
                   </h3>
                   {expandedSection === 'objetos' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'objetos' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="grid gap-4 relative z-10">
                           {LITURGICAL_OBJECTS.map((obj) => (
                               <div key={obj.id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-fiat-gold/30 transition-colors group">
                                   <div className="flex items-center gap-3 mb-3">
                                       <div className="w-12 h-12 bg-fiat-gold/10 rounded-full flex items-center justify-center text-fiat-gold border border-fiat-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.15)] group-hover:scale-110 transition-transform">
                                           {getMinistryIcon(obj.icon)}
                                       </div>
                                       <h4 className="font-serif font-bold text-white text-lg leading-tight">{obj.title}</h4>
                                   </div>
                                   <p className="text-sm text-gray-300 font-serif leading-relaxed pl-13 border-l-2 border-white/10 pl-4">
                                       {obj.desc}
                                   </p>
                               </div>
                           ))}
                           <div className="text-center py-4">
                               <p className="text-xs text-gray-500 italic font-serif">"A beleza da liturgia reflete a beleza de Deus."</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>

           {/* Sucessão Apostólica */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'sucessao' ? null : 'sucessao')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Key size={18} className="text-fiat-gold" /> Sucessão Apostólica
                   </h3>
                   {expandedSection === 'sucessao' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'sucessao' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="absolute left-[34px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-fiat-gold via-white/20 to-fiat-gold opacity-50"></div>
                       <div className="space-y-6 relative z-10">
                           {APOSTOLIC_LINE.map((pope, index) => (
                               <div key={pope.id} className="flex gap-4 items-start group">
                                   <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all z-10 relative mt-1
                                       ${pope.highlight 
                                           ? 'bg-fiat-gold border-fiat-gold text-fiat-navy shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                                           : 'bg-black border-white/20 text-gray-500'}`}
                                   >
                                       {index === 0 ? <Key size={20} /> : <Shield size={18} />}
                                   </div>
                                   <div className={`flex-1 p-3 rounded-xl border transition-all 
                                       ${pope.highlight 
                                           ? 'bg-fiat-gold/10 border-fiat-gold/30' 
                                           : 'bg-white/5 border-white/5 group-hover:bg-white/10'}`}
                                   >
                                       <div className="flex justify-between items-start">
                                           <h4 className={`font-serif font-bold ${pope.highlight ? 'text-fiat-gold' : 'text-white'}`}>{pope.name}</h4>
                                           <span className="text-[9px] font-mono text-gray-500">{pope.period}</span>
                                       </div>
                                       {pope.title && <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold">{pope.title}</p>}
                                       <p className="text-xs text-gray-400 mt-2 font-serif leading-relaxed italic border-t border-white/5 pt-2">
                                           "{pope.bio}"
                                       </p>
                                       <p className="text-[9px] text-gray-600 font-mono mt-2 text-right">#{pope.id}</p>
                                   </div>
                               </div>
                           ))}
                           <div className="text-center py-4">
                               <p className="text-xs text-gray-500 italic font-serif">"...e as portas do inferno não prevalecerão contra ela." (Mt 16,18)</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>

           {/* Vida dos Santos Accordion */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'santos' ? null : 'santos')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider">Vida dos Santos</h3>
                   {expandedSection === 'santos' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'santos' && (
                   <div className="p-5 pt-0 bg-black/10">
                       <div className="h-px w-full bg-white/5 mb-4"></div>
                       <div className="space-y-3">
                           {SAINTS.map(saint => (
                               <div key={saint.id} className="bg-black/20 p-4 rounded-lg flex gap-4 items-center group hover:bg-black/30 transition-colors border border-white/5">
                                   <div className="shrink-0 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                       <SaintIcon id={saint.id} className="w-8 h-8 text-fiat-gold drop-shadow-sm" />
                                   </div>
                                   <div>
                                       <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">{saint.name}</h4>
                                       <p className="text-[9px] text-gray-400 uppercase mb-2 flex items-center gap-2 tracking-widest">
                                           {saint.title}<span className="w-1 h-1 bg-gray-600 rounded-full"></span>{saint.date}
                                       </p>
                                       <p className="text-gray-300 text-xs leading-relaxed font-serif line-clamp-2">{saint.bio}</p>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               )}
           </div>

           {/* Hierarquia da Igreja */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'hierarquia' ? null : 'hierarquia')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Users size={18} className="text-fiat-gold" /> A Hierarquia da Igreja
                   </h3>
                   {expandedSection === 'hierarquia' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'hierarquia' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="absolute left-[34px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-fiat-gold via-white/20 to-transparent opacity-30"></div>
                       <div className="space-y-6 relative z-10">
                           {CHURCH_HIERARCHY.map((role, index) => (
                               <div key={role.id} className="flex gap-4 items-start group">
                                   <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-black border-2 transition-all z-10 relative mt-1 ${index === 0 ? 'border-fiat-gold text-fiat-gold' : 'border-white/20 text-gray-500'}`}>
                                       {index === 0 ? <Crown size={20} /> : <Users size={18} />}
                                   </div>
                                   <div className="flex-1 p-4 rounded-xl border bg-white/5 border-white/5 group-hover:bg-white/10 transition-colors">
                                       <div className="flex justify-between items-start mb-1">
                                            <h4 className={`font-serif font-bold text-lg ${role.color}`}>{role.role}</h4>
                                            <span className="text-[10px] uppercase tracking-widest text-fiat-gold font-bold border border-fiat-gold/20 px-2 py-0.5 rounded">{role.symbol}</span>
                                       </div>
                                       <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{role.title}</p>
                                       <p className="text-sm text-gray-300 font-serif leading-relaxed italic border-t border-white/5 pt-2">
                                           "{role.desc}"
                                       </p>
                                   </div>
                               </div>
                           ))}
                           <div className="text-center py-4">
                               <p className="text-xs text-gray-500 italic font-serif">"Quem vos ouve, a mim ouve." (Lc 10,16)</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>

           {/* Ministérios e Serviços */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'ministerios' ? null : 'ministerios')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Heart size={18} className="text-fiat-gold" /> Ministérios e Serviços
                   </h3>
                   {expandedSection === 'ministerios' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'ministerios' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="grid gap-4 relative z-10">
                           {CHURCH_MINISTRIES.map((min) => (
                               <div key={min.id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-fiat-gold/30 transition-colors">
                                   <div className="flex items-center gap-3 mb-3">
                                       <div className="w-10 h-10 bg-fiat-gold/10 rounded-full flex items-center justify-center text-fiat-gold border border-fiat-gold/20">
                                           {getMinistryIcon(min.icon)}
                                       </div>
                                       <h4 className="font-serif font-bold text-white text-lg leading-tight">{min.title}</h4>
                                   </div>
                                   <p className="text-sm text-gray-300 font-serif leading-relaxed pl-13 border-l-2 border-white/10 pl-4">
                                       {min.desc}
                                   </p>
                               </div>
                           ))}
                           <div className="text-center py-4">
                               <p className="text-xs text-gray-500 italic font-serif">"Há diversidade de dons, mas o Espírito é o mesmo." (1 Cor 12,4)</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>

           {/* História da Igreja */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'historia' ? null : 'historia')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Landmark size={18} className="text-fiat-gold" /> História da Igreja
                   </h3>
                   {expandedSection === 'historia' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'historia' && (
                   <div className="p-6 pt-2 bg-black/20 relative">
                       <div className="h-px w-full bg-white/5 mb-6"></div>
                       <div className="absolute left-[34px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-fiat-gold via-white/20 to-fiat-gold opacity-50"></div>
                       <div className="space-y-8 relative z-10">
                           {CHURCH_HISTORY.map((era, index) => (
                               <div key={era.id} className="flex gap-4 items-start group">
                                   <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-black border-2 border-fiat-gold/30 text-fiat-gold font-bold font-serif shadow-lg z-10">
                                       {index + 1}
                                   </div>
                                   <div className="flex-1 p-4 rounded-xl border bg-white/5 border-white/5 group-hover:bg-white/10 transition-colors">
                                       <h4 className="font-serif font-bold text-fiat-gold text-lg mb-1">{era.title}</h4>
                                       <span className="text-[10px] font-mono text-gray-400 bg-black/30 px-2 py-0.5 rounded border border-white/5">{era.period}</span>
                                       <p className="text-sm text-gray-300 mt-3 font-serif leading-relaxed italic border-t border-white/5 pt-2">
                                           "{era.desc}"
                                       </p>
                                       <ul className="mt-3 space-y-1.5">
                                           {era.events.map((ev, i) => (
                                               <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                                   <span className="text-fiat-gold mt-0.5">•</span> {ev}
                                               </li>
                                           ))}
                                       </ul>
                                   </div>
                               </div>
                           ))}
                           <div className="text-center py-4">
                               <p className="text-xs text-gray-500 italic font-serif">"Eis que estou convosco todos os dias, até o fim do mundo." (Mt 28,20)</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>

           {/* A Santa Missa */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'missa' ? null : 'missa')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                       <Flame size={18} className="text-fiat-gold" /> A Santa Missa
                   </h3>
                   {expandedSection === 'missa' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'missa' && (
                   <div className="p-6 pt-2 bg-black/20 relative space-y-8">
                       <div className="h-px w-full bg-white/5 mb-2"></div>
                       
                       {/* Intro */}
                       <div className="bg-black/40 p-5 rounded-xl border border-white/10">
                          <h4 className="text-fiat-gold font-serif text-lg mb-2">{HOLY_MASS.intro.title}</h4>
                          <p className="text-gray-300 text-sm font-serif leading-relaxed">{HOLY_MASS.intro.text}</p>
                       </div>

                       {/* Timeline dos Ritos */}
                       <div>
                          <h4 className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2"><Key size={12}/> O Ritual Sagrado</h4>
                          <div className="space-y-6">
                            {HOLY_MASS.rites.map((rite, i) => (
                                <div key={i} className={`relative pl-4 ${rite.highlight ? 'bg-fiat-gold/5 p-4 rounded-xl border border-fiat-gold/20' : ''}`}>
                                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-white/20"></div>
                                    <h5 className="text-fiat-gold font-serif font-bold text-lg">{rite.part}</h5>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">{rite.desc}</p>
                                    <div className="space-y-2">
                                        {rite.actions.map((act, j) => (
                                            <div key={j} className="text-sm">
                                                <span className="text-white font-bold">{act.name}: </span>
                                                <span className="text-gray-400 italic">{act.meaning}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                          </div>
                       </div>

                       {/* Mundo Espiritual */}
                       <div className="bg-gradient-to-br from-purple-900/20 to-black p-5 rounded-xl border border-purple-500/20 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={60} /></div>
                           <h4 className="text-purple-300 font-serif text-lg mb-2 relative z-10 flex items-center gap-2"><Sparkles size={16}/> {HOLY_MASS.spiritual.title}</h4>
                           <p className="text-xs text-gray-400 mb-3">{HOLY_MASS.spiritual.desc}</p>
                           <ul className="space-y-2 relative z-10">
                               {HOLY_MASS.spiritual.points.map((pt, i) => (
                                   <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                                       <span className="text-purple-400 mt-1">✦</span> {pt}
                                   </li>
                               ))}
                           </ul>
                       </div>

                       {/* Etiqueta */}
                       <div className="bg-black/30 p-5 rounded-xl border border-white/5">
                           <h4 className="text-gray-300 font-serif text-lg mb-4 flex items-center gap-2"><Shield size={16}/> Santa Etiqueta</h4>
                           <ul className="space-y-3">
                               {HOLY_MASS.etiquette.map((rule, i) => (
                                   <li key={i} className="text-sm text-gray-400 flex items-start gap-3 bg-white/5 p-2 rounded-lg">
                                       <span className="text-fiat-gold font-bold">{i+1}.</span> {rule}
                                   </li>
                               ))}
                           </ul>
                       </div>

                   </div>
               )}
           </div>

           {/* Ano Litúrgico */}
           <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
               <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedSection(expandedSection === 'liturgia' ? null : 'liturgia')}>
                   <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider">Ano Litúrgico</h3>
                   {expandedSection === 'liturgia' ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
               </div>
               {expandedSection === 'liturgia' && (
                   <div className="p-5 pt-0 bg-black/10 space-y-3">
                       <div className="h-px w-full bg-white/5 mb-4"></div>
                       <LiturgicalCard title="Advento" color="text-purple-400" desc="Tempo de espera e preparação para o Natal. 4 semanas de reflexão e vigilância." />
                       <LiturgicalCard title="Natal" color="text-yellow-400" desc="Celebração do nascimento de Jesus. Tempo de alegria e luz." />
                       <LiturgicalCard title="Quaresma" color="text-purple-500" desc="40 dias de penitência, oração e jejum preparando para a Páscoa." />
                       <LiturgicalCard title="Páscoa" color="text-white" desc="A maior festa cristã. A Ressurreição do Senhor. 50 dias de júbilo." />
                       <LiturgicalCard title="Tempo Comum" color="text-green-500" desc="O dia a dia da vida de Jesus e da Igreja. O verde da esperança." />
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};

const LiturgicalCard: React.FC<{ title: string, color: string, desc: string }> = ({ title, color, desc }) => (
    <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 ${color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`}></div>
        <div>
            <h4 className={`font-bold text-xs uppercase tracking-widest ${color}`}>{title}</h4>
            <p className="text-gray-400 text-xs mt-1 font-serif">{desc}</p>
        </div>
    </div>
);

export default CatechismPage;
