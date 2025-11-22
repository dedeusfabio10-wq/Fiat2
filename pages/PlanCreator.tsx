import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../ui/UIComponents';
import { ArrowLeft, Sun, Moon, Sunset, Plus, X, Search, CalendarDays, ArrowRight, User } from 'lucide-react';
import { PRAYERS, DEVOTIONAL_ROSARIES, NOVENAS } from '../constants';
import { PlanItem, SpiritualPlan } from '../types';
import { addPlan } from '../services/storage';
import { toast } from 'sonner';

const PlanCreatorPage: React.FC = () => {
  const navigate = useNavigate();
  
  const getLocalDateStr = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split('T')[0];
  };

  const [title, setTitle] = useState('');
  const [spiritualDirector, setSpiritualDirector] = useState('');
  const [duration, setDuration] = useState('30');
  const [startDate, setStartDate] = useState(getLocalDateStr()); 
  const [endDateDisplay, setEndDateDisplay] = useState('');

  const [morning, setMorning] = useState<PlanItem[]>([]);
  const [afternoon, setAfternoon] = useState<PlanItem[]>([]);
  const [night, setNight] = useState<PlanItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'morning' | 'afternoon' | 'night'>('morning');
  const [search, setSearch] = useState('');

  const parseDate = (dateStr: string) => {
      if (!dateStr) return new Date();
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
  };

  useEffect(() => {
    if (startDate && duration) {
        const start = parseDate(startDate);
        const days = parseInt(duration);
        
        if (!isNaN(days) && days > 0) {
            const end = new Date(start);
            end.setDate(start.getDate() + days - 1); 
            setEndDateDisplay(end.toLocaleDateString('pt-BR'));
        } else {
             setEndDateDisplay('...');
        }
    }
  }, [startDate, duration]);

  const allItems = [
    ...PRAYERS.map(p => ({ id: p.id, title: p.title, type: 'prayer' as const })),
    ...DEVOTIONAL_ROSARIES.map(r => ({ id: r.id, title: r.title, type: 'rosary' as const })),
    ...NOVENAS.map(n => ({ id: n.id, title: n.title, type: 'novena' as const })),
    { id: 'via-sacra', title: 'Via Sacra', type: 'custom' as const }
  ].filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

  const handleAddItem = (item: any) => {
      const newItem: PlanItem = {
          id: Math.random().toString(36).substr(2, 9),
          referenceId: item.id,
          title: item.title,
          type: item.type,
          count: 1
      };

      if (activeSection === 'morning') setMorning([...morning, newItem]);
      if (activeSection === 'afternoon') setAfternoon([...afternoon, newItem]);
      if (activeSection === 'night') setNight([...night, newItem]);

      setIsModalOpen(false);
      toast.success('Adicionado!');
  };

  const handleRemoveItem = (section: string, id: string) => {
      if (section === 'morning') setMorning(morning.filter(i => i.id !== id));
      if (section === 'afternoon') setAfternoon(afternoon.filter(i => i.id !== id));
      if (section === 'night') setNight(night.filter(i => i.id !== id));
  };

  const handleSave = () => {
      if (!title.trim()) {
          toast.error("Dê um nome ao seu plano.");
          return;
      }

      if ("Notification" in window && Notification.permission !== "granted") {
          Notification.requestPermission();
      }

      const newPlan: SpiritualPlan = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          spiritualDirector: spiritualDirector.trim() || undefined,
          durationDays: parseInt(duration) || 30,
          startDate: startDate,
          createdAt: new Date().toISOString(),
          streak: 0,
          progress: {},
          notes: {},
          schedule: {
              morning,
              afternoon,
              night
          }
      };

      addPlan(newPlan);
      toast.success("Plano criado com sucesso!");
      navigate('/planner');
  };

  return (
    <div className="p-6 pb-32 min-h-screen animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="!p-2 text-gray-400 hover:text-white">
            <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-serif text-white">Novo Plano Espiritual</h1>
      </div>

      <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
          <div>
              <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest">Nome do Plano</label>
              <Input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Ex: Quaresma de São Miguel" 
                  className="mt-2 bg-black/20 border-white/10 focus:border-sacred-gold"
              />
          </div>

          <div>
              <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest flex items-center gap-2">
                  <User size={12} /> Diretor Espiritual / Acompanhante
              </label>
              <Input 
                  value={spiritualDirector} 
                  onChange={e => setSpiritualDirector(e.target.value)} 
                  placeholder="Ex: Pe. Marcos, Meu Anjo da Guarda..." 
                  className="mt-2 bg-black/20 border-white/10 focus:border-sacred-gold placeholder:text-gray-600"
              />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest">Duração (dias)</label>
                <Input 
                    type="number"
                    value={duration} 
                    onChange={e => setDuration(e.target.value)} 
                    className="mt-2 bg-black/20 border-white/10 focus:border-sacred-gold"
                    min="1"
                />
            </div>
            <div>
                <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest">Início</label>
                <Input 
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="mt-2 bg-black/20 border-white/10 focus:border-sacred-gold text-white"
                    style={{ colorScheme: 'dark' }}
                />
            </div>
          </div>

          <div className="bg-black/30 p-3 rounded-lg flex items-center justify-between text-sm border border-white/5">
             <div className="flex items-center gap-2 text-gray-400">
                <CalendarDays size={14} />
                <span>Previsão</span>
             </div>
             <div className="flex items-center gap-2 text-white font-medium">
                <span>{parseDate(startDate).toLocaleDateString('pt-BR')}</span>
                <ArrowRight size={14} className="text-sacred-gold" />
                <span className="text-sacred-gold">{endDateDisplay}</span>
             </div>
          </div>
      </div>

      <h2 className="text-lg font-serif text-white mb-4">Rotina de Oração</h2>
      
      <div className="space-y-4">
          <SectionCard 
            icon={<Sun className="text-yellow-400" />} 
            title="Manhã" 
            items={morning} 
            onAdd={() => { setActiveSection('morning'); setIsModalOpen(true); }}
            onRemove={(id) => handleRemoveItem('morning', id)}
          />

          <SectionCard 
            icon={<Sunset className="text-orange-400" />} 
            title="Tarde" 
            items={afternoon} 
            onAdd={() => { setActiveSection('afternoon'); setIsModalOpen(true); }}
            onRemove={(id) => handleRemoveItem('afternoon', id)}
          />

          <SectionCard 
            icon={<Moon className="text-indigo-400" />} 
            title="Noite" 
            items={night} 
            onAdd={() => { setActiveSection('night'); setIsModalOpen(true); }}
            onRemove={(id) => handleRemoveItem('night', id)}
          />
      </div>

      <Button variant="sacred" className="w-full mt-8 h-12 text-lg shadow-xl" onClick={handleSave}>
          Salvar Plano
      </Button>

      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <div className="bg-[#0f172a] w-full max-w-md h-[80vh] rounded-t-2xl sm:rounded-2xl border border-white/10 relative z-10 flex flex-col overflow-hidden animate-slide-up">
                  <div className="p-4 border-b border-white/10 flex items-center gap-2">
                      <Search size={18} className="text-gray-400" />
                      <input 
                        className="bg-transparent border-none outline-none text-white flex-1 placeholder-gray-500"
                        placeholder="Buscar oração, novena, terço..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        autoFocus
                      />
                      <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400" /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                      {allItems.map(item => (
                          <button 
                            key={item.type + item.id}
                            onClick={() => handleAddItem(item)}
                            className="w-full text-left p-4 hover:bg-white/5 rounded-lg border-b border-white/5 flex justify-between items-center group"
                          >
                              <span className="text-gray-200 group-hover:text-sacred-gold transition-colors">{item.title}</span>
                              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 uppercase">{item.type}</span>
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

const SectionCard: React.FC<{ 
    icon: React.ReactNode, 
    title: string, 
    items: PlanItem[], 
    onAdd: () => void,
    onRemove: (id: string) => void 
}> = ({ icon, title, items, onAdd, onRemove }) => (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-3 font-serif text-white">
                {icon} {title}
            </div>
            <Button size="sm" variant="ghost" onClick={onAdd} className="text-sacred-gold hover:bg-sacred-gold/10">
                <Plus size={16} /> Adicionar
            </Button>
        </div>
        <div className="p-2 space-y-1">
            {items.length === 0 && <p className="text-gray-600 text-xs text-center py-4">Nenhuma oração.</p>}
            {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                     <span className="text-sm text-gray-300">{item.title}</span>
                     <div className="flex items-center gap-2">
                         <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">1x</span>
                         <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-red-400"><X size={14} /></button>
                     </div>
                </div>
            ))}
        </div>
    </div>
);

export default PlanCreatorPage;
