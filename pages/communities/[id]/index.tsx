// src/pages/communities/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, { MessageCircle, Calendar, Users } from 'lucide-react';
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
  const [activeTab] = useState<'chat' | 'plans' | 'members'>('chat'); // só chat por enquanto

  useEffect(() => {
    if (!id) return;

    const fetchCommunity = async () => {
      const { data, error } = await supabase
        .from('communities')
        .select('name, description')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao carregar comunidade:', error);
      } else {
        setCommunity(data);
      }
    };

    fetchCommunity();
  }, [id]);

  if (!community) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-fiat-gold text-2xl">
        Carregando comunidade...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* HEADER FIXO NO TOPO */}
      <header className="sticky top-0 z-0 z-40 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-fiat-gold/20">
        {/* Voltar + Título */}
        <div className="px-6 py-6 flex items-center gap-4">
          <button onClick={() => navigate('/communities')} className="text-fiat-gold">
            <ArrowLeft size={32} />
          </button>
          <div>
            <h1 className="text-3xl font-serif text-fiat-gold">{community.name}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {community.description || 'Rezar o Rosário todos os dias'}
            </p>
          </div>
        </div>

        {/* ABAS FIXAS */}
        <div className="flex gap-10 px-6 py-4 bg-slate-950/95 backdrop-blur border-t border-fiat-gold/10">
          <div className="flex items-center gap-2 text-fiat-gold font-bold border-b-4 border-fiat-gold pb-3">
            <MessageCircle size={22} />
            Chat
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={22} />
            Planos
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Users size={22} />
            Membros
          </div>
        </div>
      </header>

      {/* CONTEÚDO COM SCROLL (menu inferior some ao rolar)
      <main className="h-full overflow-y-auto">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'plans' && (
          <div className="flex flex-col items-center justify-center h-screen text-gray-400 pt-20">
            <Calendar size={80} className="mb-6 opacity-30" />
            <p className="text-xl">Planos de oração em breve</p>
          </div>
        )}
        {activeTab === 'members' && (
          <div className="flex flex-col items-center justify-center h-screen text-gray-400 pt-20">
            <Users size={80} className="mb-6 opacity-30" />
            <p className="text-xl">Lista de membros em breve</p>
          </div>
        )}
      </main>
    </div>
  );
}
