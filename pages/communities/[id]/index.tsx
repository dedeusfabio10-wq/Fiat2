// src/pages/communities/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { supabase } from '../../../services/supabase';
import ChatTab from './ChatTab';

export default function CommunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await supabase
        .from('communities')
        .select('name, description')
        .eq('id', id)
        .single();
      setCommunity(data);
    };
    fetch();
  }, [id]);

  if (!community) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-fiat-gold text-2xl">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32"> {/* ← pb-32 reserva espaço pra barra inferior */}
      {/* HEADER NORMAL (não sticky) - rola junto com o conteúdo */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-fiat-gold/20">
        <div className="px-6 py-6 flex items-center gap-4">
          <button onClick={() => navigate('/communities')}>
            <ArrowLeft size={32} className="text-fiat-gold" />
          </button>
          <div>
            <h1 className="text-3xl font-serif text-fiat-gold">{community.name}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {community.description || 'Rezar o Rosário todos os dias'}
            </p>
          </div>
        </div>
        {/* ABAS FIXAS NO HEADER */}
        <div className="flex gap-10 px-6 py-4 bg-slate-950 border-t border-fiat-gold/10">
          <div className="flex items-center gap-2 text-fiat-gold font-bold border-b-4 border-fiat-gold pb-3">
            <MessageCircle size={22} />
            Chat
          </div>
          {/* Futuras abas: Planos e Membros */}
          {/* <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={22} />
            Planos
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users size={22} />
            Membros
          </div> */}
        </div>
      </header>

      {/* CONTEÚDO ROLÁVEL - ocupa o resto da tela */}
      <div className="overflow-y-auto">
        <ChatTab />
      </div>
    </div>
  );
}
