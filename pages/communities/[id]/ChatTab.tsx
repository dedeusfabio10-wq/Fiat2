import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../services/supabase';
import { AppContext } from '../../../contexts/AppContext';
import { Send, Loader2 } from 'lucide-react';
import { Button, Input } from '../../../ui/UIComponents';
import { toast } from 'sonner'; // ← ERA SÓ ISSO QUE FALTAVA: a vírgula aqui!

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('community_messages')
        .select('*, profiles(name)')
        .eq('community_id', id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error(error);
        toast.error('Erro ao carregar mensagens');
      } else {
        setMessages((data as Message[]) || []);
      }
      setLoading(false);
    };

    loadMessages();

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
        (payload: { new: Message }) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !profile?.id) return;

    setSending(true);

    const { error } = await supabase.from('community_messages').insert({
      community_id: id,
      user_id: profile.id,
      message: newMessage.trim(),
    });

    if (error) {
      toast.error('Erro ao enviar mensagem');
      console.error(error);
    } else {
      setNewMessage('');
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-fiat-gold" size={60} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6">
          <p className="text-xl mb-2">Nenhuma mensagem ainda.</p>
          <p className="text-lg">Seja o primeiro a rezar!</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.user_id === profile?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  msg.user_id === profile?.id
                    ? 'bg-fiat-gold text-black'
                    : 'bg-slate-700 text-white'
                }`}
              >
                <p className="font-semibold text-sm">{msg.profiles.name}</p>
                <p className="mt-1">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-fiat-gold/30 p-4 z-50"
      >
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escreva sua oração ou mensagem..."
            className="flex-1 bg-black/40 border-fiat-gold/50 focus:border-fiat-gold"
            disabled={sending}
          />
          <Button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="bg-fiat-gold hover:bg-yellow-500 text-black font-bold px-6 transition"
          >
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </Button>
        </div>
      </form>
    </div>
  );
}
