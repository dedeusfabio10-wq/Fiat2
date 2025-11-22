import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from '../ui/UIComponents';
import PremiumModal from '../ui/PremiumModal';
import { Crown, Plus, Calendar, Lock, Trash2, User, Play, Pause, Volume2, Music } from 'lucide-react';
import { getPlans, deletePlan } from '../services/storage';
import { SpiritualPlan } from '../types';
import { toast } from 'sonner';

const SACRED_MUSIC = [
  {
    name: "Ave Maria de Gounod",
    url: "https://cdn.fiat.app/musica/ave-maria-gounod-piano.mp3",
    desc: "Piano sereno e celestial"
  },
  {
    name: "Adoro Te Devote",
    url: "https://cdn.fiat.app/musica/adoro-te-devote-orgao.mp3",
    desc: "Órgão gregoriano profundo"
  },
  {
    name: "Pange Lingua",
    url: "https://cdn.fiat.app/musica/pange-lingua-harpa.mp3",
    desc: "Harpa contemplativa"
  }
];

const PlannerPage: React.FC = () => {
  const { profile, updateProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SpiritualPlan[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Música sacra
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setPlans(getPlans());
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; // Volume suave para meditação
      if (selectedMusic !== null && isPlaying) {
        audioRef.current.src = SACRED_MUSIC[selectedMusic].url;
        audioRef.current.play().catch(() => {
             setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedMusic, isPlaying]);

  const toggleMusic = (index: number) => {
    if (selectedMusic === index) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedMusic(index);
      setIsPlaying(true);
      toast.success(`♡ ${SACRED_MUSIC[index].name}`, { duration: 3000 });
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    setSelectedMusic(null);
    toast("Silêncio orante restaurado 🙏", { duration: 2000 });
  };

  // --- PREMIUM LOCK SCREEN ---
  if (!profile.is_premium) {
    return (
        <div className="p-6 flex flex-col items-center justify-center h-full min-h-[80vh] text-center space-y-8 animate-fade-in">
            <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-900 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.2)] animate-pulse-slow border-4 border-white/10">
                <Crown size={48} className="text-white" fill="currentColor" />
            </div>
           
            <div className="space-y-3">
                <h1 className="text-3xl font-serif text-sacred-gold drop-shadow-md">Planner Espiritual</h1>
                <p className="text-gray-400 text-sm font-serif italic px-4 leading-relaxed">
                    Organize sua vida de oração, crie planos personalizados e deixe o Espírito Santo guiar seus dias.
                </p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-600/30 p-6 rounded-xl max-w-xs w-full">
                <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4 font-bold text-xs uppercase tracking-widest">
                    <Lock size={14} />
                    Recurso Exclusivo
                </div>
                <p className="text-sm text-gray-300 mb-6">
                    Desbloqueie o Planner e a Voz Guiada agora.
                </p>
                <Button
                    variant="sacred"
                    className="w-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    onClick={() => setShowPremiumModal(true)}
                >
                    Obter Premium (R$ 4,90)
                </Button>
            </div>
        </div>
    );
  }

  const formatDateRange = (plan: SpiritualPlan) => {
      if (!plan.startDate) return `${plan.durationDays} dias`;
      const [y, m, d] = plan.startDate.split('-').map(Number);
      const start = new Date(y, m - 1, d);
      const end = new Date(start);
      end.setDate(start.getDate() + plan.durationDays - 1);
      const format = (date: Date) => `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}`;
      return `${format(start)} a ${format(end)}`;
  };

  return (
    <div className="p-6 pb-32 animate-fade-in min-h-screen relative">
      {/* Música Sacra - Card fixo no topo */}
      <div className="mb-8 bg-black/40 backdrop-blur-xl border border-sacred-gold/30 rounded-2xl p-5 shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 text-sacred-gold mb-4">
          <Music size={22} className="animate-pulse" />
          <h3 className="font-serif text-lg">Música Sacra para Meditação</h3>
          <Volume2 size={18} className="text-sacred-gold/70" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {SACRED_MUSIC.map((track, i) => (
            <button
              key={i}
              onClick={() => toggleMusic(i)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all
                ${selectedMusic === i && isPlaying 
                  ? 'bg-sacred-gold/20 border-sacred-gold text-sacred-gold shadow-lg shadow-sacred-gold/30' 
                  : 'bg-white/5 border-white/10 hover:border-sacred-gold/40 text-gray-300'}`}
            >
              <div className="text-left">
                <div className="font-medium font-serif">{track.name}</div>
                <div className="text-xs opacity-70">{track.desc}</div>
              </div>
              {selectedMusic === i && isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
          ))}
        </div>
        {isPlaying && (
          <Button variant="ghost" size="sm" onClick={stopMusic} className="w-full mt-4 text-gray-400 hover:text-white text-xs">
            ♱ Silêncio orante
          </Button>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white">Meu Planner</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Direção Espiritual</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-sacred-gold/10 flex items-center justify-center border border-sacred-gold/20">
          <Crown size={20} className="text-sacred-gold" />
        </div>
      </div>

      {/* Lista de Planos */}
      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-70">
          <Calendar size={48} className="text-gray-600" />
          <p className="font-serif text-gray-400 text-lg">
            "Crie seu primeiro plano com seu diretor espiritual ♡"
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => navigate(`/planner/${plan.id}`)}
              className="relative group bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 p-5 rounded-xl cursor-pointer hover:border-sacred-gold/40 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-red-400 hover:bg-white/5 h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    if(confirm('Excluir este plano?')) {
                      deletePlan(plan.id);
                      setPlans(getPlans());
                    }
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-start pr-8">
                <div>
                  <h3 className="text-xl font-serif text-white group-hover:text-sacred-gold transition-colors">{plan.title}</h3>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-xs text-gray-400 flex items-center gap-2 font-mono">
                      <Calendar size={12} />
                      {formatDateRange(plan)}
                    </p>
                    {plan.spiritualDirector && (
                      <p className="text-xs text-sacred-gold/80 flex items-center gap-2 font-serif italic">
                        <User size={12} />
                        com {plan.spiritualDirector}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {plan.schedule.morning.length > 0 && <span className="text-[10px] bg-yellow-100/10 text-yellow-200 px-2 py-1 rounded border border-yellow-500/20">Manhã</span>}
                {plan.schedule.afternoon.length > 0 && <span className="text-[10px] bg-orange-100/10 text-orange-200 px-2 py-1 rounded border border-orange-500/20">Tarde</span>}
                {plan.schedule.night.length > 0 && <span className="text-[10px] bg-indigo-100/10 text-indigo-200 px-2 py-1 rounded border border-indigo-500/20">Noite</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botão flutuante de criar plano */}
      <button
        onClick={() => navigate('/planner/create')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-sacred-gold to-yellow-400 rounded-full flex items-center justify-center text-sacred-sapphire shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      {/* Player invisível */}
      <audio ref={audioRef} loop />
    </div>
  );
};

export default PlannerPage;