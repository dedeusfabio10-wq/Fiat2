import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { supabase, getCommunityById, getCommunityMessages, sendCommunityMessage } from '../services/supabase';
import { Community, CommunityMessage } from '../types';
import { Button, Input } from '../ui/UIComponents';
import { ArrowLeft, Send, Users, BookOpen, Loader2, MessageCircle } from 'lucide-react';
import { RealtimeChannel } from '@supabase/supabase-js';

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'plans' | 'members'>('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchData(id);

      // Assinar canal de Realtime para o chat
      const channel: RealtimeChannel = supabase
        .channel(`community_chat_${id}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'community_messages', filter: `community_id=eq.${id}` },
          (payload) => {
            // Precisamos buscar o perfil para ter o nome
            const fetchNewMessage = async () => {
                const { data } = await supabase.from('profiles').select('name, photo').eq('id', payload.new.sender_id).single();
                const msgWithProfile = { ...payload.new, profiles: data };
                setMessages(prev => [...prev, msgWithProfile as CommunityMessage]);
            };
            fetchNewMessage();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);

  useEffect(() => {
    // Scroll para a última mensagem
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchData = async (communityId: string) => {
    setLoading(true);
    const communityData = await getCommunityById(communityId);
    const messagesData = await getCommunityMessages(communityId);
    setCommunity(communityData);
    setMessages(messagesData);
    setLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !id || !profile.email) return;

    const success = await sendCommunityMessage(id, profile.email, newMessage);
    if (success) {
      setNewMessage('');
    } else {
      alert("Erro ao enviar mensagem.");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-fiat-gold" /></div>;
  if (!community) return <div className="p-8 text-center">Comunidade não encontrada.</div>;

  return (
    <div className="h-screen flex flex-col bg-fiat-dark">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-fiat-card/80 backdrop-blur-md">
        <Button variant="ghost" onClick={() => navigate(-1)} className="!p-2 rounded-full"><ArrowLeft /></Button>
        <div>
            <h1 className="font-serif text-white">{community.name}</h1>
            <p className="text-xs text-fiat-muted">{community.description}</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex justify-center p-2 bg-black/20 border-b border-white/5">
        <TabButton icon={<MessageCircle size={16}/>} label="Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
        <TabButton icon={<BookOpen size={16}/>} label="Planos" active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} />
        <TabButton icon={<Users size={16}/>} label="Membros" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'chat' && (
          <>
            {messages.map((msg) => {
              const isMe = msg.sender_id === profile.email;
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : ''}`}>
                  {!isMe && <div className="w-6 h-6 rounded-full bg-fiat-gold/20 text-fiat-gold text-xs flex items-center justify-center font-bold">{msg.profiles?.name?.[0] || '?'}</div>}
                  <div className={`max-w-[70%] p-3 rounded-2xl ${isMe ? 'bg-fiat-gold text-fiat-navy rounded-br-md' : 'bg-fiat-card-blue text-white rounded-bl-md'}`}>
                    {!isMe && <p className="text-xs font-bold text-fiat-gold mb-1">{msg.profiles?.name || 'Anônimo'}</p>}
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] opacity-50 mt-1 text-right">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </>
        )}
        {activeTab === 'plans' && <p className="text-center text-fiat-muted text-sm py-10">Planos compartilhados em breve.</p>}
        {activeTab === 'members' && <p className="text-center text-fiat-muted text-sm py-10">Lista de membros em breve.</p>}
      </div>

      {/* Chat Input */}
      {activeTab === 'chat' && (
        <div className="p-4 bg-fiat-card border-t border-white/5">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-black/30"
                />
                <Button type="submit" className="rounded-full w-12 h-12 p-0"><Send /></Button>
            </form>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${active ? 'bg-fiat-gold/10 text-fiat-gold' : 'text-fiat-muted hover:text-white'}`}>
        {icon} {label}
    </button>
);

export default CommunityDetailPage;
