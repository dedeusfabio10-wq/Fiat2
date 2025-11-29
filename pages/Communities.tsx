import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { supabase } from '../services/supabase';
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

// Tipo correto com a coluna is_public (agora está certa no banco!)
interface Community {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  creator_id: string;
  created_at: string;
}

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

  // Carrega comunidades quando o perfil estiver disponível
  useEffect(() => {
    if (profile?.id) {
      fetchData();
    }
  }, [profile?.id]);

  const fetchData = async () => {
    if (!profile?.id) return;
    setLoading(true);

    try {
      // Minhas comunidades
      const { data: memberData } = await supabase
        .from('community_members')
        .select('communities(*)')
        .eq('user_id', profile.id);

      const myList: Community[] = (memberData || []).map((item: any) => item.communities).filter(Boolean);
      setMyCommunities(myList);

      // Comunidades públicas (excluindo as que já faço parte)
      const myIds = myList.map(c => c.id);
      const { data: publicData } = await supabase
        .from('communities')
        .select('*')
        .eq('is_public', true)
        .not('id', 'in', myIds.length > 0 ? `(${myIds.join(',')})` : '(null)' );

      setPublicCommunities((publicData || []) as Community[]);
    } catch (err) {
      console.error('Erro ao carregar comunidades:', err);
      toast.error('Erro ao carregar comunidades');
    } finally {
      setLoading(false);
    }
  };

  // CRIAÇÃO DE COMUNIDADE — 100% CORRETA
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !profile?.id) return;

    setIsCreating(true);

    try {
      // 1) Cria a comunidade
      const { data: community, error: createError } = await supabase
        .from('communities')
        .insert({
          name: newName.trim(),
          description: newDesc.trim() || null,
          is_public: isPublic,        // ← COLUNA CORRETA!
          creator_id: profile.id
        })
        .select()
        .single();

      if (createError) throw createError;

      // 2) Adiciona o criador como membro automaticamente
      const { error: memberError } = await supabase
        .from('community_members')
        .insert({
          community_id: community.id,
          user_id: profile.id
        });

      if (memberError) throw memberError;

      toast.success('Comunidade criada com sucesso!');
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      setIsPublic(true);

      fetchData();
      navigate(`/communities/${community.id}`);
    } catch (err: any) {
      console.error('Erro ao criar comunidade:', err);
      toast.error('Erro ao criar comunidade. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  };

  // Entrar em comunidade pública
  const handleJoin = async (communityId: string) => {
    if (!profile?.id) return;

    const { error } = await supabase
      .from('community_members')
      .insert({
        community_id: communityId,
        user_id: profile.id
      });

    if (error) {
      toast.error('Erro ao entrar na comunidade');
    } else {
      toast.success('Você entrou na comunidade!');
      fetchData();
    }
  };

  // Card de comunidade
  const renderCard = (c: Community, isMember: boolean = false) => (
    <Card
      key={c.id}
      onClick={() => isMember ? navigate(`/communities/${c.id}`) : handleJoin(c.id)}
      className="bg-fiat-card-blue p-6 mb-4 cursor-pointer hover:opacity-90 transition-all border border-fiat-gold/20 rounded-2xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-fiat-gold/10 flex items-center justify-center border-2 border-fiat-gold/30">
            {c.is_public ? <Globe className="text-fiat-gold" size={32} /> : <Lock className="text-fiat-gold" size={32} />}
          </div>
          <div>
            <h3 className="font-serif text-xl text-fiat-gold">{c.name}</h3>
            {c.description && <p className="text-sm text-gray-400 mt-1">{c.description}</p>}
            <p className="text-xs text-gray-500 mt-2">{c.is_public ? 'Pública' : 'Privada'}</p>
          </div>
        </div>
        {isMember ? (
          <ArrowRight className="text-fiat-gold" size={32} />
        ) : (
          <Button className="bg-fiat-gold text-black font-bold px-6">
            <UserPlus size={18} className="mr-2" /> Entrar
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={32} className="text-fiat-gold" />
          </button>
          <h1 className="text-4xl font-serif text-fiat-gold">COMUNIDADES</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'my' ? 'sacred' : 'outline'}
            onClick={() => setActiveTab('my')}
            className="flex-1"
          >
            Minhas
          </Button>
          <Button
            variant={activeTab === 'explore' ? 'sacred' : 'outline'}
            onClick={() => setActiveTab('explore')}
            className="flex-1"
          >
            Explorar
          </Button>
        </div>

        <Button
          onClick={() => setShowCreate(true)}
          className="w-full mb-8 bg-fiat-gold hover:bg-yellow-500 text-black font-bold text-lg h-14"
        >
          <Plus size={24} className="mr-2" /> Criar Nova Comunidade
        </Button>

        {/* Conteúdo */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="animate-spin text-fiat-gold mx-auto" size={60} />
          </div>
        ) : activeTab === 'my' && myCommunities.length === 0 ? (
          <div className="text-center py-20">
            <Users size={80} className="mx-auto mb-6 opacity-20 text-gray-600" />
            <p className="text-lg text-gray-400">Você ainda não está em nenhuma comunidade</p>
          </div>
        ) : activeTab === 'explore' && publicCommunities.length === 0 ? (
          <p className="text-center py-20 text-gray-400">Nenhuma comunidade pública ainda. Seja o primeiro!</p>
        ) : (
          <div className="space-y-4">
            {(activeTab === 'my' ? myCommunities : publicCommunities).map(c => renderCard(c, activeTab === 'my'))}
          </div>
        )}
      </div>

      {/* Modal de Criação */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setShowCreate(false)}>
          <div
            className="bg-slate-900 rounded-3xl border border-fiat-gold/40 w-full max-w-md p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-fiat-gold">CRIAR NOVA COMUNIDADE</h2>
              <button onClick={() => setShowCreate(false)}><X size={28} className="text-gray-400 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="text-fiat-gold font-bold block mb-2">Nome da Comunidade</label>
                <Input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Nossa Senhora da Conceição"
                  required
                  className="bg-black/40 border-fiat-gold/50 focus:border-fiat-gold"
                />
              </div>

              <div>
                <label className="text-fiat-gold font-bold block mb-2">Descrição (opcional)</label>
                <Input
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Rezar o Rosário todos os dias"
                  className="bg-black/40 border-fiat-gold/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`p-6 rounded-2xl border-2 transition-all ${isPublic ? 'border-fiat-gold bg-fiat-gold/10' : 'border-gray-600'}`}
                >
                  <Globe size={40} className="mx-auto mb-3 text-fiat-gold" />
                  <p className="font-bold">Pública</p>
                  <p className="text-xs text-gray-400">Qualquer um pode entrar</p>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`p-6 rounded-2xl border-2 transition-all ${!isPublic ? 'border-fiat-gold bg-fiat-gold/10' : 'border-gray-600'}`}
                >
                  <Lock size={40} className="mx-auto mb-3 text-fiat-gold" />
                  <p className="font-bold">Privada</p>
                  <p className="text-xs text-gray-400">Apenas por convite</p>
                </button>
              </div>

              <Button
                type="submit"
                disabled={isCreating || !newName.trim()}
                className="w-full bg-fiat-gold hover:bg-yellow-500 text-black font-bold text-lg h-14"
              >
                {isCreating ? 'Criando...' : 'Criar Comunidade'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesPage;
