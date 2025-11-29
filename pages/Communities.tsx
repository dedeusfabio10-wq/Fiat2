
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { supabase, createCommunity, getCommunities, getUserCommunities } from '../services/supabase';
import { Community } from '../types';
import { Button, Card, Input } from '../ui/UIComponents';
import { ArrowLeft, Plus, Users, Globe, Lock, Loader2, X } from 'lucide-react';

const CommunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const [myCommunities, setMyCommunities] = useState<Community[]>([]);
  const [publicCommunities, setPublicCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my' | 'explore'>('my');

  // Modal para criar comunidade
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (profile.email) {
      const myData = await getUserCommunities(profile.email); // Assumindo que o ID do perfil é o email
      const publicData = await getCommunities();
      setMyCommunities(myData);
      setPublicCommunities(publicData.filter(p => !myData.some(m => m.id === p.id))); // Mostra apenas as que não participa
    }
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !profile.email) return;

    setIsCreating(true);
    const newCommunity = await createCommunity(newName, newDesc, isPublic, profile.email);
    setIsCreating(false);

    if (newCommunity) {
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      navigate(`/communities/${newCommunity.id}`);
    } else {
      alert("Erro ao criar comunidade.");
    }
  };

  const renderList = (list: Community[]) => {
    if (loading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-fiat-gold" /></div>;
    if (list.length === 0) return <p className="text-center text-fiat-muted text-sm py-10 italic">Nenhuma comunidade encontrada.</p>;

    return (
      <div className="space-y-4">
        {list.map(community => (
          <Card 
            key={community.id}
            onClick={() => navigate(`/communities/${community.id}`)}
            className="bg-fiat-card-blue flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-fiat-gold border border-white/10">
                    {community.is_public ? <Globe size={20} /> : <Lock size={20} />}
                </div>
                <div>
                    <h3 className="font-serif text-white">{community.name}</h3>
                    <p className="text-xs text-fiat-muted">{community.members_count || 1} membros</p>
                </div>
            </div>
            <div className="text-fiat-gold">›</div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 pb-32 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="!p-2 text-gray-400 hover:text-white rounded-full">
            <ArrowLeft size={24} />
        </Button>
        <h1 className="text-2xl font-serif text-white">Comunidades</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-fiat-card-blue rounded-lg p-1 border border-white/5">
            <button onClick={() => setActiveTab('my')} className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'my' ? 'bg-fiat-gold text-fiat-navy' : 'text-gray-400'}`}>
                Minhas Comunidades
            </button>
            <button onClick={() => setActiveTab('explore')} className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'explore' ? 'bg-fiat-gold text-fiat-navy' : 'text-gray-400'}`}>
                Explorar
            </button>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)} className="gap-2 bg-fiat-gold text-fiat-navy">
            <Plus size={16} /> Criar
        </Button>
      </div>

      {activeTab === 'my' && renderList(myCommunities)}
      {activeTab === 'explore' && renderList(publicCommunities)}
      
      {/* MODAL DE CRIAÇÃO */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-fiat-card w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl relative">
                <button onClick={() => setShowCreate(false)} className="absolute top-4 right-4 text-fiat-muted hover:text-white"><X /></button>
                <h2 className="font-serif text-xl text-fiat-gold mb-6">Criar Nova Comunidade</h2>
                <form onSubmit={handleCreate} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-fiat-muted mb-2">Nome da Comunidade</label>
                        <Input value={newName} onChange={e => setNewName(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-fiat-muted mb-2">Descrição (opcional)</label>
                        <Input value={newDesc} onChange={e => setNewDesc(e.target.value)} />
                    </div>
                    <div className="flex gap-4">
                        <button type="button" onClick={() => setIsPublic(true)} className={`flex-1 p-4 rounded-lg border-2 flex items-center gap-3 ${isPublic ? 'border-fiat-gold bg-fiat-gold/10' : 'border-white/10 bg-black/20'}`}>
                            <Globe className={isPublic ? 'text-fiat-gold' : 'text-fiat-muted'} />
                            <div>
                                <p className="font-bold text-white">Pública</p>
                                <p className="text-xs text-fiat-muted">Qualquer um pode entrar.</p>
                            </div>
                        </button>
                        <button type="button" onClick={() => setIsPublic(false)} className={`flex-1 p-4 rounded-lg border-2 flex items-center gap-3 ${!isPublic ? 'border-fiat-gold bg-fiat-gold/10' : 'border-white/10 bg-black/20'}`}>
                            <Lock className={!isPublic ? 'text-fiat-gold' : 'text-fiat-muted'} />
                            <div>
                                <p className="font-bold text-white">Privada</p>
                                <p className="text-xs text-fiat-muted">Apenas por convite.</p>
                            </div>
                        </button>
                    </div>
                    <Button fullWidth disabled={isCreating} className="mt-4">
                        {isCreating ? <Loader2 className="animate-spin"/> : 'Confirmar e Criar'}
                    </Button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesPage;
