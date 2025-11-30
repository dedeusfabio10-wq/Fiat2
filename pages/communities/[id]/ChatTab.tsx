// src/pages/communities/[id]/ChatTab.tsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../services/supabase';
import { AppContext } from '../../../contexts/AppContext';
import { Send, Loader2 } from 'lucide-react';
import { Button, Input } from '../../../ui/UIComponents';  // CORRIGIDO: vírgula removida aqui
import { toast } from 'sonner';

interface Message {
  id: string;
  message: string;
  user_id: string;
  created_at: string;
  profiles: { name: string };
}

export default function ChatTab() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useContext(AppContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id || !profile) return;

    const load = async () => {
      const { data } = await supabase
        .from('community_messages')
        .select('*, profiles(name)')
        .eq('community_id', id)
        .order('created_at', { ascending: true });
      setMessages(data || []);
    };
    load();

    const channel = supabase
      .channel(`chat_${id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'community_messages', 
        filter: `community_id=eq.${id}` 
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id, profile]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !profile) return;

    const msg = newMessage.trim();
    setNewMessage('');
    setSending(true);

    const { error } = await supabase
      .from('community_messages')
      .insert({ community_id: id, user_id: profile.id, message: msg });

    if (error) {
      toast.error('Erro ao enviar');
      setNewMessage(msg);
    }
    setSending(false);
  };

  return (
    <>
      <div className="px-4 space-y-4 pb-20">
        {messages.length === 0 ? (
          <div className="text-center pt-32 text-gray-400">
            <p className="text-2xl font-light">Nenhuma mensagem ainda.</p>
            <p className="text-lg mt-3">Seja o primeiro a rezar!</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.user_id === profile?.id ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-[80%] px-5 py-3 rounded-2xl ${msg.user_id === profile?.id ? 'bg-fiat-gold text-black' : 'bg-slate-700'}`}>
                <p className="font-bold text-sm">{msg.profiles.name}</p>
                <p className="mt-1">{msg.message}</p>
                <p className="text-xs opacity-70 text-right mt-2">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      {/* INPUT FIXO ACIMA DO MENU INFERIOR */}
      <div className="fixed bottom-20 left-0 right-0 bg-slate-950 border-t border-fiat-gold/30 px-4 py-3 z-50 shadow-2xl">
        <form onSubmit={send} className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Ave Maria Puríssima..."
            className="flex-1 bg-black/50 border border-fiat-gold/60 text-white placeholder-gray-400 focus:border-fiat-gold"
          />
          <Button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="bg-fiat-gold hover:bg-yellow-500 text-black font-bold px-6 rounded-lg transition"
          >
            {sending ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
          </Button>
        </form>
      </div>
    </>
  );
}
