import React, { useState, useEffect, useContext } from 'react';
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
  const [loading, setLoading] = useState(true);

  // Carrega mensagens
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel(`community_${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_messages', filter: `community_id=eq.${id}` }, payload => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from('community_messages')
      .select('*, profiles(name)')
      .eq('community_id', id)
      .order('created_at', { ascending: true });
    setMessages(data || []);
    setLoading(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const { error } = await supabase
      .from('community_messages')
      .insert({
        community_id: id,
        user_id: profile.id,
        message: newMessage.trim()
      });

    if (error) {
      toast.error('Erro ao enviar');
    } else {
      setNewMessage('');
    }
    setSending(false);
  };

  if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin text-fiat-gold mx-auto" size={50} /></div>;

  return (
    <div className="h-full flex flex-col pb-20">
      {messages.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl mb-4">Nenhuma mensagem ainda.</p>
          <p>Seja o primeiro a rezar!</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.user_id === profile.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-2xl ${msg.user_id === profile.id ? 'bg-fiat-gold text-black' : 'bg-slate-700'}`}>
                <p className="font-semibold text-sm">{msg.profiles.name}</p>
                <p className="mt-1">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={sendMessage} className="fixed bottom-20 left-0 right-0 bg-slate-950 border-t border-fiat-gold/30 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Escreva sua oração ou mensagem..."
            className="flex-1 bg-black/40 border-fiat-gold/50"
            disabled={sending}
          />
          <Button type="submit" disabled={sending || !newMessage.trim()} className="bg-fiat-gold text-black">
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </Button>
        </div>
      </form>
    </div>
  );
}
