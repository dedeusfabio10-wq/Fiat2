
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanById, updatePlan } from '../services/storage';
import { SpiritualPlan, PlanItem } from '../types';
import { Button, Card } from '../ui/UIComponents';
import { ArrowLeft, Calendar, User, Sun, Moon, Sunset, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PlanDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<SpiritualPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayStr, setTodayStr] = useState(new Date().toISOString().split('T')[0]);

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

  const toggleItem = async (itemId: string) => {
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

  const getCompletionPercentage = () => {
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

  const percentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-[#0f172a] pb-32 animate-fade-in">
        <div className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/planner')} className="!p-2 text-gray-400 hover:text-white">
                <ArrowLeft size={24} />
            </Button>
            <div className="text-center">
                <h1 className="font-serif text-white text-lg">{plan.title}</h1>
                <p className="text-[10px] text-sacred-gold uppercase tracking-widest">Dia {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="w-10"></div>
        </div>

        <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-white/10 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="relative z-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Progresso Diário</p>
                    <h2 className="text-3xl font-mono text-sacred-gold font-bold">{percentage}%</h2>
                </div>
                <div className="w-16 h-16 relative z-10">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path className="text-sacred-gold transition-all duration-1000" strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                </div>
            </div>

            {plan.spiritualDirector && (
                <div className="flex items-center gap-2 text-sm text-gray-400 justify-center bg-white/5 p-2 rounded-lg border border-white/5">
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
                    />
                )}
            </div>
        </div>
    </div>
  );
};

const PlanSection: React.FC<{ title: string, icon: React.ReactNode, items: PlanItem[], plan: SpiritualPlan, todayStr: string, onToggle: (id: string) => void }> = ({ title, icon, items, plan, todayStr, onToggle }) => (
    <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
        <div className="bg-black/20 p-3 flex items-center gap-2 border-b border-white/5">
            {icon}
            <h3 className="text-white font-serif font-medium">{title}</h3>
        </div>
        <div className="divide-y divide-white/5">
            {items.map(item => {
                const isChecked = !!plan.progress[`${item.id}_${todayStr}`];
                return (
                    <div 
                        key={item.id} 
                        onClick={() => onToggle(item.id)}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${isChecked ? 'bg-sacred-gold/5' : 'hover:bg-white/5'}`}
                    >
                        <span className={`text-sm transition-all ${isChecked ? 'text-sacred-gold line-through opacity-70' : 'text-gray-200'}`}>
                            {item.title}
                        </span>
                        {isChecked ? (
                            <CheckCircle2 className="text-sacred-gold animate-scale-in" size={20} />
                        ) : (
                            <Circle className="text-gray-600" size={20} />
                        )}
                    </div>
                );
            })}
        </div>
    </div>
);

export default PlanDetailPage;
