import React, { useContext, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { NOVENAS } from '../constants';
import { Button, Card } from '../ui/UIComponents';
import { ArrowLeft, Check, Calendar, Flame, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const NovenaDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, updateProfile } = useContext(AppContext);
  
  const novena = NOVENAS.find(n => n.id === id);
  const activeState = profile.active_novenas.find(n => n.novenaId === id);
  
  // Se estiver ativa, mostra o dia atual. Se não, começa do dia 0 (dia 1 visualmente)
  const currentDayIndex = activeState ? activeState.currentDay - 1 : 0;
  const [viewingDay, setViewingDay] = useState(currentDayIndex);

  const dayContent = novena?.days[Math.min(viewingDay, novena.duration - 1)] || novena?.days[0]; 
  
  // Verifica se já rezou hoje (lastDate == hoje)
  const isTodayDone = activeState && activeState.lastDate 
    ? new Date(activeState.lastDate).toDateString() === new Date().toDateString() 
    : false;

  if (!novena) return <div className="p-8 text-center text-white">Novena não encontrada.</div>;

  // --- LÓGICA DE DATAS E BLOQUEIO ---
  const isDateLocked = useMemo(() => {
      if (novena.month === 99) return false; // Novena sem data fixa
      if (novena.fixedDay !== undefined && novena.fixedMonth !== undefined) {
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentDay = now.getDate();
          
          // Verifica se a data atual é ANTERIOR à data de início
          if (currentMonth < novena.fixedMonth || (currentMonth === novena.fixedMonth && currentDay < novena.fixedDay)) {
              return true;
          }
      }
      return false;
  }, [novena]);

  const getStartDateString = () => {
      if (novena.fixedDay !== undefined && novena.fixedMonth !== undefined) {
          const year = new Date().getFullYear();
          return new Date(year, novena.fixedMonth, novena.fixedDay).toLocaleDateString('pt-BR');
      }
      return novena.startDateDisplay;
  };

  // --- AÇÕES ---

  const handleSubscribe = () => {
      const todayStr = new Date().toISOString();
      
      if (isDateLocked) {
          // Apenas inscreve, mas não marca dia 1 como feito
          updateProfile({
              ...profile,
              active_novenas: [...profile.active_novenas, {
                  novenaId: novena.id,
                  currentDay: 1,
                  startDate: todayStr,
                  lastDate: null // Null indica que ainda não rezou o dia 1
              }]
          });
          toast.success('Inscrição realizada!', { description: `A oração será liberada dia ${getStartDateString()}.` });
      } else {
          // Inscreve e já permite rezar (mas não marca como feito automaticamente, usuário deve clicar em "Rezar")
          updateProfile({
              ...profile,
              active_novenas: [...profile.active_novenas, {
                  novenaId: novena.id,
                  currentDay: 1,
                  startDate: todayStr,
                  lastDate: null
              }]
          });
          toast.success('Novena iniciada!', { description: 'Você pode começar o 1º dia agora.' });
      }
  };

  const handlePray = () => {
      if (isDateLocked) {
          toast.error(`Aguarde o início em ${getStartDateString()}`);
          return;
      }

      const todayStr = new Date().toISOString();
      
      if (activeState) {
          // Se tentar rezar dia futuro ou repetir dia já feito (opcionalmente bloqueado)
          // Aqui permitimos avançar se não for o mesmo dia do lastDate
          
          if (!isTodayDone) {
               const updated = profile.active_novenas.map(n => {
                   if (n.novenaId === id) {
                       // Avança o dia, mas não ultrapassa duração + 1 (que seria estado de "concluído")
                       const nextDay = Math.min(n.currentDay + 1, novena.duration + 1);
                       return { 
                           ...n, 
                           lastDate: todayStr, 
                           currentDay: nextDay 
                       };
                   }
                   return n;
               });
               updateProfile({ ...profile, active_novenas: updated });
               toast.success('Dia concluído!', { description: 'Sua oração foi registrada.' });
               
               // Se completou a novena
               if (activeState.currentDay >= novena.duration) {
                   if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                   toast.success('Novena Completa! Deo Gratias!');
               }
          }
      }
  };

  const isCompleted = activeState ? activeState.currentDay > novena.duration : false;
  // Se viewingDay for menor que currentDay-1, é dia passado (já rezado teoricamente)
  // Se viewingDay for igual currentDay-1, é o dia atual a rezar
  // Se viewingDay for maior, é futuro (bloqueado)
  const isFutureDay = activeState ? viewingDay > (activeState.currentDay - 1) : viewingDay > 0;

  return (
    <div className="p-6 pb-32 min-h-screen animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="!p-2 text-gray-400 hover:text-white">
            <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-serif text-white max-w-[250px] leading-tight">{novena.title}</h1>
      </div>

      {/* PROGRESS BAR */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-white/10 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <Flame size={80} />
         </div>
         <div className="relative z-10">
             <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Progresso</span>
                <span className="text-2xl font-mono text-sacred-gold">
                    {activeState ? Math.min(activeState.currentDay, novena.duration) : 0}<span className="text-gray-500 text-sm">/{novena.duration}</span>
                </span>
             </div>
             <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                {/* Lógica da Barra: Se currentDay for 1 (início), 0%. Se 2 (fez 1 dia), mostra 1/9. Se > duration, 100% */}
                <div 
                  className="h-full bg-sacred-gold transition-all duration-700" 
                  style={{ width: `${activeState ? (Math.min(activeState.currentDay - 1, novena.duration) / novena.duration) * 100 : 0}%` }} 
                />
             </div>
             <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                <Calendar size={12} /> 
                {activeState ? (isCompleted ? 'Concluída' : 'Em andamento') : 'Não iniciada'}
                {isDateLocked && <span className="text-red-400 flex items-center gap-1 ml-2"><Lock size={10}/> Inicia {getStartDateString()}</span>}
             </p>
         </div>
      </div>

      <div className="space-y-6">
         {/* CONTROLES DE NAVEGAÇÃO DE DIAS */}
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

         {/* CONTEÚDO DA ORAÇÃO */}
         <Card className={`bg-white/5 p-6 space-y-6 relative ${isFutureDay || (isDateLocked && !activeState) ? 'opacity-50' : ''}`}>
            {/* Bloqueio Visual para Dias Futuros (se inscrito) */}
            {activeState && isFutureDay && !isCompleted && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center p-6 rounded-xl">
                    <Lock className="text-gray-400 mb-2" size={32} />
                    <p className="text-gray-300 font-serif">Este dia ainda não chegou.</p>
                    <p className="text-xs text-gray-500 mt-1">Complete o dia anterior primeiro.</p>
                </div>
            )}

            {/* Bloqueio Visual por Data (se não inscrito ou data futura) */}
            {isDateLocked && !activeState && (
                 <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center p-6 rounded-xl border border-red-500/20">
                    <Calendar className="text-red-400 mb-2" size={32} />
                    <p className="text-white font-serif text-lg">Disponível em {getStartDateString()}</p>
                    <p className="text-xs text-gray-400 mt-2 max-w-xs">Você pode se inscrever agora para deixar salvo em sua lista.</p>
                </div>
            )}

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

         {/* BOTÃO DE AÇÃO */}
         <div className="pb-8">
             {!activeState ? (
                 <Button 
                    variant={isDateLocked ? "outline" : "sacred"} 
                    size="lg" 
                    className="w-full py-8 text-lg shadow-xl"
                    onClick={handleSubscribe}
                 >
                    {isDateLocked ? "Inscrever-se (Pré-inscrição)" : "Iniciar Novena"}
                 </Button>
             ) : (
                 <Button 
                    variant="sacred" 
                    size="lg" 
                    className="w-full py-8 text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePray}
                    // Desabilita se:
                    // 1. Dia visualizado não é o dia atual de progresso
                    // 2. Já foi rezado hoje (isTodayDone)
                    // 3. Data bloqueada (se por acaso a data mudou ou algo do tipo)
                    // 4. Já completou tudo
                    disabled={viewingDay !== (activeState.currentDay - 1) || isTodayDone || isDateLocked || isCompleted}
                 >
                    {isCompleted ? (
                        <>
                          <Check className="mr-2" /> Novena Concluída
                        </>
                    ) : isTodayDone && viewingDay === (activeState.currentDay - 1) ? (
                        <>
                          <Check className="mr-2" /> Orado hoje
                        </>
                    ) : isDateLocked ? (
                        <>
                          <Lock className="mr-2" size={18} /> Aguarde {getStartDateString()}
                        </>
                    ) : (
                       "Rezar e Concluir Dia"
                    )}
                 </Button>
             )}
             
             {activeState && isTodayDone && !isCompleted && (
                 <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
                     <AlertCircle size={12} /> Volte amanhã para continuar sua jornada.
                 </p>
             )}
         </div>
      </div>
    </div>
  );
};

export default NovenaDetailPage;