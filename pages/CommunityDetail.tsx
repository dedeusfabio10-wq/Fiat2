import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import {
  supabase,
  getCommunityById,
  getCommunityMessages,
  sendCommunityMessage,
} from '../services/supabase';
import { Community, CommunityMessage } from '../types';
import { Button, Input } from '../ui/UIComponents';
import {
  ArrowLeft,
  Send,
  Users,
  BookOpen,
  Loader2,
  MessageCircle,
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
  const [activeTab, setActiveTab] = useState<'chat' | 'plans' | 'members'>('chat');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Carrega dados iniciais + Realtime
  useEffect(() => {
    if (!id || !profile.id) return;

    const loadInitialData = async () => {
      setLoading(true);
      const [commData, msgData] = await Promise.all([
        getCommunityById(id),
        getCommunityMessages(id),
      ]);
      setCommunity(commData);
      setMessages(msgData || []);
      setLoading(false);
    };

    loadInitialData();

    // Realtime: novas mensagens
    const channel = supabase
      .channel(`community_${id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_messages',
          filter: `community_id=eq.${id}`,
        },
        async (payload: any) => { // <-- tipagem explícita (resolve TS7006)
          const { data: sender } = await supabase
            .from('profiles')
            .select('name, photo')
            .eq('id', payload.new.sender_id)
            .single();

          const fullMessage: CommunityMessage = {
            ...payload.new,
            profiles: sender || { name: 'Anônimo', photo: null },
          };

          setMessages((prev) => [...prev, fullMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, profile.id]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !id || !profile.id) return;

    const success = await sendCommunityMessage(id, profile.id, newMessage.trim());

    if (success) {
      setNewMessage('');
    } else {
      toast.error('Erro ao enviar mensagem');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader2 className="animate-spin text-fiat-gold" size={50} />
      </div>
    );
  }

  if (!community) {
    return <div className="p-8 text-center text-white">Comunidade não encontrada.</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-white/10 bg-fiat-card/90 backdrop-blur">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex-1">
          <h1 className="font-serif text-xl text-white">{community.name}</h1>
          {community.description && (
            <p className="text-xs text-fiat-muted">{community.description}</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-black/50">
        <TabButton
          icon={<MessageCircle size={18} />}
          label="Chat"
          active={activeTab === 'chat'}
          onClick={() => setActiveTab('chat')}
        />
        <TabButton
          icon={<BookOpen size={18} />}
          label="Planos"
          active={activeTab === 'plans'}
          onClick={() => setActiveTab('plans')}
        />
        <TabButton
          icon={<Users size={18} />}
          label="Membros"
          active={activeTab === 'members'}
          onClick={() => setActiveTab('members')}
        />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'chat' && (
          <>
            {messages.length === 0 ? (
              <p className="text-center text-fiat-muted py-10 italic">
                Nenhuma mensagem ainda. Seja o primeiro a rezar!
              </p>
            ) : (
              messages.map((msg) => {
                const isMe = msg.sender_id === profile.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                  >
                    {!isMe && (
                      <div className="w-9 h-9 rounded-full bg-fiat-gold/20 flex items-center justify-center text-fiat-gold text-sm font-bold flex-shrink-0">
                        {msg.profiles?.name?.[0] || '?'}
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl ${
                        isMe
                          ? 'bg-fiat-gold text-fiat-navy rounded-br-none'
                          : 'bg-fiat-card-blue text-white rounded-bl-none'
                      }`}
                    >
                      {!isMe && (
                        <p className="text-xs font-bold text-fiat-gold mb-1">
                          {msg.profiles?.name || 'Anônimo'}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className="text-[10px] opacity-60 mt-1 text-right">
                        {new Date(msg.created_at).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </>
        )}

        {activeTab === 'plans' && (
          <p className="text-center text-fiat-muted py-20 italic">
            Planos de oração em breve
          </p>
        )}

        {activeTab === 'members' && (
          <p className="text-center text-fiat-muted py-20 italic">
            Lista de membros em breve
          </p>
        )}
      </div>

      {/* Input de mensagem */}
      {activeTab === 'chat' && (
        <div className="p-4 border-t border-white/10 bg-fiat-card">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escreva sua mensagem..."
              className="flex-1 bg-black/40 border-white/10 focus:border-fiat-gold"
              autoFocus
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="rounded-full w-12 h-12 p-0 bg-fiat-gold hover:bg-fiat-gold/90 text-fiat-navy"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

// Componente auxiliar
const TabButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
      active
        ? 'text-fiat-gold border-b-2 border-fiat-gold'
        : 'text-fiat-muted hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

export default CommunityDetailPage;
