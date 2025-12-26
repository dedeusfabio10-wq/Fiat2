// src/pages/communities/[id]/ChatTab.tsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../services/supabase';
import { AppContext } from '../../../contexts/AppContext';
import { Send, Loader2 } from 'lucide-react';
import { Button, Input } from '../../../ui/UIComponents';
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

  // Carrega mensagens + realtime
  useEffect(() => {
    if (!id || !profile?.id) return;

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
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_messages',
          filter: `community_id=eq.${id}`,
        },
        (payload: { new: Message }) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, profile?.id]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !profile?.id) return;

    const msg = newMessage.trim();
    setNewMessage('');
    setSending(true);

    const { error } = await supabase
      .from('community_messages')
      .insert({
        community_id: id,
        user_id: profile.id,
        message: msg,
      });

    if (error) {
      toast.error('Erro ao enviar mensagem');
      setNewMessage(msg); // devolve a mensagem se der erro
    }
    setSending(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Área das mensagens – ocupa todo o espaço disponível */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
        {messages.length === 0 ? (
          <div className="text-center pt-32 text-gray-400">
            <p className="text-2xl font-light">Nenhuma mensagem ainda.</p>
            <p className="text-lg mt-3">Seja o primeiro a rezar!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.user_id === profile?.id ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-lg ${
                  msg.user_id === profile?.id
                    ? 'bg-fiat-gold text-black'
                    : 'bg-slate-700 text-white'
                }`}
              >
                <p className="font-bold text-sm">{msg.profiles.name}</p>
                <p className="mt-1 break-words">{msg.message}</p>
                <p className="text-xs opacity-70 text-right mt-2">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input fixo no final – sempre acima da barra de menu do app */}
      <div className="border-t border-fiat-gold/30 bg-slate-950 px-4 py-4">
        <form onSubmit={send} className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ave Maria Puríssima..."
            className="flex-1 bg-black/60 border border-fiat-gold/70 text-white placeholder-gray-400 focus:border-fiat-gold rounded-xl"
            autoFocus
          />
          <Button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="bg-fiat-gold hover:bg-yellow-500 text-black font-bold px-8 rounded-xl shadow-lg"
          >
            {sending ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
          </Button>
        </form>
      </div>
    </div>
  );
}
