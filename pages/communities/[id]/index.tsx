// src/pages/communities/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Calendar, Users } from 'lucide-react';
import { supabase } from '../../../services/supabase';
import ChatTab from './ChatTab';

interface Community {
  name: string;
  description: string | null;
  is_public: boolean;
}

export default function CommunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<Community | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'plans' | 'members'>('chat');

  useEffect(() => {
    const fetchCommunity = async () => {
      const { data } = await supabase
        .from('communities')
        .select('name, description, is_public')
        .eq('id', id)
        .single();

      if (data) setCommunity(data);
    };

    if (id) fetchCommunity();
  }, [id]);

  if (!community) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-fiat-gold text-2xl">
        Carregando comunidade...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* HEADER + ABAS FIXAS NO TOPO */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-fiat-gold/20">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 pb-6">
          <div className="p-6 flex items-center gap-4">
            <button onClick={() => navigate('/communities')}>
              <ArrowLeft size={32} className="text-fiat-gold" />
            </button>
            <div>
              <h1 className="text-3xl font-serif text-fiat-gold">{community.name}</h1>
              <p className="text-gray-400">{community.description || 'Sem descrição'}</p>
            </div>
          </div>

          {/* ABAS */}
          <div className="flex gap-8 px-6 border-t border-fiat-gold/10">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 flex items-center gap-2 border-b-4 font-medium transition-all ${
                activeTab === 'chat'
                  ? 'border-fiat-gold text-fiat-gold'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <MessageCircle size={20} />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`py-4 flex items-center gap-2 border-b-4 font-medium transition-all ${
                activeTab === 'plans'
                  ? 'border-fiat-gold text-fiat-gold'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <Calendar size={20} />
              Planos
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 flex items-center gap-2 border-b-4 font-medium transition-all ${
                activeTab === 'members'
                  ? 'border-fiat-gold text-fiat-gold'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <Users size={20} />
              Membros
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL - ocupa todo o espaço restante */}
      <main className="flex-1 pb-20 overflow-hidden">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'plans' && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Calendar size={80} className="mx-auto mb-6 opacity-30" />
              <p className="text-2xl">Planos de oração em breve</p>
            </div>
          </div>
        )}
        {activeTab === 'members' && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Users size={80} className="mx-auto mb-6 opacity-30" />
              <p className="text-2xl">Lista de membros em breve</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
