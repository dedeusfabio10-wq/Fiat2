import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import {
  supabase,
  createCommunity,
  getCommunities,
  getUserCommunities,
  joinCommunity
} from '../services/supabase';
import { Community } from '../types';
import { Button, Card, Input } from '../ui/UIComponents';
import {
  ArrowLeft,
  Plus,
  Users,
  Globe,
  Lock,
  Loader2,
  X,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';

const CommunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const [myCommunities, setMyCommunities] = useState<Community[]>([]);
  const [publicCommunities, setPublicCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my' | 'explore'>('my');

  // Modal de criação
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Carrega dados sempre que o profile.id existir
  useEffect(() => {
    if (profile.id) {
      fetchData();
    }
  }, [profile.id]);

  const fetchData = async () => {
    if (!profile.id) return;

    setLoading(true);
    try {
      // Tipagem explícita para remover erro TS7006
      const [myData, allPublic]: [Community[] | null, Community[] | null] = await Promise.all([
        getUserCommunities(profile.id),
        getCommunities()
      ]);

      const myList = myData || [];
      setMyCommunities(myList);

      const myIds = myList.map(c => c.id);
      const exploreList = (allPublic || []).filter(
        c => c.is_public && !myIds.includes(c.id)
      );

      setPublicCommunities(exploreList);
    } catch (err) {
      toast.error('Erro ao carregar comunidades');
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
      toast.success('Comunidade criada com sucesso!');
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      navigate(`/communities/${newCommunity.id}`);
    } else {
      toast.error('Erro ao criar comunidade');
    }
  };

  const handleJoin = async (communityId: string) => {
    if (!profile.id) return;
    const success = await joinCommunity(communityId, profile.id);
    if (success) {
      toast.success('Você entrou na comunidade!');
      await fetchData();
    } else {
      toast.error('Erro ao entrar');
    }
  };

  const renderCard = (community: Community, isMember: boolean = false) => (
    <Card
      key={community.id}
      onClick={() => (isMember ? navigate(`/communities/${community.id}`) : handleJoin(community.id))}
      className="bg-fiat-card-blue p-5 flex items-center justify-between cursor-pointer hover:bg-fiat-card-blue/80 transition-all border border-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center text-fiat-gold border border-white/10">
          {community.is_public ? <Globe size={24} /> : <Lock size={24} />}
        </div>
        <div>
          <h3 className="font-serif text-white text-lg">{community.name}</h3>
          <p className="text-xs text-fiat-muted">
            {community.members_count || 1} {community.members_count === 1 ? 'membro' : 'membros'}
          </p>
        </div>
      </div>

      {isMember ? (
        <ArrowRight className="text-fiat-gold" size={24} />
      ) : (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleJoin(community.id);
          }}
          className="bg-fiat-gold text-fiat-navy hover:bg-fiat-gold/90 gap-2"
        >
          <UserPlus size={16} /> Entrar
        </Button>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-white rounded-full"
          >
            <ArrowLeft size={28} />
          </Button>
          <h1 className="text-3xl font-serif text-fiat-gold">Comunidades</h1>
        </div>

        {/* Tabs + Botão Criar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-fiat-card-blue/50 backdrop-blur rounded-xl p-1 border border-fiat-gold/20">
            <button
              onClick={() => setActiveTab('my')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'my' ? 'bg-fiat-gold text-fiat-navy' : 'text-gray-400'
              }`}
            >
              Minhas
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'explore' ? 'bg-fiat-gold text-fiat-navy' : 'text-gray-400'
              }`}
            >
              Explorar
            </button>
          </div>

          <Button onClick={() => setShowCreate(true)} className="bg-fiat-gold text-fiat-navy gap-2">
            <Plus size={18} /> Criar
          </Button>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-fiat-gold" size={50} />
          </div>
        ) : activeTab === 'my' ? (
          myCommunities.length === 0 ? (
            <div className="text-center py-20 text-fiat-muted">
              <Users size={60} className="mx-auto mb-4 opacity-20" />
              <p className="italic">Você ainda não está em nenhuma comunidade.</p>
            </div>
          ) : (
            <div className="space-y-4">{myCommunities.map(c => renderCard(c, true))}</div>
          )
        ) : publicCommunities.length === 0 ? (
          <p className="text-center py-20 text-fiat-muted italic">
            Nenhuma comunidade pública no momento.
          </p>
        ) : (
          <div className="space-y-4">{publicCommunities.map(c => renderCard(c))}</div>
        )}
      </div>

      {/* Modal de Criação */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-fiat-card w-full max-w-lg rounded-3xl border border-fiat-gold/30 shadow-2xl p-8 relative">
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-serif text-fiat-gold text-center mb-8">
              Criar Nova Comunidade
            </h2>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-fiat-gold mb-2">
                  Nome da Comunidade
                </label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Terço dos Homens São José"
                  required
                  className="bg-black/40 border-fiat-gold/30 focus:border-fiat-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-fiat-gold mb-2">
                  Descrição (opcional)
                </label>
                <Input
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Fale um pouco sobre o grupo..."
                  className="bg-black/40 border-fiat-gold/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    isPublic ? 'border-fiat-gold bg-fiat-gold/10' : 'border-white/10 bg-black/20'
                  }`}
                >
                  <Globe size={32} className={`mx-auto mb-3 ${isPublic ? 'text-fiat-gold' : 'text-gray-500'}`} />
                  <p className="font-bold text-white">Pública</p>
                  <p className="text-xs text-fiat-muted">Qualquer um pode entrar</p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    !isPublic ? 'border-fiat-gold bg-fiat-gold/10' : 'border-white/10 bg-black/20'
                  }`}
                >
                  <Lock size={32} className={`mx-auto mb-3 ${!isPublic ? 'text-fiat-gold' : 'text-gray-500'}`} />
                  <p className="font-bold text-white">Privada</p>
                  <p className="text-xs text-fiat-muted">Apenas por convite</p>
                </button>
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={isCreating || !newName.trim()}
                className="mt-6 h-14 text-lg font-bold"
              >
                {isCreating ? <Loader2 className="animate-spin" /> : 'Criar Comunidade'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesPage;
