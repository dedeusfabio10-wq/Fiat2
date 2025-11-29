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

interface Community {
  id: string;
  name: string;
  description: string | null;
  is_pu: boolean; // ← AQUI ESTÁ O SEGREDO (sua coluna se chama is_pu)
  creator_id: string;
  created_at: string;
  members_count?: number;
}

const CommunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  const [myCommunities, setMyCommunities] = useState<Community[]>([]);
  const [publicCommunities, setPublicCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my' | 'explore'>('my');

  // Modal
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
      // Minhas comunidades
      const { data: memberData } = await supabase
        .from('community_members')
        .select('communities(*)')
        .eq('user_id', profile.id);

      const myList = (memberData?.map(m => m.communities) || []) as Community[];
      setMyCommunities(myList);

      // Comunidades públicas (menos as que já estou)
      const myIds = myList.map(c => c.id);
      const { data: publicData } = await supabase
        .from('communities')
        .select('*')
        .eq('is_pu', true) // ← sua coluna é is_pu
        .not('id', 'in', `(${myIds.join(',') || 'null'})`);

      setPublicCommunities(publicData || []);
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

    try {
      // 1) Criar a comunidade
      const { data: community, error: err1 } = await supabase
        .from('communities')
        .insert({
          name: newName.trim(),
          description: newDesc.trim() || null,
          is_pu: isPublic,        // ← AQUI TAMBÉM: is_pu
          creator_id: profile.id
        })
        .select()
        .single();

      if (err1) throw err1;

      // 2) Adicionar o criador como membro
      const { error: err2 } = await supabase
        .from('community_members')
        .insert({
          community_id: community.id,
          user_id: profile.id
        });

      if (err2) throw err2;

      toast.success('Comunidade criada com sucesso!');
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      setIsPublic(true);
      fetchData(); // recarrega a lista
      navigate(`/communities/${community.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao criar comunidade: ' + (err.message || 'Tente novamente'));
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoin = async (communityId: string) => {
    if (!profile.id) return;

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

  const renderCard = (c: Community, isMember: boolean = false) => (
    <Card
      key={c.id}
      onClick={() => isMember ? navigate(`/communities/${c.id}`) : handleJoin(c.id)}
      className="bg-fiat-card-blue p-5 flex items-center justify-between cursor-pointer hover:bg-fiat-card-blue/80 transition-all border border-white/10 mb-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center border border-fiat-gold/30">
          {c.is_pu ? <Globe className="text-fiat-gold" size={28} /> : <Lock className="text-fiat-gold" size={28} />}
        </div>
        <div>
          <h3 className="font-serif text-xl text-white">{c.name}</h3>
          {c.description && <p className="text-sm text-gray-400 mt-1">{c.description}</p>}
          <p className="text-xs text-gray-500 mt-2">
            {c.is_pu ? 'Pública' : 'Privada'}
          </p>
        </div>
      </div>
      {isMember ? (
        <ArrowRight className="text-fiat-gold" size={28} />
      ) : (
        <Button
          size="sm"
          onClick={(e) => { e.stopPropagation(); handleJoin(c.id); }}
          className="bg-fiat-gold text-black font-bold"
        >
          <UserPlus size={16} className="mr-1" /> Entrar
        </Button>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
            <ArrowLeft size={32} />
          </button>
          <h1 className="text-4xl font-serif text-fiat-gold -mt-10">COMUNIDADES</h1>
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
          className="w-full mb-8 bg-fiat-gold hover:bg-yellow-500 text-black font-bold text-lg"
        >
          <Plus size={24} className="mr-2" /> Criar Nova Comunidade
        </Button>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-fiat-gold" size={60} />
          </div>
        ) : activeTab === 'my' && myCommunities.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Users size={80} className="mx-auto mb-6 opacity-20" />
            <p className="text-lg">Você ainda não está em nenhuma comunidade</p>
          </div>
        ) : activeTab === 'explore' && publicCommunities.length === 0 ? (
          <p className="text-center py-20 text-gray-400">Nenhuma comunidade pública ainda. Seja o primeiro!</p>
        ) : (
          <div className="space-y-4">
            {(activeTab === 'my' ? myCommunities : publicCommunities).map(c => renderCard(c, activeTab === 'my'))}
          </div>
        )}
      </div>

      {/* Modal Criar Comunidade */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setShowCreate(false)}>
          <div className="bg-slate-900 rounded-3xl border border-fiat-gold/40 w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-fiat-gold">CRIAR NOVA COMUNIDADE</h2>
              <button onClick={() => setShowCreate(false)}><X size={28} /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="text-fiat-gold font-bold">Nome da Comunidade</label>
                <Input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Nossa Senhora da Conceição"
                  className="mt-2 bg-black/40 border-fiat-gold/50"
                  required
                />
              </div>

              <div>
                <label className="text-fiat-gold font-bold">Descrição (opcional)</label>
                <Input
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Rezar o Rosário todos os dias"
                  className="mt-2 bg-black/40 border-fiat-gold/50"
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
                  <p className="text-xs text-gray-400"> Apenas por convite</p>
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
