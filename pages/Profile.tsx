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

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSaintModal, setShowSaintModal] = useState(false);
  const [showAboutFiat, setShowAboutFiat] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [saintSearch, setSaintSearch] = useState('');
  const [editName, setEditName] = useState(false);
  const [tempName, setTempName] = useState(profile.name || '');
  const [isChecking, setIsChecking] = useState(false);

  const devotionalSaint = SAINTS.find(s => s.id === profile.devotionalSaintId);

  // POLLING AUTOMÁTICO
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
      if (profile.is_premium) toast.success("Premium confirmado! Atualizando tela...");
      else toast.info("Ainda não confirmado...");
      setIsChecking(false);
    }, 1000);
  };

  // CORREÇÃO FINAL: ADICIONADO O id: '' AQUI
  const handleLogout = async () => {
    try { await supabase.auth.signOut(); } catch (e) { console.error("Logout error", e); }
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
    toast("Volte sempre, alma devota", {
      icon: "praying_hands",
      style: { background: '#0f172a', color: '#d4af37', border: '1px solid #d4af37' }
    });
    localStorage.clear();

    updateProfile({
      id: '',                                            // AQUI ESTAVA O ERRO
      name: '',
      email: '',
      streak: 0,
      rosaries_prayed: 0,
      is_premium: false,
      onboarding_completed: false,
      favorites: [],
      active_novenas: [],
      devotionalSaintId: undefined,
      customTheme: undefined,
      nightModeSpiritual: false,
      premium_expires_at: undefined,
      subscriptionType: undefined,
      subscriptionMethod: undefined,
      subscriptionId: undefined,
      favoriteQuote: undefined,
      photo: undefined
    });

    navigate('/auth');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ ...profile, photo: reader.result as string });
        toast.success("Foto atualizada!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateProfile({ ...profile, name: tempName.trim() });
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
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full w-0.5 h-0.5 animate-pulse"
                style={{
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 2 + 's'
                }}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mt-4">
          <div
            className={`relative group cursor-pointer w-28 h-28 rounded-full flex items-center justify-center shadow-2xl ${profile.is_premium ? 'border-[3px] border-fiat-gold p-1' : 'border-4 border-white/10 bg-gray-800'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {profile.is_premium && (
              <div className="absolute inset-0 rounded-full animate-spin-slow border-t-2 border-b-2 border-fiat-gold/50 opacity-50"></div>
            )}

            <div className="w-full h-full rounded-full overflow-hidden bg-stone-900 flex items-center justify-center relative">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-serif font-bold text-gray-500">
                  {profile.name?.[0]?.toUpperCase() || '?'}
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" />
              </div>
            </div>

            {profile.is_premium && (
              <div className="absolute -bottom-2 bg-fiat-gold text-fiat-navy text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                <Crown size={10} fill="currentColor" /> PREMIUM
              </div>
            )}

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          </div>

          <div className="text-center space-y-1 z-10">
            {editName ? (
              <div className="flex gap-2 items-center justify-center">
                <Input
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  className="h-8 w-40 text-center bg-black/40"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                />
                <Button size="sm" variant="sacred" onClick={handleSaveName} className="h-8 w-8 !p-0">
                  <Check size={14} />
                </Button>
              </div>
            ) : (
              <h2
                className="text-2xl font-serif text-white flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  setTempName(profile.name || '');
                  setEditName(true);
                }}
              >
                {profile.name || 'Anônimo'} <PenLine size={14} className="text-gray-500 opacity-50" />
              </h2>
            )}

            {devotionalSaint && (
              <p className="text-fiat-gold text-sm flex items-center justify-center gap-1 font-serif italic animate-fade-in">
                <SaintIcon id={devotionalSaint.id} className="w-4 h-4" /> Devoto de {devotionalSaint.name}
              </p>
            )}
            {!profile.is_premium && <p className="text-xs text-gray-500">Peregrino</p>}
          </div>
        </div>
      </div>

      {/* CARD DAS COMUNIDADES */}
      <div className="px-6 mt-6">
        <Card
          onClick={() => navigate('/communities')}
          className="bg-fiat-card-blue border border-fiat-gold/20 p-6 cursor-pointer hover:bg-fiat-card-blue/80 hover:border-fiat-gold transition-all shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-fiat-gold/10 border-2 border-fiat-gold/30 flex items-center justify-center">
                <Users className="text-fiat-gold" size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-fiat-gold">Comunidades de Oração</h3>
                <p className="text-sm text-fiat-muted">Crie ou entre em grupos de terço, novena e oração diária</p>
              </div>
            </div>
            <div className="text-fiat-gold">right_arrow</div>
          </div>
        </Card>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="p-6 space-y-6">
        {profile.is_premium ? (
          <div className="space-y-6 animate-slide-up">
            {/* Card Premium Ativo */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 p-5 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-3 opacity-5 text-white"><Crown size={80} /></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <h3 className="text-xs font-bold text-fiat-gold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Crown size={12} fill="currentColor" /> Premium Ativo
                  </h3>
                  <p className="text-white font-serif text-xl">
                    {profile.subscriptionType === 'yearly' ? 'Passe Anual' : 'Passe de 30 Dias'}
                  </p>
                </div>
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold border border-green-500/30">
                  ATIVO
                </div>
              </div>
              <div className="space-y-2">
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
                  <ExternalLink size={12} className="mr-2" /> Renovar ou Estender
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 opacity-80 pt-2">
              <Crown size={16} className="text-fiat-gold" />
              <h3 className="text-xs font-bold text-fiat-gold uppercase tracking-widest">Área da Alma Premium</h3>
            </div>

            {/* Santo de Devoção */}
            <Card className="bg-white/5 border-fiat-gold/20 group cursor-pointer hover:border-fiat-gold/50 transition-all">
              <div className="p-4 flex items-center justify-between" onClick={() => setShowSaintModal(true)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-fiat-gold/10 flex items-center justify-center text-fiat-gold border border-fiat-gold/20">
                    {devotionalSaint ? <SaintIcon id={devotionalSaint.id} className="w-6 h-6" /> : <Heart size={20} />}
                  </div>
                  <div>
                    <h4 className="text-white font-serif">Santo de Devoção</h4>
                    <p className="text-xs text-gray-400">{devotionalSaint ? devotionalSaint.name : 'Escolha seu intercessor'}</p>
                  </div>
                </div>
                <div className="text-fiat-gold text-xs font-bold uppercase px-3 py-1 rounded border border-fiat-gold/30">
                  Alterar
                </div>
              </div>
            </Card>

            {/* Frase Espiritual */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2 block">Frase / Lema Espiritual</label>
              <div className="relative">
                <Input
                  value={profile.favoriteQuote || ''}
                  onChange={e => updateProfile({ ...profile, favoriteQuote: e.target.value })}
                  placeholder="Ex: Jesus, eu confio em Vós!"
                  className="bg-black/20 border-none text-white font-serif italic text-center placeholder:text-gray-600 focus:ring-1 focus:ring-fiat-gold"
                />
                <span className="absolute right-3 top-3 text-gray-600"><PenLine size={14} /></span>
              </div>
            </div>

            {/* Tema Litúrgico */}
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
                onClick={() => updateProfile({ ...profile, nightModeSpiritual: !profile.nightModeSpiritual })}
                className={`w-12 h-6 rounded-full transition-colors relative ${profile.nightModeSpiritual ? 'bg-fiat-gold' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${profile.nightModeSpiritual ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        ) : (
          /* ÁREA NÃO PREMIUM */
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-600/30 p-0 shadow-lg">
            <div className="bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold">
                <Crown size={20} fill="currentColor" /><span className="font-serif tracking-wide">Premium</span>
              </div>
              <Lock size={16} className="text-yellow-100 opacity-70" />
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-300 text-sm font-serif italic leading-relaxed text-center">
                "Apoie o Fiat com apenas R$ 4,90 por mês (menos que um café — e ajuda a levar Jesus a milhares de lares)"
              </p>
              <div className="space-y-3">
                <FeatureRow icon={<Heart size={14} />} text="Santo de Devoção no Perfil" />
                <FeatureRow icon={<PenLine size={14} />} text="Frase Espiritual Favorita" />
                <FeatureRow icon={<Palette size={14} />} text="Temas Litúrgicos Exclusivos" />
                <FeatureRow icon={<Moon size={14} />} text="Modo Noturno Espiritual" />
              </div>
              <Button onClick={() => setShowPremiumModal(true)} variant="sacred" className="w-full mt-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                Tornar-se Premium
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
        <div
          onClick={() => setShowAboutFiat(true)}
          className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 hover:border-fiat-gold/30 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-fiat-gold/10 flex items-center justify-center text-fiat-gold group-hover:scale-110 transition-transform">
            <Heart size={20} fill="currentColor" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-serif font-medium">Sobre o Fiat</h3>
            <p className="text-xs text-gray-400">O significado do seu Sim</p>
          </div>
          <div className="text-gray-500 group-hover:text-fiat-gold transition-colors">right_arrow</div>
        </div>

        {/* Configurações */}
        <div className="space-y-3 pt-6">
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

      {showAboutFiat && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-fade-in" onClick={() => setShowAboutFiat(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative bg-[#0f172a] w-full max-w-md rounded-2xl border border-fiat-gold/40 shadow-2xl overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 opacity-20">
              <img src="https://i.ibb.co/5Yk5Z3Q/annunciation-fiat.jpg" alt="Anunciação" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/70 to-[#0f172a]"></div>
            <div className="relative z-10 p-8 text-center space-y-7">
              <div className="w-20 h-20 mx-auto bg-fiat-gold/10 rounded-full flex items-center justify-center border-2 border-fiat-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-pulse-slow">
                <Heart size={40} fill="#d4af37" className="text-fiat-gold" />
              </div>
              <div className="space-y-5">
                <h2 className="text-3xl font-serif text-fiat-gold">FIAT</h2>
                <p className="text-xl italic text-fiat-gold/90 font-serif">"Faça-se em mim segundo a tua palavra"</p>
              </div>
              <div className="space-y-5 text-gray-200 text-sm leading-relaxed px-4">
                <p>Fiat é o seu <span className="text-fiat-gold">SIM diário</span> a Jesus.</p>
              </div>
              <Button variant="outline" className="w-full border-fiat-gold/50 text-fiat-gold hover:bg-fiat-gold/10" onClick={() => setShowAboutFiat(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSaintModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowSaintModal(false)} />
          <div className="bg-[#0f172a] w-full max-w-md h-[80vh] rounded-2xl border border-fiat-gold/20 relative z-10 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-black/40 flex items-center gap-2">
              <Search size={18} className="text-gray-400" />
              <input
                className="bg-transparent border-none outline-none text-white flex-1 placeholder-gray-500"
                placeholder="Buscar santo..."
                value={saintSearch}
                onChange={e => setSaintSearch(e.target.value)}
                autoFocus
              />
              <button onClick={() => setShowSaintModal(false)}><X className="text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {SAINTS.filter(s => s.name.toLowerCase().includes(saintSearch.toLowerCase())).map(s => (
                <div
                  key={s.id}
                  onClick={() => selectSaint(s.id)}
                  className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="w-12 h-12 rounded-full bg-fiat-gold/5 flex items-center justify-center border border-fiat-gold/10">
                    <SaintIcon id={s.id} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{s.name}</h4>
                    <p className="text-[10px] text-gray-500">{s.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componentes auxiliares
const FeatureRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-300 text-sm">
    <div className="text-fiat-gold">{icon}</div>
    {text}
  </div>
);

const MenuRow: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; value?: string; danger?: boolean }> = ({
  icon, label, onClick, value, danger
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${danger ? 'text-red-400 hover:bg-red-900/10' : 'text-white'}`}
  >
    <div className="flex items-center gap-3">
      <div className="opacity-70">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
    {value ? <span className="text-xs text-gray-500">{value}</span> : !danger && <div className="text-gray-600">right_arrow</div>}
  </div>
);

const ThemeOption: React.FC<{ color: string; label: string; active: boolean; onClick: () => void; light?: boolean }> = ({
  color, label, active, onClick, light
}) => (
  <button
    onClick={onClick}
    className={`flex-1 h-10 rounded-lg transition-all flex items-center justify-center relative ${color} ${active ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-100'}`}
  >
    {active && <Check size={16} className={light ? 'text-black' : 'text-white'} />}
    <span className="sr-only">{label}</span>
  </button>
);

export default ProfilePage;
