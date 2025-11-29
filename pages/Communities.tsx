// src/pages/Communities.tsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { supabase, createCommunity, getCommunities, getUserCommunities, joinCommunity } from '../services/supabase';
import { Community } from '../types';
import { Button, Card, Input } from '../ui/UIComponents';
import { ArrowLeft, Plus, Users, Globe, Lock, Loader2, X, UserPlus, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const CommunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, refreshProfile } = useContext(AppContext);

  const [myCommunities, setMyCommunities] = useState<Community[]>([]);
  const [publicCommunities, setPublicCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my' | 'explore'>('my');

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (profile.id) fetchData();
  }, [profile.id]);

  const fetchData = async () => {
    if (!profile.id) return;
    setLoading(true);
    try {
      const [myData, allPublic] = await Promise.all([
        getUserCommunities(profile.id),
        getCommunities()
      ]);

      setMyCommunities(myData || []);

      const myIds = (myData || []).map((c: Community) => c.id);
      const exploreList = (allPublic || []).filter((c: Community) =>
        c.is_public && !myIds.includes(c.id)
      );

      setPublicCommunities(exploreList);
    } catch (err) {
      toast.error("Erro ao carregar comunidades");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !profile.id) return;

    setIsCreating(true);
    const newCommunity = await createCommunity(newName, newDesc, isPublic, profile.id);
    setIsCreating(false);

    if (newCommunity) {
      toast.success("Comunidade criada com sucesso!");
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      await fetchData();
      navigate(`/communities/${newCommunity.id}`);
    } else {
      toast.error("Erro ao criar comunidade");
    }
  };

  const handleJoin = async (communityId: string) => {
    if (!profile.id) return;
    const success = await joinCommunity(communityId, profile.id);
    if (success) {
      toast.success("Você entrou na comunidade!");
      await fetchData();
    } else {
      toast.error("Erro ao entrar");
    }
  };

  const renderCard = (c: Community, isMember: boolean = false) => (
    <Card
      key={c.id}
      onClick={() => isMember ? navigate(`/communities/${c.id}`) : handleJoin(c.id)}
      className="bg-fiat-card-blue p-5 flex items-center justify-between cursor-pointer hover:bg-fiat-card-blue/80 transition-all border border-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center text-fiat-gold border border-white/10">
          {c.is_public ? <Globe size={24} /> : <Lock size={24} />}
        </div>
        <div>
          <h3 className="font-serif text-white text-lg">{c.name}</h3>
          <p className="text-xs text-fiat-muted">
            {c.members_count || 1} {c.members_count === 1 ? 'membro' : 'membros'}
          </p>
        </div>
      </div>
      {isMember ? (
        <ArrowRight className="text-fiat-gold" size={24} />
      ) : (
        <Button size="sm" onClick={(e) => { e.stopPropagation(); handleJoin(c.id); }} className="gap-2">
          <UserPlus size={16} /> Entrar
        </Button>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" className="p-2" onClick={() => navigate(-1)}>
            <ArrowLeft size={28} />
          </Button>
          <h1 className="text-3xl font-serif text-fiat-gold">Comunidades</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex bg-fiat-card-blue/50 backdrop-blur rounded-xl p-1 border border-fiat-gold/20">
            <button
              onClick={() => setActiveTab('my')}
              className={`px-6 py-2 rounded-lg text-sm font-bold ${activeTab === 'my' ? 'bg-fiat-gold text-fiat-navy' : 'text-gray-400'}`}
            >
              Minhas
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-6 py-2 rounded-lg text-sm font-bold ${activeTab === 'explore' ? 'bg-fiat-gold text-fiat-navy' : 'text-gray-400'}`}
            >
              Explorar
            </button>
          </div>
          <Button onClick={() => setShowCreate(true)} className="bg-fiat-gold text-fiat-navy gap-2">
            <Plus size={18} /> Criar
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-fiat-gold" size={40} />
          </div>
        ) : activeTab === 'my' ? (
          myCommunities.length === 0 ? (
            <p className="text-center py-20 text-fiat-muted italic">Você ainda não está em nenhuma comunidade.</p>
          ) : (
            <div className="space-y-4">
              {myCommunities.map(c => renderCard(c, true))}
            </div>
          )
        ) : (
          publicCommunities.length === 0 ? (
            <p className="text-center py-20 text-fiat-muted italic">Nenhuma comunidade pública no momento.</p>
          ) : (
            <div className="space-y-4">
              {publicCommunities.map(c => renderCard(c))}
            </div>
          )
        )}
      </div>

      {/* Modal de criação - você já tem um lindo, mantenha o seu */}
      {showCreate && (
        // ... seu modal lindo aqui
      )}
    </div>
  );
};

export default CommunitiesPage;
