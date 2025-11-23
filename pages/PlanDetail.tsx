
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanById, updatePlan } from '../services/storage';
import { SpiritualPlan, PlanItem } from '../types';
import { Button } from '../ui/UIComponents';
import { PRAYERS, DEVOTIONAL_ROSARIES, NOVENAS, VIA_SACRA } from '../constants';
import { ArrowLeft, User, Sun, Moon, Sunset, CheckCircle2, Circle, Loader2, BookOpen, X, Clock, CalendarDays, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const PlanDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<SpiritualPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayStr, setTodayStr] = useState(new Date().toISOString().split('T')[0]);
  
  // Content Viewer State
  const [viewingContent, setViewingContent] = useState<{ title: string; body: string; type: string } | null>(null);

  useEffect(() => {
    if (id) loadPlan(id);
  }, [id]);

  const loadPlan = async (planId: string) => {
    setLoading(true);
    const data = await getPlanById(planId);
    if (data) {
        setPlan(data);
    } else {
        toast.error("Plano não encontrado");
        navigate('/planner');
    }
    setLoading(false);
  };

  const toggleItem = async (e: React.MouseEvent, itemId: string) => {
      e.stopPropagation(); // Prevent opening modal
      if (!plan) return;
      
      // Chave única: ID_do_Item + Data_Hoje
      const key = `${itemId}_${todayStr}`;
      const newProgress = { ...plan.progress };
      
      const wasChecked = !!newProgress[key];
      if (wasChecked) {
          delete newProgress[key];
      } else {
          newProgress[key] = true;
      }

      const updatedPlan = { ...plan, progress: newProgress };
      setPlan(updatedPlan);
      
      // Salvar no background (otimista)
      await updatePlan(updatedPlan);
      
      if (!wasChecked) {
          if (navigator.vibrate) navigator.vibrate(50);
      }
  };

  // --- LÓGICA DE CONTEÚDO ---
  const handleOpenContent = (item: PlanItem) => {
      let contentBody = "Conteúdo não disponível para leitura direta. Utilize seu livro de orações.";
      let title = item.title;

      // Tenta encontrar o conteúdo nos arquivos locais
      if (item.type === 'prayer' || !item.type) {
          const found = PRAYERS.find(p => p.id === item.referenceId || p.title === item.title);
          if (found) contentBody = found.content;
      } else if (item.type === 'rosary') {
          const found = DEVOTIONAL_ROSARIES.find(r => r.id === item.referenceId || r.title === item.title);
          if (found) contentBody = found.content;
      } else if (item.type === 'novena') {
          const found = NOVENAS.find(n => n.id === item.referenceId || n.title === item.title);
          if (found) {
              // Mostra oração padrão ou dia 1 como exemplo
              contentBody = `${found.description}\n\nOração Padrão:\n${found.days[0].prayer}`;
          }
      } else if (item.title.toLowerCase().includes('via sacra')) {
          contentBody = "Abra a aba 'Orações' > 'Via Sacra' para rezar as estações completas com meditações.";
      }

      // Se for customizado e não achou nada
      if (item.type === 'custom' && contentBody.includes("não disponível")) {
          contentBody = "Esta é uma prática personalizada adicionada por você.";
      }

      setViewingContent({ title, body: contentBody, type: item.type });
  };

  // --- CÁLCULO DE DIAS ---
  const dayInfo = useMemo(() => {
      if (!plan) return { current: 0, total: 0, label: 'Carregando...', status: 'loading', progress: 0 };
      
      const start = new Date(plan.startDate);
      // Zerar horas para evitar problemas de fuso na conta de dias
      start.setHours(0,0,0,0);
      
      const now = new Date();
      now.setHours(0,0,0,0);
      
      const diffTime = now.getTime() - start.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
      
      const currentDay = diffDays + 1;
      const totalDays = plan.durationDays;
      
      let label = '';
      let status = 'active'; // active, future, completed

      if (currentDay <= 0) {
          label = `Começa em ${Math.abs(currentDay - 1)} dias`;
          status = 'future';
      } else if (currentDay > totalDays) {
          label = 'Plano Concluído';
          status = 'completed';
      } else {
          label = `Dia ${currentDay} de ${totalDays}`;
      }

      return { current: currentDay, total: totalDays, label, status, progress: Math.min(100, Math.max(0, (currentDay / totalDays) * 100)) };
  }, [plan]);

  // --- CÁLCULO DE PROGRESSO HOJE ---
  const getDailyCompletion = () => {
      if (!plan) return 0;
      const totalItems = (plan.schedule.morning.length + plan.schedule.afternoon.length + plan.schedule.night.length);
      if (totalItems === 0) return 0;
      
      let checkedCount = 0;
      const checkSection = (items: PlanItem[]) => {
          items.forEach(i => {
              if (plan.progress[`${i.id}_${todayStr}`]) checkedCount++;
          });
      };
      checkSection(plan.schedule.morning);
      checkSection(plan.schedule.afternoon);
      checkSection(plan.schedule.night);
      
      return Math.round((checkedCount / totalItems) * 100);
  };

  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
              <Loader2 className="animate-spin text-sacred-gold" />
          </div>
      );
  }

  if (!plan) return null;

  const dailyPercentage = getDailyCompletion();

  return (
    <div className="min-h-screen bg-[#0f172a] pb-32 animate-fade-in relative">
        {/* Header Fixo */}
        <div className="sticky top-0 z-30 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between shadow-lg">
            <Button variant="ghost" onClick={() => navigate('/planner')} className="!p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                <ArrowLeft size={24} />
            </Button>
            <div className="text-center">
                <h1 className="font-serif text-white text-base max-w-[200px] truncate">{plan.title}</h1>
                <div className="flex items-center justify-center gap-2 text-[10px] text-sacred-gold uppercase tracking-widest">
                    <span>{dayInfo.label}</span>
                </div>
            </div>
            <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="p-6 space-y-6">
            
            {/* Card de Progresso Geral (Dias) */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold">
                    <span>Jornada</span>
                    <span>{dayInfo.progress.toFixed(0)}% Concluído</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-sacred-gold to-yellow-600 transition-all duration-700"
                        style={{ width: `${dayInfo.progress}%` }}
                    />
                </div>
                <p className="text-[10px] text-gray-500 mt-2 text-center italic">
                    {dayInfo.status === 'future' 
                        ? `Prepare-se para iniciar dia ${new Date(plan.startDate).toLocaleDateString('pt-BR')}` 
                        : dayInfo.status === 'completed' 
                        ? "Parabéns! Você finalizou este propósito." 
                        : "Mantenha a constância hoje."}
                </p>
            </div>

            {/* Card de Progresso do Dia (Círculo) */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-white/10 flex justify-between items-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="relative z-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold flex items-center gap-2">
                        <CalendarDays size={14} /> Meta de Hoje
                    </p>
                    <h2 className="text-3xl font-serif text-white">{dailyPercentage}%</h2>
                    <p className="text-[10px] text-sacred-gold mt-1">
                        {dailyPercentage === 100 ? "Dia Completo! Deo Gratias!" : "Complete suas orações."}
                    </p>
                </div>
                <div className="w-16 h-16 relative z-10">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path className="text-sacred-gold transition-all duration-1000" strokeDasharray={`${dailyPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                </div>
            </div>

            {plan.spiritualDirector && (
                <div className="flex items-center gap-2 text-sm text-gray-400 justify-center bg-black/20 p-2 rounded-lg border border-white/5">
                    <User size={14} /> Direção: <span className="text-white font-serif">{plan.spiritualDirector}</span>
                </div>
            )}

            <div className="space-y-6">
                {plan.schedule.morning.length > 0 && (
                    <PlanSection 
                        title="Manhã" 
                        icon={<Sun className="text-yellow-400" />} 
                        items={plan.schedule.morning} 
                        plan={plan} 
                        todayStr={todayStr} 
                        onToggle={toggleItem}
                        onOpen={handleOpenContent}
                    />
                )}
                
                {plan.schedule.afternoon.length > 0 && (
                    <PlanSection 
                        title="Tarde" 
                        icon={<Sunset className="text-orange-400" />} 
                        items={plan.schedule.afternoon} 
                        plan={plan} 
                        todayStr={todayStr} 
                        onToggle={toggleItem}
                        onOpen={handleOpenContent}
                    />
                )}

                {plan.schedule.night.length > 0 && (
                    <PlanSection 
                        title="Noite" 
                        icon={<Moon className="text-indigo-400" />} 
                        items={plan.schedule.night} 
                        plan={plan} 
                        todayStr={todayStr} 
                        onToggle={toggleItem}
                        onOpen={handleOpenContent}
                    />
                )}
            </div>
        </div>

        {/* MODAL DE LEITURA */}
        {viewingContent && (
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 animate-fade-in">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setViewingContent(null)} />
                <div className="bg-[#0f172a] w-full sm:max-w-2xl h-[85vh] sm:h-[80vh] rounded-t-2xl sm:rounded-2xl border border-sacred-gold/30 shadow-2xl relative flex flex-col overflow-hidden animate-slide-up">
                    {/* Header do Modal */}
                    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-sacred-gold/10 flex items-center justify-center text-sacred-gold border border-sacred-gold/20">
                                <BookOpen size={16} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white font-serif uppercase tracking-wider max-w-[200px] truncate">{viewingContent.title}</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Leitura Espiritual</p>
                            </div>
                        </div>
                        <button onClick={() => setViewingContent(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Conteúdo do Modal */}
                    <div className="overflow-y-auto flex-1 p-6 sm:p-10 custom-scrollbar bg-gradient-to-b from-[#0f172a] to-[#0a0f1d]">
                        <div className="max-w-lg mx-auto text-lg text-gray-300 font-serif leading-loose whitespace-pre-wrap text-justify">
                            <span className="text-4xl float-left mr-2 mt-[-6px] text-sacred-gold font-serif opacity-50">
                                {viewingContent.body.charAt(0)}
                            </span>
                            {viewingContent.body.slice(1)}
                        </div>
                        <div className="h-12"></div>
                    </div>
                    
                    {/* Footer do Modal */}
                    <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl flex justify-center">
                        <Button variant="sacred" onClick={() => setViewingContent(null)} className="w-full max-w-xs">
                            Fechar Leitura
                        </Button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

const PlanSection: React.FC<{ 
    title: string, 
    icon: React.ReactNode, 
    items: PlanItem[], 
    plan: SpiritualPlan, 
    todayStr: string, 
    onToggle: (e: React.MouseEvent, id: string) => void,
    onOpen: (item: PlanItem) => void
}> = ({ title, icon, items, plan, todayStr, onToggle, onOpen }) => (
    <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
        <div className="bg-black/30 p-3 flex items-center gap-2 border-b border-white/5">
            {icon}
            <h3 className="text-white font-serif font-medium text-sm tracking-wide">{title}</h3>
        </div>
        <div className="divide-y divide-white/5">
            {items.map(item => {
                const isChecked = !!plan.progress[`${item.id}_${todayStr}`];
                return (
                    <div 
                        key={item.id} 
                        className={`flex items-stretch transition-colors group ${isChecked ? 'bg-sacred-gold/5' : 'hover:bg-white/5'}`}
                    >
                        {/* Botão de Leitura (Área Principal) */}
                        <button 
                            onClick={() => onOpen(item)}
                            className="flex-1 p-4 text-left flex items-center justify-between gap-3 outline-none"
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen size={16} className={`shrink-0 transition-colors ${isChecked ? 'text-sacred-gold/50' : 'text-gray-500 group-hover:text-sacred-gold'}`} />
                                <span className={`text-sm font-medium transition-all line-clamp-1 ${isChecked ? 'text-sacred-gold/70 line-through decoration-sacred-gold/50' : 'text-gray-200 group-hover:text-white'}`}>
                                    {item.title}
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-600 uppercase tracking-wider flex items-center gap-1 group-hover:text-sacred-gold transition-colors">
                                Ler <ChevronRight size={10} />
                            </span>
                        </button>

                        {/* Divisória Vertical */}
                        <div className="w-px bg-white/5 self-stretch"></div>

                        {/* Botão de Check (Área Lateral) */}
                        <button 
                            onClick={(e) => onToggle(e, item.id)}
                            className="p-4 flex items-center justify-center hover:bg-white/5 transition-colors outline-none"
                            aria-label={isChecked ? "Desmarcar" : "Concluir"}
                        >
                            {isChecked ? (
                                <CheckCircle2 className="text-sacred-gold animate-scale-in drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" size={22} />
                            ) : (
                                <Circle className="text-gray-600 hover:text-gray-400 transition-colors" size={22} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
);

export default PlanDetailPage;
