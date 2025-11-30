// src/pages/communities/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Calendar, Users } from 'lucide-react';
import { supabase } from '../../../services/supabase';
import ChatTab from './ChatTab';

interface Community {
  name: string;
  description: string | null;
}

export default function CommunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<Community | null>(null);
  const [activeTab] = useState<'chat' | 'plans' | 'members'>('chat');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('communities')
        .select('name, description')
        .eq('id', id)
        .single();
      setCommunity(data);
    };
    if (id) fetch();
  }, [id]);

  if (!community) {
    return (
  <div className="min-h-screen bg-slate-950 text-white pb-20"> {/* ← ESSA É A CHAVE: pb-20 */}
    {/* HEADER FIXO */}
    <header className="sticky top-0 z-40 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-fiat-gold/20">
      <div className="p-6 flex items-center gap-4">
        <button onClick={() => navigate('/communities')}>
          <ArrowLeft size={32} className="text-fiat-gold" />
        </button>
        <div>
          <h1 className="text-3xl font-serif text-fiat-gold">{community.name}</h1>
          <p className="text-gray-400">{community.description || 'Rezar o Rosário todos os dias'}</p>
        </div>
      </div>

      {/* ABAS FIXAS */}
      <div className="flex gap-8 px-6 py-3 bg-slate-950 border-t border-fiat-gold/10">
        <div className="flex items-center gap-2 text-fiat-gold font-bold border-b-4 border-fiat-gold pb-3">
          <MessageCircle size={20} />
          Chat
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={20} />
          Planos
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Users size={20} />
          Membros
        </div>
      </div>
    </header>

    {/* CHAT COM SCROLL E MENU RETRÁTIL */}
    <div className="h-full overflow-y-auto"> {/* ← permite scroll */}
      <ChatTab />
    </div>
  </div>
);
