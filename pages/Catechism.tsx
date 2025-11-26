// pages/Catechism.tsx
import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CATECHISM_CONTENT, MARIAN_DOGMAS } from '../constants';
import { Button } from '../ui/UIComponents';
import PremiumModal from '../ui/PremiumModal';
import { Crown, Lock, ChevronDown, ChevronUp, BookOpen, Sparkles, Heart, Star, Cloud } from 'lucide-react';
import { toast } from 'sonner';

const CatechismPage: React.FC = () => {
  const { profile, isLoadingProfile, refreshProfile } = useContext(AppContext);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const themeCardColor = useMemo(() => {
    switch (profile?.customTheme) {
      case 'purple': return 'bg-[#2e1065]';
      case 'rose': return 'bg-[#831843]';
      case 'white': return 'bg-slate-700';
      default: return 'bg-fiat-card-green';
    }
  }, [profile?.customTheme]);

  useEffect(() => {
    if (!profile?.is_premium && !isLoadingProfile) {
      const interval = setInterval(refreshProfile, 8000);
      return () => clearInterval(interval);
    }
  }, [profile?.is_premium, isLoadingProfile, refreshProfile]);

  const handleManualCheck = async () => {
    setIsChecking(true);
    await refreshProfile();
    setTimeout(() => {
      if (profile?.is_premium) toast.success("Conteúdo liberado! ♡");
      else toast.info("Verificando assinatura...");
      setIsChecking(false);
    }, 1000);
  };

  const getMinistryIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Heart: <Heart size={20} />,
      Star: <Star size={20} />,
      Sparkles: <Sparkles size={20} />,
      Cloud: <Cloud size={20} />,
      Crown: <Crown size={20} />,
    };
    return icons[iconName] || <Sparkles size={20} />;
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BookOpen className="animate-spin text-fiat-gold w-10 h-10" />
      </div>
    );
  }

  if (!profile?.is_premium) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full min-h-[80vh] text-center space-y-8">
        <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-900 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.2)] animate-pulse border-4 border-white/10">
          <Crown size={48} className="text-white" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-serif text-sacred-gold">Catequese Católica</h1>
          <p className="text-gray-400 text-sm font-serif italic px-4">Cresça na fé com o Catecismo completo da Igreja.</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-600/30 p-6 rounded-xl max-w-xs w-full">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4 font-bold text-xs uppercase tracking-widest">
            <Lock size={14} /> Conteúdo Premium
          </div>
          <p className="text-sm text-gray-300 mb-6">Desbloqueie Catecismo, Via Sacra, Novenas e mais.</p>
          <Button variant="sacred" className="w-full" onClick={() => setShowPremiumModal(true)}>
            Obter Premium (R$ 4,90)
          </Button>
          <div className="pt-4 flex justify-center">
            <button onClick={handleManualCheck} disabled={isChecking} className="flex items-center gap-2 text-xs text-yellow-500/70 hover:text-yellow-400">
              {isChecking ? <BookOpen className="animate-spin w-3 h-3" /> : <Crown size={12} />}
              Verificar assinatura
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AQUI ESTÁ A MÁGICA: TODAS as seções (inclusive Maria) vêm do constants.ts
  const allSections = [
    ...CATECHISM_CONTENT,
    {
      id: 'maria',
      title: 'A Virgem Maria',
      items: MARIAN_DOGMAS.map(dogma => ({
        id: dogma.id,
        title: dogma.title,
        content: dogma.desc,
        icon: dogma.icon
      }))
    }
  ];

  return (
    <div className="p-6 pb-32 min-h-screen">
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
        {allSections.map(section => (
          <div key={section.id} className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden shadow-lg`}>
            <div
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
                {section.id === 'maria' && <Crown size={18} className="text-fiat-gold" />}
                {section.title}
              </h3>
              {expandedSection === section.id ? <ChevronUp size={20} className="text-fiat-gold" /> : <ChevronDown size={20} className="text-gray-500" />}
            </div>

            {expandedSection === section.id && (
              <div className="p-5 pt-0 bg-black/10">
                <div className="h-px w-full bg-white/5 mb-4"></div>
                <div className="space-y-4">
                  {section.items.map((item: any) => (
                    <div key={item.id} className="bg-black/20 p-4 rounded-lg border border-white/5">
                      {item.icon && (
                        <div className="w-10 h-10 bg-fiat-gold/10 rounded-full flex items-center justify-center text-fiat-gold border border-fiat-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.15)] mb-3">
                          {getMinistryIcon(item.icon)}
                        </div>
                      )}
                      <h4 className="text-fiat-gold font-bold text-xs uppercase tracking-widest mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed font-serif italic opacity-90">
                        {item.content}
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
