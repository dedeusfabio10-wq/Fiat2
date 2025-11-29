// src/pages/communities/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
      setCommunity(data);
    };
    fetchCommunity();
  }, [id]);

  if (!community) {
    return <div className="text-center py-20 text-fiat-gold">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 pb-6 border-b border-fiat-gold/20">
        <div className="p-6 flex items-center gap-4">
          <button onClick={() => navigate('/communities')}>
            <ArrowLeft size={32} className="text-fiat-gold" />
          </button>
          <div>
            <h1 className="text-3xl font-serif text-fiat-gold">{community.name}</h1>
            <p className="text-gray-400">{community.description || 'Sem descrição'}</p>
          </div>
        </div>

        {/* Abas */}
        <div className="flex gap-8 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-4 flex items-center gap-2 border-b-4 transition-all ${
              activeTab === 'chat' ? 'border-fiat-gold text-fiat-gold' : 'border-transparent text-gray-500'
            }`}
          >
            <MessageCircle size={20} />
            Chat
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`py-4 flex items-center gap-2 border-b-4 transition-all ${
              activeTab === 'plans' ? 'border-fiat-gold text-fiat-gold' : 'border-transparent text-gray-500'
            }`}
          >
            <Calendar size={20} />
            Planos
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`py-4 flex items-center gap-2 border-b-4 transition-all ${
              activeTab === 'members' ? 'border-fiat-gold text-fiat-gold' : 'border-transparent text-gray-500'
            }`}
          >
            <Users size={20} />
            Membros
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-6">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'plans' && (
          <div className="text-center py-20 text-gray-400">
            <Calendar size={80} className="mx-auto mb-6 opacity-30" />
            <p className="text-xl">Planos de oração em breve</p>
          </div>
        )}
        {activeTab === 'members' && (
          <div className="text-center py-20 text-gray-400">
            <Users size={80} className="mx-auto mb-6 opacity-30" />
            <p className="text-xl">Lista de membros em breve</p>
          </div>
        )}
      </div>
    </div>
  );
}
