import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import {
  CATECHISM_CONTENT,
  SAINTS,
  APOSTOLIC_LINE,
  CHURCH_HISTORY,
  HOLY_MASS,
  CHURCH_HIERARCHY,
  CHURCH_MINISTRIES,
  MARIAN_DOGMAS,
  THE_APOSTLES,
  LITURGICAL_OBJECTS,
} from '../constants';
import { Button } from '../ui/UIComponents';
import PremiumModal from '../ui/PremiumModal';
import {
  Crown,
  Lock,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Sparkles,
  Cross,
  Key,
  Shield,
  Landmark,
  Bell,
  Users,
  Heart,
  Music,
  Star,
  Grape,
  Circle,
  Cloud,
  Droplet,
  Sun,
  Church,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { SaintIcon } from '../ui/SaintIcons';

const CatechismPage: React.FC = () => {
  const { profile, isLoadingProfile, refreshProfile } = useContext(AppContext);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const themeCardColor = useMemo(() => {
    switch (profile.customTheme) {
      case 'purple':
        return 'bg-[#2e1065]';
      case 'rose':
        return 'bg-[#831843]';
      case 'white':
        return 'bg-slate-700';
      case 'green':
      default:
        return 'bg-fiat-card-green';
    }
  }, [profile.customTheme]);

  useEffect(() => {
    if (!profile.is_premium && !isLoadingProfile) {
      const interval = setInterval(() => {
        refreshProfile();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [profile.is_premium, isLoadingProfile]);

  const handleManualCheck = async () => {
    setIsChecking(true);
    await refreshProfile();
    setTimeout(() => {
      if (profile.is_premium) toast.success('Conteúdo liberado! ♡');
      else
        toast.info('Verificando assinatura...', {
          description: 'O sistema continua buscando seu pagamento.',
        });
      setIsChecking(false);
    }, 1000);
  };

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
          <p className="text-gray-400 text-sm font-serif italic px-4 leading-relaxed">
            Aprofunde-se na Doutrina, nos Sacramentos e na vida dos Santos. Uma verdadeira escola de fé.
          </p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-600/30 p-6 rounded-xl max-w-xs w-full">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4 font-bold text-xs uppercase tracking-widest">
            <Lock size={14} /> Conteúdo Premium
          </div>
          <p className="text-sm text-gray-300 mb-6">Desbloqueie a Catequese, Planner e Voz Guiada.</p>
          <Button
            variant="sacred"
            className="w-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            onClick={() => setShowPremiumModal(true)}
          >
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

  const getMinistryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart size={20} />;
      case 'Bell':
        return <Bell size={20} />;
      case 'Music':
        return <Music size={20} />;
      case 'BookOpen':
        return <BookOpen size={20} />;
      case 'Users':
        return <Users size={20} />;
      case 'Key':
        return <Key size={20} />;
      case 'Crown':
        return <Crown size={20} />;
      case 'Sparkles':
        return <Sparkles size={20} />;
      case 'Star':
        return <Star size={20} />;
      case 'Grape':
        return <Grape size={20} />;
      case 'Circle':
        return <Circle size={20} />;
      case 'Sun':
        return <Sun size={20} />;
      case 'Cloud':
        return <Cloud size={20} />;
      case 'Droplet':
        return <Droplet size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  return (
    <div className="p-6 pb-32 min-h-screen animate-fade-in">
      <div className="flex justify-between items-center mb-8 pt-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-wide">CATEQUESE</h1>
          <p className="text-[10px] text-fiat-gold uppercase tracking-[0.3em] font-bold">
            Crescer na Fé
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-fiat-card-green flex items-center justify-center border border-white/10">
          <BookOpen size={20} className="text-white" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Seções principais do catecismo */}
        {CATECHISM_CONTENT.map((section) => (
          <div
            key={section.id}
            className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}
          >
            <div
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() =>
                setExpandedSection(expandedSection === section.id ? null : section.id)
              }
            >
              <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider">
                {section.title}
              </h3>
              {expandedSection === section.id ? (
                <ChevronUp size={20} className="text-fiat-gold" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
            {expandedSection === section.id && (
              <div className="p-5 pt-0 bg-black/10">
                <div className="h-px w-full bg-white/5 mb-4"></div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-black/20 p-4 rounded-lg border border-white/5"
                    >
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

        {/* A Virgem Maria */}
        <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setExpandedSection(expandedSection === 'maria' ? null : 'maria')}
          >
            <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
              <Crown size={18} className="text-fiat-gold" /> A Virgem Maria
            </h3>
            {expandedSection === 'maria' ? (
              <ChevronUp size={20} className="text-fiat-gold" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expandedSection === 'maria' && (
            <div className="p-6 pt-2 bg-black/20">
              <div className="space-y-6">
                {MARIAN_DOGMAS.map((dogma) => (
                  <div
                    key={dogma.id}
                    className="bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-fiat-gold/10 rounded-full flex items-center justify-center text-fiat-gold border border-fiat-gold/20">
                        {getMinistryIcon(dogma.icon)}
                      </div>
                      <h4 className="font-serif font-bold text-white text-lg">{dogma.title}</h4>
                    </div>
                    <p className="text-sm text-gray-300 font-serif leading-relaxed pl-4 border-l-2 border-white/10">
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
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() =>
              setExpandedSection(expandedSection === 'apostolos' ? null : 'apostolos')
            }
          >
            <h3 className="font-serif text-white font-medium text-base uppercase tracking-wider flex items-center gap-2">
              <Users size={18} className="text-fiat-gold" /> Os Santos Apóstolos
            </h3>
            {expandedSection === 'apostolos' ? (
              <ChevronUp size={20} className="text-fiat-gold" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expandedSection === 'apostolos' && (
            <div className="p-6 pt-2 bg-black/20 relative">
              <div className="absolute left-[34px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-fiat-gold via-white/20 to-transparent opacity-30"></div>
              <div className="space-y-6 relative z-10">
                {THE_APOSTLES.map((apostle) => (
                  <div
                    key={apostle.id}
                    className="flex gap-4 items-start group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-black border-2 border-white/20 text-gray-500 z-10 relative mt-1 group-hover:border-fiat-gold">
                      <SaintIcon id={apostle.id} className="w-6 h-6 group-hover:text-fiat-gold" />
                    </div>
                    <div className="flex-1 p-4 rounded-xl border bg-white/5 border-white/5">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif font-bold text-white text-lg">
                          {apostle.name}
                        </h4>
                        <span className="text-[10px] uppercase tracking-widest text-fiat-gold font-bold border border-fiat-gold/20 px-2 py-0.5 rounded">
                          {apostle.symbol}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                        {apostle.title}
                      </p>
                      <p className="text-sm text-gray-300 font-serif leading-relaxed italic border-t border-white/5 pt-2 mt-2">
                        "{apostle.desc}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LINHA DOS PAPAS */}
        <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => setExpandedSection(expandedSection === 'papas' ? null : 'papas')}
          >
            <h3 className="font-serif text-white font-medium text-base uppercase tracking-widest flex items-center gap-2">
              <Key size={18} className="text-fiat-gold" /> Linha dos Papas
            </h3>
            {expandedSection === 'papas' ? (
              <ChevronUp size={20} className="text-fiat-gold" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expandedSection === 'papas' && (
            <div className="p-6 pt-2 bg-black/20">
              <div className="space-y-4">
                {APOSTOLIC_LINE.map((pope) => (
                  <div
                    key={pope.id}
                    className={`p-5 rounded-xl border ${
                      pope.highlight
                        ? 'bg-fiat-gold/20 border-fiat-gold/60 shadow-lg shadow-fiat-gold/20'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif font-bold text-white text-lg">{pope.name}</h4>
                      <span className="text-xs text-fiat-gold uppercase tracking-wider font-bold">
                        {pope.period}
                      </span>
                    </div>
                    {pope.highlight && (
                      <span className="text-fiat-gold text-xs uppercase tracking-widest font-bold">
                        • Papa Atual •
                      </span>
                    )}
                    <p className="text-sm text-gray-300 font-serif italic mt-2 leading-relaxed">
                      {pope.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* HISTÓRIA DA IGREJA */}
        <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() =>
              setExpandedSection(expandedSection === 'historia' ? null : 'historia')
            }
          >
            <h3 className="font-serif text-white font-medium text-base uppercase tracking-widest flex items-center gap-2">
              <Landmark size={18} className="text-fiat-gold" /> História da Igreja
            </h3>
            {expandedSection === 'historia' ? (
              <ChevronUp size={20} className="text-fiat-gold" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expandedSection === 'historia' && (
            <div className="p-6 pt-2 bg-black/20">
              <div className="space-y-4">
                {CHURCH_HISTORY.map((era) => (
                  <div
                    key={era.id}
                    className="bg-white/5 p-5 rounded-xl border border-white/10"
                  >
                    <h4 className="text-fiat-gold font-bold text-sm uppercase tracking-wider mb-2">
                      {era.title}
                    </h4>
                    <p className="text-xs text-fiat-gold/80 font-bold mb-3">{era.period}</p>
                    <p className="text-sm text-gray-300 font-serif italic leading-relaxed">
                      {era.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PARTES DA SANTA MISSA – VERSÃO MÍSTICA TURBINADA */}
<div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-2xl`}>
  <div
    className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
    onClick={() => setExpandedSection(expandedSection === 'missa' ? null : 'missa')}
  >
    <h3 className="font-serif text-white font-medium text-base uppercase tracking-widest flex items-center gap-3">
      <Bell size={20} className="text-fiat-gold" />
      Partes da Santa Missa – O Céu Desce à Terra
    </h3>
    {expandedSection === 'missa' ? (
      <ChevronUp size={24} className="text-fiat-gold" />
    ) : (
      <ChevronDown size={24} className="text-gray-400" />
    )}
  </div>

  {expandedSection === 'missa' && (
    <div className="p-6 pt-0 space-y-7 bg-black/30">
      {/* Cada parte da Missa com cor própria */}
      {HOLY_MASS.rites.map((rite: any) => (
        <div
          key={rite.part}
          className={`rounded-2xl p-6 text-white shadow-2xl bg-gradient-to-br ${rite.color} border border-white/10 transform transition-all hover:scale-[1.015] hover:shadow-3xl`}
        >
          <h4 className="text-2xl font-bold mb-2 text-fiat-gold drop-shadow-md">
            {rite.part}
          </h4>
          <p className="text-lg italic mb-5 opacity-95">{rite.desc}</p>

          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              <span className="font-bold text-yellow-300">Na terra:</span>{' '}
              {rite.explanation}
            </p>
            <p>
              <span className="font-bold text-cyan-300">No céu:</span>{' '}
              {rite.heaven}
            </p>
          </div>

          {/* Ações detalhadas */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rite.actions.map((action: any) => (
              <div
                key={action.name}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <p className="font-semibold text-fiat-gold">{action.name}</p>
                <p className="text-sm opacity-90">{action.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* BLOCO ESPECIAL: O QUE ACONTECE NO MUNDO INVISÍVEL */}
<div className={`rounded-3xl p-8 text-white shadow-3xl bg-gradient-to-br ${HOLY_MASS.spiritual.color} border border-cyan-500/40`}>
  <h3 className="text-4xl font-bold text-center mb-10 text-cyan-200 tracking-wider drop-shadow-lg">
    {HOLY_MASS.spiritual.title}
  </h3>

  <ul className="space-y-6 text-lg leading-relaxed">
    {HOLY_MASS.spiritual.points.map((point: string, i: number) => (
      <li key={i} className="flex items-start gap-5">
        {/* Alterna entre brilho e cruz */}
        {i % 2 === 0 ? (
          <Sparkles className="w-9 h-9 text-cyan-300 flex-shrink-0 mt-0.5" />
        ) : (
          <Cross className="w-8 h-8 text-cyan-300 flex-shrink-0 mt-1" />
        )}
        <span className="text-cyan-50">{point}</span>
      </li>
    ))}
  </ul>
</div>

      {/* Dicas de etiqueta (opcional, fica lindo no final) */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h4 className="text-xl font-bold text-fiat-gold mb-4">Como participar bem da Missa</h4>
        <ul className="space-y-2 text-gray-200">
          {HOLY_MASS.etiquette.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-fiat-gold mt-1">•</span> {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}
</div>

        {/* HIERARQUIA DA IGREJA */}
        <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() =>
              setExpandedSection(expandedSection === 'hierarquia' ? null : 'hierarquia')
            }
          >
            <h3 className="font-serif text-white font-medium text-base uppercase tracking-widest flex items-center gap-2">
              <Shield size={18} className="text-fiat-gold" /> Hierarquia da Igreja
            </h3>
            {expandedSection === 'hierarquia' ? (
              <ChevronUp size={20} className="text-fiat-gold" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expandedSection === 'hierarquia' && (
            <div className="p-6 pt-2 bg-black/20">
              <div className="space-y-4">
                {CHURCH_HIERARCHY.map((role) => (
                  <div
                    key={role.id}
                    className="bg-white/5 p-5 rounded-xl border border-white/10 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-fiat-gold/10 flex items-center justify-center">
                      {getMinistryIcon(role.symbol || 'Sparkles')}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{role.role}</h4>
                      <p className="text-sm text-gray-300 font-serif italic mt-1 leading-relaxed">
                        {role.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MINISTÉRIOS LEIGOS */}
        <div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-lg`}>
          <div
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() =>
              setExpandedSection(expandedSection === 'ministerios' ? null : 'ministerios')
            }
          >
            <h3 className="font-serif text-white font-medium text-base uppercase tracking-widest flex items-center gap-2">
              <Users size={18} className="text-fiat-gold" /> Ministérios Leigos
            </h3>
            {expandedSection === 'ministerios' ? (
              <ChevronUp size={20} className="text-fiat-gold" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          {expandedSection === 'ministerios' && (
            <div className="p-6 pt-2 bg-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHURCH_MINISTRIES.map((min) => (
                  <div
                    key={min.id}
                    className="bg-white/5 p-5 rounded-xl border border-white/10 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-fiat-gold/10 flex items-center justify-center">
                      {getMinistryIcon(min.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{min.title}</h4>
                      <p className="text-sm text-gray-300 font-serif italic mt-1 leading-relaxed">
                        {min.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

       {/* OBJETOS LITÚRGICOS – FUNCIONANDO PERFEITO */}
<div className={`${themeCardColor} border border-white/5 rounded-xl overflow-hidden transition-all shadow-2xl`}>
  <div
    className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
    onClick={() => setExpandedSection(expandedSection === 'objetos' ? null : 'objetos')}
  >
    <h3 className="font-serif text-white font-medium text-base uppercase tracking-widest flex items-center gap-3">
      <Sparkles size={20} className="text-fiat-gold" />
      Objetos Litúrgicos
    </h3>
    {expandedSection === 'objetos' ? (
      <ChevronUp size={24} className="text-fiat-gold" />
    ) : (
      <ChevronDown size={24} className="text-gray-400" />
    )}
  </div>

  {expandedSection === 'objetos' && (
    <div className="p-6 pt-0 bg-black/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {LITURGICAL_OBJECTS.map((obj) => {
          const Icon = obj.icon; // <-- aqui resolve o erro do TypeScript
          return (
            <div
              key={obj.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all shadow-lg"
            >
              <Icon className="w-20 h-20 mx-auto mb-5 text-fiat-gold" />

              <h4 className="text-xl font-bold text-fiat-gold tracking-wide">
                {obj.title}
              </h4>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                {obj.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatechismPage;
