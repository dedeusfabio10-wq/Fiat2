// src/pages/CommunityDetail.tsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { supabase } from '../services/supabase';
import { Button, Input } from '../ui/UIComponents';
import { 
  ArrowLeft, Send, Users, BookOpen, MessageCircle, 
  Crown, Globe, Lock, LogOut, Loader2 
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CommunityMessage {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  profiles: {
    name: string;
    photo?: string;
  } | null;
}

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const [community, setCommunity] = useState<any>(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'plans' | 'members'>('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id || !profile.id) return;

    fetchCommunity();
    
    const channel = supabase
      .channel(`community_${id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_messages',
          filter: `community_id=eq.${id}`
        },
        (payload) => {
          const newMsg = payload.new as any;
          // Busca nome/foto do usuário
          supabase
            .from('profiles')
            .select('name, photo')
            .eq('id', newMsg.sender_id)
            .single()
            .then(({ data }) => {
              setMessages(prev => [...prev, { ...newMsg, profiles: data }]);
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, profile.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchCommunity = async () => {
    if (!id) return;
    setLoading(true);

    const { data: comm } = await supabase
      .from('communities')
      .select('*, community_members(count)')
      .eq('id', id)
      .single();

    const { data: msgs } = await supabase
      .from('community_messages')
      .select('*, profiles(name, photo)')
      .eq('community_id', id)
      .order('created_at', { ascending: true });

    setCommunity({
      ...comm,
      members_count: comm.community_members[0]?.count || 1
    });
    setMessages(msgs || []);
    setLoading(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !id || !profile.id) return;

    const { error } = await supabase
      .from('community_messages')
      .insert({
        community_id: id,
        sender_id: profile.id,
        content: newMessage.trim()
      });

    if (error) {
      toast.error("Erro ao enviar mensagem");
    } else {
      setNewMessage('');
    }
  };

  const leaveCommunity = async () => {
    if (!profile.id || !id) return;

    await supabase
      .from('community_members')
      .delete()
      .eq('community_id', id)
      .eq('user_id', profile.id);

    toast.success("Você saiu da comunidade");
    navigate('/communities');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-fiat-gold" size={50} />
      </div>
    );
  }

  if (!community) {
    return <div className="p-8 text-center text-white">Comunidade não encontrada</div>;
  }

  const isAdmin = community.created_by === profile.id;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <div className="bg-fiat-card-blue/90 backdrop-blur-xl border-b border-fiat-gold/30 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="text-white" size={28} />
            </Button>
            <div>
              <h1 className="text-xl font-serif text-fiat-gold flex items-center gap-2">
                {community.name}
                {isAdmin && <Crown size={18} className="text-fiat-gold" title="Administrador" />}
              </h1>
              <p className="text-xs text-fiat-muted flex items-center gap-2">
                {community.is_public ? <Globe size={14} /> : <Lock size={14} />}
                {community.members_count} {community.members_count === 1 ? 'membro' : 'membros'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={leaveCommunity} className="text-red-400 hover:text-red-300">
            <LogOut size={20} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-black/40 border-b border-fiat-gold/10">
        <TabButton icon={<MessageCircle />} label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <TabButton icon={<BookOpen />} label="Planos" active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} />
        <TabButton icon={<Users />} label="Membros" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chat' && (
          <div className="p-4 space-y-4 pb-24">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-fiat-muted">
                <MessageCircle size={60} className="mx-auto mb-4 opacity-20" />
                <p className="italic text-lg">Nenhuma mensagem ainda</p>
                <p className="text-sm mt-2">Seja o primeiro a rezar com os irmãos!</p>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.sender_id === profile.id;
                return (
                  <div key={msg.id} className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <div className="w-9 h-9 rounded-full bg-fiat-gold/20 flex items-center justify-center text-fiat-gold text-sm font-bold border border-fiat-gold/30">
                        {msg.profiles?.name?.[0] || '?'}
                      </div>
                    )}
                    <div className={`max-w-xs px-4 py-3 rounded-2xl ${isMe ? 'bg-fiat-gold text-fiat-navy' : 'bg-fiat-card-blue text-white'} shadow-lg`}>
                      {!isMe && <p className="text-xs font-bold opacity-80 mb-1">{msg.profiles?.name || 'Anônimo'}</p>}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className="text-[10px] opacity-60 mt-2 text-right">
                        {format(new Date(msg.created_at), "HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="p-8 text-center text-fiat-muted">
            <BookOpen size={80} className="mx-auto mb-6 opacity-20" />
            <p className="text-xl italic">Planos de oração em grupo</p>
            <p className="mt-4">Em breve: novenas coletivas, terços marcados, jejuns compartilhados</p>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="p-8 text-center text-fiat-muted">
            <Users size={80} className="mx-auto mb-6 opacity-20" />
            <p className="text-xl italic">Lista de membros</p>
            <p className="mt-4">Em breve: ver quem está rezando com você</p>
          </div>
        )}
      </div>

      {/* Input de mensagem */}
      {activeTab === 'chat' && (
        <form onSubmit={sendMessage} className="fixed bottom-0 left-0 right-0 bg-fiat-card-blue border-t border-fiat-gold/30 p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Escreva uma oração, pedido ou mensagem..."
              className="flex-1 bg-black/40 border-fiat-gold/30 focus:border-fiat-gold text-white placeholder-fiat-muted"
            />
            <Button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="bg-fiat-gold text-fiat-navy hover:bg-fiat-gold/90 rounded-full w-14 h-14 p-0 shadow-lg"
            >
              <Send size={22} />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

const TabButton: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ 
  icon, label, active, onClick 
}) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-1 py-4 transition-all ${
      active 
        ? 'text-fiat-gold border-b-2 border-fiat-gold' 
        : 'text-gray-500 hover:text-white'
    }`}
  >
    {icon}
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default CommunityDetailPage;
