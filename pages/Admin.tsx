import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Card } from '../ui/UIComponents';
import { AppContext } from '../App';
import { toast } from 'sonner';
import { Shield, Users, DollarSign, Activity, Search, Edit, Save, LogOut, Plus, Check, X, BookOpen } from 'lucide-react';
import { PRAYERS } from '../constants';

const MOCK_USERS = [
    { id: '1', name: 'Maria Silva', email: 'maria@gmail.com', joined: '2023-10-15', is_premium: true },
    { id: '2', name: 'João Santos', email: 'joao@hotmail.com', joined: '2023-11-02', is_premium: false },
    { id: '3', name: 'Pedro Oliveira', email: 'pedro@outlook.com', joined: '2023-12-10', is_premium: true },
    { id: '4', name: 'Ana Costa', email: 'ana.c@gmail.com', joined: '2024-01-05', is_premium: false },
    { id: '5', name: 'Lucas Ferreira', email: 'lucasf@yahoo.com', joined: '2024-02-20', is_premium: false },
];

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile, updateProfile } = useContext(AppContext);
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (location.state && (location.state as any).adminAuth === true) {
            setIsAuthenticated(true);
        }
    }, [location]);

    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content'>('overview');
    const [globalRosaryCount, setGlobalRosaryCount] = useState(1245890);
    const [users, setUsers] = useState(MOCK_USERS);
    const [userSearch, setUserSearch] = useState('');
    const [localPrayers, setLocalPrayers] = useState(PRAYERS);
    const [editingPrayer, setEditingPrayer] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [contentSearch, setContentSearch] = useState('');

    useEffect(() => {
        if (profile.email) {
            const deviceUser = {
                id: 'device-user',
                name: profile.name || 'Usuário Local',
                email: profile.email || 'local@device.com',
                joined: new Date().toLocaleDateString('en-CA'),
                is_premium: profile.is_premium
            };
            if (!users.find(u => u.id === 'device-user')) {
                setUsers(prev => [deviceUser, ...prev]);
            }
        }
    }, [profile, isAuthenticated, users]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@fiat.app' && password === 'fiat2024') {
            setIsAuthenticated(true);
            toast.success('Bem-vindo, Administrador.', { icon: '🛡️' });
        } else {
            toast.error('Acesso Negado', { description: 'Credenciais inválidas.' });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setEmail('');
        setPassword('');
        navigate('/auth');
    };

    const toggleUserPremium = (userId: string, currentStatus: boolean) => {
        if (userId === 'device-user') {
            updateProfile({ ...profile, is_premium: !currentStatus });
        }
        setUsers(users.map(u => u.id === userId ? { ...u, is_premium: !currentStatus } : u));
        toast.success(`Status Premium atualizado para ${!currentStatus ? 'ATIVO' : 'INATIVO'}`);
    };

    const savePrayer = (id: string) => {
        setLocalPrayers(prev => prev.map(p => p.id === id ? { ...p, content: editContent } : p));
        setEditingPrayer(null);
        toast.success('Conteúdo atualizado', { description: 'Alteração salva no banco de dados.' });
    };

    const revenue = users.filter(u => u.is_premium).length * 4.90;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-sacred-gold/30 p-8 rounded-2xl shadow-2xl animate-fade-in">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-sacred-gold/10 flex items-center justify-center border border-sacred-gold/30 mb-4">
                            <Shield size={32} className="text-sacred-gold" />
                        </div>
                        <h1 className="text-2xl font-serif text-white">Fiat Admin</h1>
                        <p className="text-gray-400 text-sm">Área restrita para gestão</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest ml-1">E-mail</label>
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-black/30 border-white/10 mt-1" placeholder="admin@fiat.app" />
                        </div>
                        <div>
                            <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest ml-1">Senha</label>
                            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-black/30 border-white/10 mt-1" placeholder="••••••••" />
                        </div>
                        <Button variant="sacred" className="w-full mt-4">Acessar Painel</Button>
                    </form>
                    <button onClick={() => navigate('/auth')} className="w-full text-center text-xs text-gray-500 mt-6 hover:text-white">Voltar ao App</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col md:flex-row">
            <div className="w-full md:w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-8 h-8 bg-sacred-gold rounded-full flex items-center justify-center text-black font-serif font-bold">F</div>
                    <span className="font-serif text-xl tracking-wide">Admin</span>
                </div>
                <NavButton active={activeTab === 'overview'} icon={<Activity size={18} />} label="Visão Geral" onClick={() => setActiveTab('overview')} />
                <NavButton active={activeTab === 'users'} icon={<Users size={18} />} label="Usuários" onClick={() => setActiveTab('users')} />
                <NavButton active={activeTab === 'content'} icon={<BookOpen size={18} />} label="Conteúdo" onClick={() => setActiveTab('content')} />
                <div className="mt-auto pt-6 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg w-full transition-colors">
                        <LogOut size={18} /> <span className="text-sm font-medium">Sair</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fade-in">
                        <header><h2 className="text-3xl font-serif text-white">Painel de Controle</h2><p className="text-gray-400">Resumo da atividade do aplicativo hoje.</p></header>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard title="Receita Mensal" value={`R$ ${revenue.toFixed(2)}`} icon={<DollarSign className="text-green-400" />} sub="Previsão baseada em assinaturas" />
                            <StatCard title="Usuários Totais" value={users.length.toString()} icon={<Users className="text-blue-400" />} sub={`${users.filter(u => u.is_premium).length} Premium ativos`} />
                            <StatCard title="Terços Rezados" value={globalRosaryCount.toLocaleString()} icon={<Activity className="text-sacred-gold" />} sub="Contador global" />
                        </div>
                    </div>
                )}
                {activeTab === 'users' && (
                    <div className="space-y-6 animate-fade-in">
                        <header className="flex justify-between items-center">
                            <div><h2 className="text-3xl font-serif text-white">Usuários</h2><p className="text-gray-400">Gestão da base de fiéis.</p></div>
                            <div className="relative w-64"><Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" /><Input placeholder="Buscar por nome ou email..." className="pl-10 bg-white/5 border-white/10" value={userSearch} onChange={e => setUserSearch(e.target.value)} /></div>
                        </header>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-black/20 text-gray-400 uppercase text-xs font-bold tracking-wider">
                                    <tr><th className="p-4">Nome</th><th className="p-4">Email</th><th className="p-4">Data Cadastro</th><th className="p-4">Status</th><th className="p-4 text-right">Ações</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.includes(userSearch)).map(user => (
                                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-medium text-white">{user.name} {user.id === 'device-user' && <span className="ml-2 text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">VOCÊ</span>}</td>
                                            <td className="p-4 text-gray-400">{user.email}</td>
                                            <td className="p-4 text-gray-500 font-mono">{user.joined}</td>
                                            <td className="p-4">{user.is_premium ? <span className="bg-sacred-gold/10 text-sacred-gold px-2 py-1 rounded text-xs font-bold border border-sacred-gold/20 flex w-fit items-center gap-1">PREMIUM</span> : <span className="bg-gray-700/30 text-gray-400 px-2 py-1 rounded text-xs font-bold border border-gray-600/30">GRÁTIS</span>}</td>
                                            <td className="p-4 text-right"><button onClick={() => toggleUserPremium(user.id, user.is_premium)} className="text-xs text-gray-400 hover:text-white underline decoration-dotted">{user.is_premium ? 'Remover Premium' : 'Dar Premium'}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-fade-in">
                         <header className="flex justify-between items-center">
                            <div><h2 className="text-3xl font-serif text-white">Editor de Conteúdo</h2><p className="text-gray-400">Gerencie orações e textos do app.</p></div>
                            <div className="flex gap-3"><div className="relative w-64"><Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" /><Input placeholder="Buscar oração..." className="pl-10 bg-white/5 border-white/10" value={contentSearch} onChange={e => setContentSearch(e.target.value)} /></div><Button variant="sacred" className="gap-2"><Plus size={16} /> Nova</Button></div>
                        </header>
                        <div className="grid gap-4">
                            {localPrayers.filter(p => p.title.toLowerCase().includes(contentSearch.toLowerCase())).map(prayer => (
                                <div key={prayer.id} className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:border-white/20">
                                    {editingPrayer === prayer.id ? (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                                <h3 className="text-lg font-serif text-sacred-gold">{prayer.title}</h3>
                                                <div className="flex gap-2"><Button size="sm" variant="ghost" onClick={() => setEditingPrayer(null)} className="text-gray-400"><X size={16}/></Button><Button size="sm" variant="sacred" onClick={() => savePrayer(prayer.id)} className="gap-2"><Save size={14}/> Salvar</Button></div>
                                            </div>
                                            <textarea className="w-full h-40 bg-black/30 border border-white/10 rounded-lg p-3 text-white font-serif leading-relaxed focus:border-sacred-gold outline-none resize-y" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-start">
                                            <div><h3 className="text-lg font-serif text-white">{prayer.title}</h3><p className="text-sm text-gray-500 mt-1 line-clamp-2 font-serif italic max-w-2xl">{prayer.content}</p><span className="inline-block mt-2 text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded uppercase">{prayer.category}</span></div>
                                            <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/10 text-gray-400 hover:text-white" onClick={() => { setEditingPrayer(prayer.id); setEditContent(prayer.content); }}><Edit size={14} className="mr-2" /> Editar</Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const NavButton: React.FC<{ active: boolean, icon: React.ReactNode, label: string, onClick: () => void }> = ({ active, icon, label, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${active ? 'bg-sacred-gold text-sacred-sapphire font-bold shadow-lg shadow-sacred-gold/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>{icon} <span className="text-sm">{label}</span></button>
);

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode, sub: string }> = ({ title, value, icon, sub }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start justify-between hover:border-white/20 transition-all">
        <div><p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{title}</p><h3 className="text-3xl font-serif text-white mb-2">{value}</h3><p className="text-[10px] text-gray-500">{sub}</p></div>
        <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">{icon}</div>
    </div>
);

export default AdminPage;
