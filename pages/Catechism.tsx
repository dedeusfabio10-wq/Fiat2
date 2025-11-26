import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CATECHISM_CONTENT } from '../constants'; // Removi MARIAN_DOGMAS porque agora está dentro do CATECHISM_CONTENT
import { Button } from '../ui/UIComponents';
import PremiumModal from '../ui/PremiumModal';
import {
  Crown, Lock, ChevronDown, ChevronUp, BookOpen, Sparkles, Key, Users,
  Heart, Bell, Music, Star, Grape, Circle, Cloud, Droplet, Sun,
  Loader2, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const CatechismPage: React.FC = () => {
  const { profile, isLoadingProfile, refreshProfile } = useContext(AppContext);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const themeCardColor = useMemo(() => {
    switch (profile.customTheme) {
      case 'purple': return 'bg-[#2e1065]';
      case 'rose': return 'bg-[#831843]';
      case 'white': return 'bg-slate-700';
      case 'green':
      default: return 'bg-fiat-card-green';
    }
  }, [profile.customTheme]);

  // POLLING AUTOMÁTICO
  useEffect(() => {
    if (!profile.is_premium && !isLoadingProfile) {
      const interval = setInterval(() => refreshProfile(), 8000);
      return () => clearInterval(interval);
    }
  }, [profile.is_premium, isLoadingProfile, refreshProfile]);

  const handleManualCheck = async () => {
    setIsChecking(true);
    await refreshProfile();
    setTimeout(() => {
      if (profile.is_premium) toast.success("Conteúdo liberado! ♡");
      else toast.info("Verificando assinatura...", { description: "O sistema continua buscando seu pagamento." });
      setIsChecking(false);
    }, 1000);
  };

  if (isLoadingProfile) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-sacred-gold w-8 h-8" /></div>;
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
          <Button variant="sacred" className="w-full shadow-[0_0_20px_rgba(212,175,55,0.4)]" onClick={() => setShowPremiumModal(true)}>
            Obter Premium (R$ 4,90)
          </Button>
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleManualCheck}
              disabled={isChecking}
              className="flex items-center gap-2 text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors uppercase tracking-wider font-medium"
            >
              {isChecking ? <Loader2 className="animate-spin w-3 h-3" /> : <RefreshCw size={12} />}
              Verificar Assinatura Existente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Função para pegar ícone (usada só na seção Maria, que agora também está no CATECHISM_CONTENT)
  const getMinistryIcon = (iconName?: string) => {
    switch (iconName) {
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
          <div
            key={section.id}
            className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}
          >
            {/* Cabeçalho da seção */}
            <div
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                {section.icon && <span className="text-fiat-gold">{section.icon}</span>}
                {section.title}
              </h3>
              {expandedSection === section.id ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
            </div>

            {/* Conteúdo expandido */}
            {expandedSection === section.id && (
              <div className="p-5 pt-0 bg-black/10">
                <div className="h-px w-full bg-white/5 mb-4"></div>
                <div className="space-y-4">
                  {section.items.map(item => (
                    <div key={item.id} className="bg-black/20 p-4 rounded-lg border border-white/5">
                      <h4 className="text-fiat-gold font-bold text-xs uppercase tracking-widest mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed font-serif italic opacity-90">
                        {/* A LINHA MÁGICA QUE RESOLVE TUDO */}
                        {item.content || item.meditation || item.desc || item.bio || item.text || "Conteúdo em breve..."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatechismPage;
