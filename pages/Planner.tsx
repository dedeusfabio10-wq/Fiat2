import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Button } from '../ui/UIComponents';
import { Crown, Plus, Calendar, Lock, Trash2, User, Play, Pause, Volume2, Music, Sparkles, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { getPlans, deletePlan } from '../services/storage';
import { SpiritualPlan } from '../types';
import { toast } from 'sonner';
import { supabase } from '../services/supabase';

const SACRED_MUSIC = [
  {
    name: "Noite Feliz (Instrumental)",
    url: "https://pixabay.com/pt/music/natal-silent-night-christmas-piano-cover-441733/",
    desc: "Especial de Natal",
    special: true
  },
  {
    name: "Ave Maria de Gounod",
    url: "https://orangefreesounds.com/wp-content/uploads/2018/04/Ave-maria-bach-gounod-piano-and-cello-music.mp3",
    desc: "Piano sereno e celestial"
  },
  {
    name: "Adoro Te Devote",
    url: "https://orangefreesounds.com/wp-content/uploads/2017/12/Adoro-Te-Devote-Gregorian-Chant.mp3",
    desc: "Órgão gregoriano profundo"
  },
  {
    name: "Pange Lingua",
    url: "https://orangefreesounds.com/wp-content/uploads/2017/12/Pange-Lingua-Gregorian-Chant.mp3",
    desc: "Harpa contemplativa"
  },
  {
    name: "Ave Maria (Schubert)",
    url: "https://orangefreesounds.com/wp-content/uploads/2017/12/Ave-Maria-Schubert-Piano.mp3",
    desc: "Versão clássica serena"
  },
  {
    name: "Tantum Ergo",
    url: "https://orangefreesounds.com/wp-content/uploads/2017/12/Tantum-Ergo-Gregorian-Chant.mp3",
    desc: "Canto gregoriano tradicional"
  },
  {
    name: "Panis Angelicus",
    url: "https://orangefreesounds.com/wp-content/uploads/2017/12/Panis-Angelicus-Organ.mp3",
    desc: "Voz e órgão majestoso"
  },
  {
    name: "Salve Regina",
    url: "https://orangefreesounds.com/wp-content/uploads/2017/12/Salve-Regina-Gregorian-Chant.mp3",
    desc: "Hino mariano gregoriano"
  }
];

const PlannerPage: React.FC = () => {
  const { profile, updateProfile, isLoadingProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SpiritualPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Música sacra
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (profile.is_premium) {
      loadPlansData();
    }
  }, [profile.is_premium]);

  const loadPlansData = async () => {
    setLoadingPlans(true);
    const data = await getPlans();
    setPlans(data);
    setLoadingPlans(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Excluir este plano?')) {
      const success = await deletePlan(id);
      if (success) {
        toast.success('Plano excluído.');
        loadPlansData();
      } else {
        toast.error('Erro ao excluir.');
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      if (selectedMusic !== null && isPlaying) {
        audioRef.current.src = SACRED_MUSIC[selectedMusic].url;
        audioRef.current.play().catch((e) => {
          console.error(e);
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
      toast.success(`${SACRED_MUSIC[index].name}`, { duration: 3000 });
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    setSelectedMusic(null);
    toast("Silêncio orante restaurado", { duration: 2000 });
  };

  // NOVO: Função de assinatura real com Mercado Pago
  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    setLoadingPayment(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Faça login primeiro para assinar.');
        setLoadingPayment(false);
        return;
      }

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userId: user.id,
          email: user.email
        })
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point; // Redireciona para o checkout
      } else {
        toast.error('Erro ao iniciar pagamento', { description: data.error || 'Tente novamente.'});
      }
    } catch (err) {
      toast.error('Erro de conexão com o servidor de pagamento.');
    } finally {
      setLoadingPayment(false);
    }
  };

  // --- LOADING STATE ---
  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-sacred-gold w-8 h-8" />
      </div>
    );
  }

  // --- PREMIUM LOCK SCREEN (ATUALIZADO) ---
  if (!profile?.is_premium) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full min-h-[80vh] text-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-900 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.2)] animate-pulse-slow border-4 border-white/10">
          <Crown size={48} className="text-white" fill="currentColor" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-serif text-sacred-gold drop-shadow-md">Planner Espiritual</h1>
          <p className="text-gray-400 text-sm font-serif italic px-4 leading-relaxed">
            Organize sua vida de oração, crie planos personalizados e deixe o Espírito Santo guiar seus dias.
          </p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-600/30 p-6 rounded-xl max-w-xs w-full space-y-4">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2 font-bold text-xs uppercase tracking-widest">
            <Lock size={14} />
            Recurso Exclusivo Premium
          </div>

          {/* Botão Mensal */}
          <Button
            onClick={() => handleSubscribe('monthly')}
            disabled={loadingPayment}
            className="w-full bg-white text-black font-bold py-4 rounded-xl text-md shadow-lg hover:shadow-xl transition-all"
          >
            {loadingPayment ? <Loader2 className="animate-spin"/> : 'R$ 4,90 - Assinatura Mensal'}
          </Button>

          {/* Botão Anual (Melhor oferta) */}
          <Button
            onClick={() => handleSubscribe('yearly')}
            disabled={loadingPayment}
            variant="sacred"
            className="w-full font-bold py-5 rounded-xl text-lg shadow-2xl relative overflow-hidden"
          >
            <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs px-3 py-1 rounded-bl-lg font-bold">
              MELHOR OFERTA
            </span>
            {loadingPayment ? <Loader2 className="animate-spin"/> : 'R$ 39,90 - Assinatura Anual'}
          </Button>

          <p className="text-xs text-gray-400 pt-2">
            Pagamento 100% seguro • Mercado Pago
          </p>
        </div>
      </div>
    );
  }

  // === RESTO DO CÓDIGO ===
  const getPlanProgressStats = (plan: SpiritualPlan) => {
    const daysDone = Object.keys(plan.progress || {}).filter(k => k.startsWith('completed_')).length;
    const daysLeft = Math.max(0, plan.durationDays - daysDone);
    const progressPercent = plan.durationDays > 0 ? Math.min(100, Math.round((daysDone / plan.durationDays) * 100)) : 0;
    return { daysDone, daysLeft, progressPercent };
  };

  return (
    <div className="p-6 pb-32 animate-fade-in min-h-screen relative">
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
                <div className="font-medium font-serif flex items-center gap-2">
                  {track.name}
                  {track.special && <Sparkles size={12} className="text-red-500 animate-pulse" />}
                </div>
                <div className="text-xs opacity-70">{track.desc}</div>
              </div>
              {selectedMusic === i && isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
          ))}
        </div>
        {isPlaying && (
          <Button variant="ghost" size="sm" onClick={stopMusic} className="w-full mt-4 text-gray-400 hover:text-white text-xs">
            Silêncio orante
          </Button>
        )}
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white">Meu Planner</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Direção Espiritual</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-sacred-gold/10 flex items-center justify-center border border-sacred-gold/20">
          <Crown size={20} className="text-sacred-gold" />
        </div>
      </div>

      {loadingPlans ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-sacred-gold" />
        </div>
      ) : plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-70">
          <Calendar size={48} className="text-gray-600" />
          <p className="font-serif text-gray-400 text-lg">
            "Crie seu primeiro plano com seu diretor espiritual"
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => {
            const { daysDone, daysLeft, progressPercent } = getPlanProgressStats(plan);
            return (
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
                      handleDelete(plan.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="flex justify-between items-start pr-8">
                  <div className="w-full">
                    <h3 className="text-xl font-serif text-white group-hover:text-sacred-gold transition-colors">{plan.title}</h3>
                    
                    <div className="mt-4 mb-2">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">
                        <span>Progresso</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sacred-gold to-yellow-600 transition-all duration-700"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-green-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 size={14} /> {daysDone} feitos
                        </span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock size={14} /> {daysLeft} faltam
                        </span>
                      </div>
                      {plan.spiritualDirector && (
                        <p className="text-[10px] text-sacred-gold/60 font-serif italic truncate max-w-[100px]">
                          com {plan.spiritualDirector}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => navigate('/planner/create')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-sacred-gold to-yellow-400 rounded-full flex items-center justify-center text-sacred-sapphire shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      <audio ref={audioRef} loop />
    </div>
  );
};

export default PlannerPage;
