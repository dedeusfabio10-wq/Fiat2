import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Button, Card, Input } from '../ui/UIComponents';
import PremiumModal from '../ui/PremiumModal';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, Settings, LogOut, BarChart3, Heart, Camera, Lock, 
  Palette, Moon, PenLine, Check, CalendarClock, ExternalLink, 
  Search, X, RefreshCw, Loader2, Users 
} from 'lucide-react';
import { toast } from 'sonner';
import { SAINTS } from '../constants';
import { SaintIcon } from '../ui/SaintIcons';
import { playSoftBell } from '../services/audio';
import { supabase } from '../services/supabase';

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, refreshProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSaintModal, setShowSaintModal] = useState(false);
  const [showAboutFiat, setShowAboutFiat] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [saintSearch, setSaintSearch] = useState('');
  const [editName, setEditName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [isChecking, setIsChecking] = useState(false);

  const devotionalSaint = SAINTS.find(s => s.id === profile.devotionalSaintId);

  // Polling automático para quem está esperando confirmação de pagamento
  useEffect(() => {
    if (!profile.is_premium) {
      const interval = setInterval(() => refreshProfile(), 8000);
      return () => clearInterval(interval);
    }
  }, [profile.is_premium, refreshProfile]);

  const handleManualCheck = async () => {
    setIsChecking(true);
    await refreshProfile();
    setTimeout(() => {
      if (profile.is_premium) toast.success("Premium confirmado! ♡");
      else toast.info("Ainda não confirmado...");
      setIsChecking(false);
    }, 1000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
    toast("Volte sempre, alma devota ♡", { 
      icon: "praying_hands", 
      style: { background: '#0f172a', color: '#d4af37', border: '1px solid #d4af37' } 
    });
    localStorage.clear();
    updateProfile({ name: '', email: '', streak: 0, rosaries_prayed: 0, is_premium: false, onboarding_completed: false, favorites: [], active_novenas: [] });
    navigate('/auth');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ ...profile, photo: reader.result as string });
        toast.success("Foto atualizada!");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateProfile({ ...profile, name: tempName });
      setEditName(false);
      toast.success("Nome atualizado.");
    }
  };

  const selectSaint = (id: string) => {
    updateProfile({ ...profile, devotionalSaintId: id });
    setShowSaintModal(false);
    playSoftBell();
    if (navigator.vibrate) navigator.vibrate(50);
    toast.success("Santo de devoção definido!");
  };

  const setTheme = (theme: 'purple' | 'green' | 'white' | 'rose') => {
    updateProfile({ ...profile, customTheme: theme });
    toast.success(`Tema ${theme} aplicado.`);
  };

  return (
    <div className={`min-h-screen pb-32 animate-fade-in ${profile.nightModeSpiritual ? 'bg-black' : ''}`}>
      {/* Header com foto e nome */}
      <div className="relative p-6 pb-8 bg-gradient-to-b from-black/40 to-transparent">
        {profile.nightModeSpiritual && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({length:20}).map((_,i) => (
              <div key={i} className="absolute bg-white rounded-full w-0.5 h-0.5 animate-pulse" 
                style={{top: Math.random()*100+'%', left: Math.random()*100+'%', animationDelay: Math.random()*2+'s'}} />
            ))}
          </div>
        )}
        <div className="flex flex-col items-center gap-4 mt-4">
          <div 
            className={`relative group cursor-pointer w-28 h-28 rounded-full flex items-center justify-center shadow-2xl ${profile.is_premium ? 'border-[3px] border-sacred-gold p-1' : 'border-4 border-white/10 bg-gray-800'}`} 
            onClick={() => fileInputRef.current?.click()}
          >
            {profile.is_premium && <div className="absolute inset-0 rounded-full animate-spin-slow border-t-2 border-b-2 border-sacred-gold/50 opacity-50"></div>}
            <div className="w-full h-full rounded-full overflow-hidden bg-stone-900 flex items-center justify-center relative">
              {profile.photo ? 
                <img src={profile.photo} alt="Perfil" className="w-full h-full object-cover" /> : 
                <span className="text-4xl font-serif font-bold text-gray-500">{profile.name?.[0]?.toUpperCase()}</span>
              }
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" />
              </div>
            </div>
            {profile.is_premium && (
              <div className="absolute -bottom-2 bg-sacred-gold text-sacred-sapphire text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                <Crown size={10} fill="currentColor" /> PREMIUM
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          </div>

          <div className="text-center space-y-1 z-10">
            {editName ? (
              <div className="flex gap-2 items-center justify-center">
                <Input value={tempName} onChange={e => setTempName(e.target.value)} className="h-8 w-40 text-center bg-black/40" autoFocus />
                <Button size="sm" variant="sacred" onClick={handleSaveName} className="h-8 w-8 !p-0"><Check size={14}/></Button>
              </div>
            ) : (
              <h2 className="text-2xl font-serif text-white flex items-center justify-center gap-2" onClick={() => { setTempName(profile.name); setEditName(true); }}>
                {profile.name} <PenLine size={14} className="text-gray-500 opacity-50" />
              </h2>
            )}
            {devotionalSaint && (
              <p className="text-sacred-gold text-sm flex items-center justify-center gap-1 font-serif italic animate-fade-in">
                <SaintIcon id={devotionalSaint.id} className="w-4 h-4" /> Devoto de {devotionalSaint.name} heart
              </p>
            )}
            {!profile.is_premium && <p className="text-xs text-gray-500">Peregrino</p>}
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="p-6 space-y-6">

        {/* NOVO CARD: COMUNIDADES DE ORAÇÃO */}
        <div 
          onClick={() => navigate('/communities')}
          className="bg-fiat-card-blue border border-white/10 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 hover:border-fiat-gold/30 transition-all group shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-fiat-gold/10 flex items-center justify-center text-fiat-gold group-hover:scale-110 transition-transform">
            <Users size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-serif font-medium">Comunidades de Oração</h3>
            <p className="text-xs text-gray-400">Reze junto com seus irmãos.</p>
          </div>
          <div className="text-gray-500 group-hover:text-fiat-gold transition-colors">right arrow</div>
        </div>

        {/* Premium ou Não Premium */}
        {profile.is_premium ? (
          /* === ÁREA PREMIUM === */
          <div className="space-y-6 animate-slide-up">
            {/* Card Premium Ativo */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 p-5 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-3 opacity-5 text-white"><Crown size={80} /></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <h3 className="text-xs font-bold text-sacred-gold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Crown size={12} fill="currentColor"/> Premium Ativo
                  </h3>
                  <p className="text-white font-serif text-xl">
                    {profile.subscriptionType === 'yearly' ? 'Passe Anual' : 'Passe de 30 Dias'}
                  </p>
                </div>
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold border border-green-500/30">ATIVO</div>
              </div>
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CalendarClock size={14} />
                  {profile.premium_expires_at ? (
                    <span>Válido até {new Date(profile.premium_expires_at).toLocaleDateString('pt-BR')}</span>
                  ) : (
                    <span>Acesso liberado</span>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <Button size="sm" variant="outline" className="w-full text-xs h-8" onClick={() => setShowPremiumModal(true)}>
                  <ExternalLink size={12} className="mr-2"/> Renovar ou Estender
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 opacity-80 pt-2">
              <Crown size={16} className="text-sacred-gold" />
              <h3 className="text-xs font-bold text-sacred-gold uppercase tracking-widest">Área da Alma Premium</h3>
            </div>

            {/* Santo de Devoção, Frase, Tema, Modo Noturno... (mantido igual) */}
            <Card className="bg-white/5 border-sacred-gold/20 group cursor-pointer hover:border-sacred-gold/50 transition-all">
              <div className="p-4 flex items-center justify-between" onClick={() => setShowSaintModal(true)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sacred-gold/10 flex items-center justify-center text-sacred-gold border border-sacred-gold/20">
                    {devotionalSaint ? <SaintIcon id={devotionalSaint.id} className="w-6 h-6" /> : <Heart size={20} />}
                  </div>
                  <div>
                    <h4 className="text-white font-serif">Santo de Devoção</h4>
                    <p className="text-xs text-gray-400">{devotionalSaint ? devotionalSaint.name : 'Escolha seu intercessor'}</p>
                  </div>
                </div>
                <div className="text-sacred-gold text-xs font-bold uppercase px-3 py-1 rounded border border-sacred-gold/30">Alterar</div>
              </div>
            </Card>

            {/* Frase Espiritual */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2 block">Frase / Lema Espiritual</label>
              <div className="relative">
                <Input 
                  value={profile.favoriteQuote || ''} 
                  onChange={e => updateProfile({...profile, favoriteQuote: e.target.value})}
                  placeholder="Ex: Jesus, eu confio em Vós!" 
                  className="bg-black/20 border-none text-white font-serif italic text-center placeholder:text-gray-600 focus:ring-1 focus:ring-sacred-gold"
                />
                <span className="absolute right-3 top-3 text-gray-600"><PenLine size={14} /></span>
              </div>
            </div>

            {/* Cores Litúrgicas */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={16} className="text-gray-400" />
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Cor Litúrgica Pessoal</span>
              </div>
              <div className="flex justify-between gap-2">
                <ThemeOption color="bg-purple-600" label="Roxo" active={profile.customTheme === 'purple'} onClick={() => setTheme('purple')} />
                <ThemeOption color="bg-green-600" label="Verde" active={profile.customTheme === 'green'} onClick={() => setTheme('green')} />
                <ThemeOption color="bg-slate-200" label="Branco" active={profile.customTheme === 'white'} onClick={() => setTheme('white')} light />
                <ThemeOption color="bg-pink-600" label="Rosa" active={profile.customTheme === 'rose'} onClick={() => setTheme('rose')} />
              </div>
            </div>

            {/* Modo Noturno Espiritual */}
            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-900/30 rounded-lg text-indigo-300"><Moon size={18} /></div>
                <div>
                  <h4 className="text-sm font-medium text-white">Modo Noturno Espiritual</h4>
                  <p className="text-[10px] text-gray-500">Ambiente ultra-escuro para vigílias.</p>
                </div>
              </div>
              <button 
                onClick={() => updateProfile({...profile, nightModeSpiritual: !profile.nightModeSpiritual})}
                className={`w-12 h-6 rounded-full transition-colors relative ${profile.nightModeSpiritual ? 'bg-sacred-gold' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${profile.nightModeSpiritual ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        ) : (
          /* === NÃO PREMIUM === */
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-600/30 p-0 shadow-lg">
            <div className="bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold">
                <Crown size={20} fill="currentColor" /><span className="font-serif tracking-wide">Premium</span>
              </div>
              <Lock size={16} className="text-yellow-100 opacity-70" />
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-300 text-sm font-serif italic leading-relaxed text-center">
                "Apoie o Fiat com apenas R$ 4,90 por mês (menos que um café — e ajuda a levar Jesus a milhares de lares heart)"
              </p>
              <div className="space-y-3">
                <FeatureRow icon={<Heart size={14} />} text="Santo de Devoção no Perfil" />
                <FeatureRow icon={<PenLine size={14} />} text="Frase Espiritual Favorita" />
                <FeatureRow icon={<Palette size={14} />} text="Temas Litúrgicos Exclusivos" />
                <FeatureRow icon={<Moon size={14} />} text="Modo Noturno Espiritual" />
              </div>
              <Button onClick={() => setShowPremiumModal(true)} variant="sacred" className="w-full mt-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                Tornar-se Premium heart
              </Button>
              <div className="pt-2 flex justify-center">
                <button onClick={handleManualCheck} disabled={isChecking} className="flex items-center gap-2 text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors uppercase tracking-wider font-medium">
                  {isChecking ? <Loader2 className="animate-spin w-3 h-3" /> : <RefreshCw size={12} />}
                  Verificar Assinatura Existente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sobre o Fiat */}
        <div onClick={() => setShowAboutFiat(true)} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 hover:border-sacred-gold/30 transition-all group">
          <div className="w-10 h-10 rounded-full bg-sacred-gold/10 flex items-center justify-center text-sacred-gold group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.1)]">
            <Heart size={20} fill="currentColor" className="text-sacred-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-serif font-medium">Sobre o Fiat</h3>
            <p className="text-xs text-gray-400">O significado do seu Sim</p>
          </div>
          <div className="text-gray-500 group-hover:text-sacred-gold transition-colors">right arrow</div>
        </div>

        {/* Configurações */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Configurações</h3>
          <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
            <MenuRow icon={<BarChart3 size={18} />} label="Estatísticas" onClick={() => {}} value={`${profile.rosaries_prayed} Terços`} />
            <MenuRow icon={<Settings size={18} />} label="Preferências do App" onClick={() => {}} />
            <MenuRow icon={<LogOut size={18} />} label="Sair do App" onClick={handleLogout} danger />
          </div>
        </div>
      </div>

      {/* Modais */}
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      
      {/* Modal Sobre o Fiat */}
      {showAboutFiat && /* ... (mantido igual) */}
      
      {/* Modal Santo de Devoção */}
      {showSaintModal && /* ... (mantido igual) */}
    </div>
  );
};

/* Componentes auxiliares (mantidos iguais) */
const FeatureRow: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="text-sacred-gold">{icon}</div>{text}</div>
);

const MenuRow: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, value?: string, danger?: boolean }> = ({ icon, label, onClick, value, danger }) => (
  <div onClick={onClick} className={`flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${danger ? 'text-red-400 hover:bg-red-900/10' : 'text-white'}`}>
    <div className="flex items-center gap-3"><div className="opacity-70">{icon}</div><span className="font-medium text-sm">{label}</span></div>
    {value ? <span className="text-xs text-gray-500">{value}</span> : !danger && <div className="text-gray-600">right arrow</div>}
  </div>
);

const ThemeOption: React.FC<{ color: string, label: string, active: boolean, onClick: () => void, light?: boolean }> = ({ color, label, active, onClick, light }) => (
  <button onClick={onClick} className={`flex-1 h-10 rounded-lg transition-all flex items-center justify-center relative ${color} ${active ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-100'}`}>
    {active && <Check size={16} className={light ? 'text-black' : 'text-white'} />}
    <span className="sr-only">{label}</span>
  </button>
);

export default ProfilePage;
