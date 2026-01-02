
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { supabase } from '../services/supabase';
import { Community, CommunityMessage, CommunityPlan, PlanItem } from '../types';
import { Button, Input } from '../ui/UIComponents';
import { PRAYERS } from '../constants';
import { 
  ArrowLeft, Send, Users, Loader2, BookOpen, CheckCircle2, 
  Circle, Plus, X, Search, CalendarCheck, MessageCircle 
} from 'lucide-react';
import { toast } from 'sonner';

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'plans' | 'members'>('chat');

  // Planos e Progresso
  const [plans, setPlans] = useState<CommunityPlan[]>([]);
  const [userProgress, setUserProgress] = useState<string[]>([]); // Lista de item_ids completados hoje
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [planTitle, setPlanTitle] = useState('');
  const [selectedPrayers, setSelectedPrayers] = useState<any[]>([]);
  const [searchPrayer, setSearchPrayer] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!id || !profile.id) return;
    fetchInitialData();

    const channel = supabase
      .channel(`chat_${id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'community_messages',
        filter: `community_id=eq.${id}`
      }, async (payload: any) => {
        const { data: sender } = await supabase.from('profiles').select('name, photo').eq('id', payload.new.sender_id).single();
        setMessages(prev => [...prev, { ...payload.new as any, profiles: sender || { name: 'Usuário' } }]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id, profile.id]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [commRes, msgRes, planRes, progRes] = await Promise.all([
        supabase.from('communities').select('*').eq('id', id).single(),
        supabase.from('community_messages').select('*, profiles(name, photo)').eq('community_id', id).order('created_at', { ascending: true }),
        supabase.from('community_plans').select('*').eq('community_id', id).order('created_at', { descending: true }),
        supabase.from('community_plan_progress').select('item_id').eq('user_id', profile.id).eq('completed_at', todayStr)
      ]);

      setCommunity(commRes.data as Community);
      setMessages(msgRes.data || []);
      setPlans(planRes.data || []);
      setUserProgress((progRes.data || []).map((p: any) => p.item_id));
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !id || sending) return;
    setSending(true);
    const { error } = await supabase.from('community_messages').insert({ community_id: id, sender_id: profile.id, content: newMessage.trim() });
    if (!error) setNewMessage('');
    setSending(false);
  };

  const handleToggleProgress = async (planId: string, itemId: string) => {
    const isDone = userProgress.includes(itemId);
    if (isDone) {
      await supabase.from('community_plan_progress').delete().eq('plan_id', planId).eq('user_id', profile.id).eq('item_id', itemId).eq('completed_at', todayStr);
      setUserProgress(prev => prev.filter(id => id !== itemId));
    } else {
      await supabase.from('community_plan_progress').insert({ plan_id: planId, user_id: profile.id, item_id: itemId, completed_at: todayStr });
      setUserProgress(prev => [...prev, itemId]);
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  const handleCreatePlan = async () => {
    if (!planTitle.trim() || selectedPrayers.length === 0) return;
    const { data, error } = await supabase.from('community_plans').insert({
      community_id: id,
      title: planTitle,
      items: selectedPrayers.map(p => ({ id: p.id, title: p.title, type: 'prayer', count: 1 }))
    }).select().single();

    if (!error) {
      setPlans(prev => [data, ...prev]);
      setShowCreatePlan(false);
      setPlanTitle('');
      setSelectedPrayers([]);
      toast.success('Plano de oração criado!');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-fiat-dark"><Loader2 className="animate-spin text-fiat-gold" /></div>;
  if (!community) return <div className="p-10 text-center text-white">Comunidade não encontrada.</div>;

  const isCreator = community.creator_id === profile.id;

  return (
    <div className="h-screen flex flex-col bg-fiat-dark text-white overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 pt-10 flex items-center gap-4 bg-black/40 border-b border-white/5 backdrop-blur-xl">
        <button onClick={() => navigate('/communities')} className="p-2 bg-white/5 rounded-full text-gray-400"><ArrowLeft size={20}/></button>
        <div className="flex-1 overflow-hidden">
          <h1 className="font-serif text-lg text-fiat-gold uppercase truncate leading-tight">{community.name}</h1>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest truncate">{community.description || 'Grupo de Oração'}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 bg-black/20">
        <TabButton active={activeTab === 'chat'} label="Chat" icon={<MessageCircle size={14}/>} onClick={() => setActiveTab('chat')} />
        <TabButton active={activeTab === 'plans'} label="Planos" icon={<CalendarCheck size={14}/>} onClick={() => setActiveTab('plans')} />
        <TabButton active={activeTab === 'members'} label="Membros" icon={<Users size={14}/>} onClick={() => setActiveTab('members')} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'chat' && (
          <div className="space-y-4 pb-20">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender_id === profile.id ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender_id === profile.id ? 'bg-fiat-gold text-fiat-navy' : 'bg-fiat-card border border-white/5'}`}>
                  {msg.sender_id !== profile.id && <p className="text-[9px] font-bold text-fiat-gold uppercase mb-1">{msg.profiles?.name}</p>}
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-6 pb-20">
            {isCreator && (
              <Button onClick={() => setShowCreatePlan(true)} variant="sacred" className="w-full h-12 text-xs font-bold">
                <Plus size={16} className="mr-2" /> NOVO PLANO DA COMUNIDADE
              </Button>
            )}

            {plans.length === 0 && <p className="text-center py-20 text-gray-600 italic font-serif">Nenhum plano de oração ativo.</p>}

            {plans.map(plan => (
              <div key={plan.id} className="bg-fiat-card border border-white/5 rounded-2xl overflow-hidden shadow-xl animate-fade-in">
                <div className="bg-black/40 p-4 border-b border-white/5">
                  <h3 className="font-serif text-fiat-gold uppercase text-sm tracking-widest">{plan.title}</h3>
                  <p className="text-[9px] text-gray-500 uppercase mt-1">Meta de hoje • Marque ao finalizar</p>
                </div>
                <div className="divide-y divide-white/5">
                  {plan.items.map((item: any) => {
                    const isChecked = userProgress.includes(item.id);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <BookOpen size={16} className="text-fiat-gold/50" />
                          <span className={`text-sm ${isChecked ? 'text-gray-600 line-through' : 'text-gray-200'}`}>{item.title}</span>
                        </div>
                        <button onClick={() => handleToggleProgress(plan.id, item.id)}>
                          {isChecked ? <CheckCircle2 className="text-fiat-gold" size={24} /> : <Circle className="text-gray-700" size={24} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'members' && <div className="py-20 text-center text-gray-600 font-serif italic">Em breve, lista detalhada de irmãos.</div>}
      </div>

      {/* Input de Chat */}
      {activeTab === 'chat' && (
        <div className="p-4 pb-8 bg-black/60 border-t border-white/5 backdrop-blur-xl">
          <form onSubmit={handleSend} className="flex gap-3 max-w-3xl mx-auto">
            <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Sua oração..." className="flex-1 bg-white/5 border-white/10" />
            <Button type="submit" variant="sacred" disabled={!newMessage.trim() || sending} className="w-12 h-12 !p-0 rounded-xl">
              {sending ? <Loader2 className="animate-spin" /> : <Send size={20}/>}
            </Button>
          </form>
        </div>
      )}

      {/* Modal de Criação de Plano (Apenas Criador) */}
      {showCreatePlan && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-fiat-card border border-fiat-gold/30 w-full max-w-md rounded-3xl p-6 animate-scale-in flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-fiat-gold uppercase">Novo Plano Comunitário</h2>
              <button onClick={() => setShowCreatePlan(false)}><X className="text-gray-500" /></button>
            </div>
            <Input label="Título do Plano" value={planTitle} onChange={(e: any) => setPlanTitle(e.target.value)} className="mb-4" />
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
              <Input placeholder="Buscar orações..." className="pl-10 h-10 text-xs" value={searchPrayer} onChange={(e: any) => setSearchPrayer(e.target.value)} />
            </div>

            <div className="flex-1 overflow-y-auto mb-6 space-y-2">
              {PRAYERS.filter(p => p.title.toLowerCase().includes(searchPrayer.toLowerCase())).map(p => {
                const isSelected = selectedPrayers.some(s => s.id === p.id);
                return (
                  <button 
                    key={p.id}
                    onClick={() => isSelected ? setSelectedPrayers(prev => prev.filter(s => s.id !== p.id)) : setSelectedPrayers(prev => [...prev, p])}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${isSelected ? 'border-fiat-gold bg-fiat-gold/10 text-fiat-gold' : 'border-white/5 text-gray-400'}`}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>

            <Button variant="sacred" className="w-full h-12" onClick={handleCreatePlan} disabled={!planTitle || selectedPrayers.length === 0}>CRIAR AGORA</Button>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean, label: string, icon: React.ReactNode, onClick: () => void }> = ({ active, label, icon, onClick }) => (
  <button onClick={onClick} className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase transition-all ${active ? 'text-fiat-gold border-b-2 border-fiat-gold' : 'text-gray-600'}`}>
    {icon} {label}
  </button>
);

export default CommunityDetailPage;
