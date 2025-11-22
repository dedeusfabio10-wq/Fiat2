import React, { useContext, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { NOVENAS } from '../constants';
import { Button, Card } from '../ui/UIComponents';
import { ArrowLeft, Check, Calendar, Flame } from 'lucide-react';
import { toast } from 'sonner';

const NovenaDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, updateProfile, themeColors } = useContext(AppContext);
  
  const novena = NOVENAS.find(n => n.id === id);
  const activeState = profile.active_novenas.find(n => n.novenaId === id);
  
  const currentDayIndex = activeState ? activeState.currentDay - 1 : 0;
  const [viewingDay, setViewingDay] = useState(currentDayIndex);

  const dayContent = novena?.days[viewingDay] || novena?.days[0]; 
  const isTodayDone = activeState ? new Date(activeState.lastDate).toDateString() === new Date().toDateString() : false;

  if (!novena) return <div className="p-8 text-center text-white">Novena não encontrada.</div>;

  const handleStartOrPray = () => {
    const todayStr = new Date().toISOString();

    if (!activeState) {
        updateProfile({
            ...profile,
            active_novenas: [...profile.active_novenas, {
                novenaId: novena.id,
                currentDay: 1,
                startDate: todayStr,
                lastDate: todayStr
            }]
        });
        toast.success('Novena iniciada!', { description: 'Que Deus acolha suas intenções.' });
    } else {
        if (!isTodayDone) {
             const updated = profile.active_novenas.map(n => {
                 if (n.novenaId === id) {
                     return { 
                         ...n, 
                         lastDate: todayStr, 
                         currentDay: Math.min(n.currentDay + 1, novena.duration) 
                     };
                 }
                 return n;
             });
             updateProfile({ ...profile, active_novenas: updated });
             toast.success('Dia concluído!', { description: 'Continue firme.' });
        }
    }
  };

  return (
    <div className="p-6 pb-24 min-h-screen animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="!p-2 text-gray-400 hover:text-white">
            <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-serif text-white">{novena.title}</h1>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <Flame size={80} />
         </div>
         <div className="relative z-10">
             <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Progresso</span>
                <span className="text-2xl font-mono text-sacred-gold">
                    {activeState ? activeState.currentDay : 0}<span className="text-gray-500 text-sm">/{novena.duration}</span>
                </span>
             </div>
             <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sacred-gold transition-all duration-700" 
                  style={{ width: `${((activeState ? activeState.currentDay : 0) / novena.duration) * 100}%` }} 
                />
             </div>
             <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                <Calendar size={12} /> 
                {activeState ? 'Em andamento' : 'Não iniciada'}
             </p>
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif text-sacred-gold">{dayContent?.title || `Dia ${viewingDay + 1}`}</h2>
            <div className="flex gap-2">
                <Button 
                    size="sm" variant="outline" 
                    disabled={viewingDay === 0}
                    onClick={() => setViewingDay(d => d - 1)}
                >Anterior</Button>
                <Button 
                    size="sm" variant="outline" 
                    disabled={viewingDay >= novena.duration - 1}
                    onClick={() => setViewingDay(d => d + 1)}
                >Próximo</Button>
            </div>
         </div>

         <Card className="bg-white/5 p-6 space-y-6">
            <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">Reflexão</h3>
                <p className="text-lg text-white font-serif leading-relaxed">{dayContent?.reflection}</p>
            </div>
            
            <div className="w-full h-px bg-white/10" />

            <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">Oração</h3>
                <p className="text-lg text-white/90 font-serif leading-relaxed italic">
                    "{dayContent?.prayer}"
                </p>
                {novena.standardPrayer && (
                    <p className="text-lg text-white/90 font-serif leading-relaxed italic mt-4">
                        (Oração Final): "{novena.standardPrayer}"
                    </p>
                )}
            </div>
         </Card>

         <Button 
            variant="sacred" 
            size="lg" 
            className="w-full py-8 text-lg shadow-xl mb-8"
            onClick={handleStartOrPray}
            disabled={isTodayDone && activeState?.currentDay === viewingDay + 1}
         >
            {isTodayDone && activeState?.currentDay === viewingDay + 1 ? (
                <>
                  <Check className="mr-2" /> Orado hoje
                </>
            ) : (
               "Rezar e Concluir Dia"
            )}
         </Button>
      </div>
    </div>
  );
};

export default NovenaDetailPage;
