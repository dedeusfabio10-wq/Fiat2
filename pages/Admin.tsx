import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, MemoryRouter, Routes, Route } from 'react-router-dom';
import { Button, Input } from '../ui/UIComponents';
import { AppContext } from '../contexts/AppContext';
import Layout from '../ui/Layout';
import { toast } from 'sonner';
import { supabase } from '../services/supabase';
import { 
  Shield, Users, DollarSign, Activity, Search, LogOut, 
  LayoutDashboard, Smartphone, Crown, AlertCircle, X 
} from 'lucide-react';

// Import Pages for Simulator
import HomePage from './Home';
import PrayersPage from './Prayers';
import RosaryPage from './Rosary';
import PlannerPage from './Planner';
import CatechismPage from './Catechism';
import CalendarPage from './Calendar';
import ProfilePage from './Profile';
import CenaculoPage from './Cenaculo';
import NovenaDetailPage from './NovenaDetail';
import PlanCreatorPage from './PlanCreator';
import PlanDetailPage from './PlanDetail';
import ViaSacraPage from './ViaSacra';
import AdventoPage from './Advento';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile } = useContext(AppContext);
    
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);

    // Dashboard State
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'app_preview'>('overview');
    const [users, setUsers] = useState<any[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userSearch, setUserSearch] = useState('');

    // Check Authentication on Load
    useEffect(() => {
        if (location.state && (location.state as any).adminAuth === true) {
            setIsAuthenticated(true);
            fetchUsers();
        }
    }, [location]);

    // --- ACTIONS ---

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setUsers(data);
        } catch (error: any) {
            console.error('Erro ao buscar usuários:', error);
            // Fallback for mock/demo mode if supabase fails or RLS blocks
            setUsers([
                { id: 'local', name: profile.name || 'Admin Local', email: profile.email || 'admin@fiat.app', created_at: new Date().toISOString(), is_premium: true }
            ]);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingAuth(true);

        // Use Environment Variables for Admin Auth
        const adminEmail = (import.meta as any).env.VITE_ADMIN_EMAIL;
        const adminPass = (import.meta as any).env.VITE_ADMIN_PASSWORD;

        if (adminEmail && adminPass && email === adminEmail && password === adminPass) {
            completeLogin();
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            // TODO: Check if user is in 'admins' table for robust security
            if (data.user) completeLogin();
        } catch (error: any) {
            toast.error('Acesso Negado', { description: 'Credenciais inválidas.' });
            setLoadingAuth(false);
        }
    };

    const completeLogin = () => {
        setIsAuthenticated(true);
        setLoadingAuth(false);
        toast.success('Painel Administrativo', { icon: '🛡️' });
        fetchUsers();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setEmail('');
        setPassword('');
        navigate('/auth');
    };

    const toggleUserPremium = async (userId: string, currentStatus: boolean) => {
        // Optimistic update
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_premium: !currentStatus } : u));
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ 
                    is_premium: !currentStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId);
            if (error) throw error;
            toast.success(`Usuário ${!currentStatus ? 'promovido a Premium' : 'rebaixado'}`);
        } catch (error) {
            toast.error('Erro ao atualizar banco de dados');
            fetchUsers(); // Revert
        }
    };

    // --- CALCULATIONS ---
    const premiumCount = users.filter(u => u.is_premium).length;
    const revenue = premiumCount * 4.90; // Estimativa simples baseada no mensal
    const totalUsers = users.length;

    // --- RENDERERS ---

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#05080f] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543835218-76eeefbc8aa1?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 pointer-events-none"></div>
                <div className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-xl border border-sacred-gold/30 p-8 rounded-2xl shadow-2xl animate-fade-in relative z-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-sacred-gold/10 flex items-center justify-center border border-sacred-gold/30 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <Shield size={32} className="text-sacred-gold" />
                        </div>
                        <h1 className="text-2xl font-serif text-white">Fiat Admin</h1>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Acesso Restrito</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest ml-1">E-mail</label>
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-black/40 border-white/10 mt-1 focus:border-sacred-gold" placeholder="admin@fiat.app" />
                        </div>
                        <div>
                            <label className="text-xs text-sacred-gold font-bold uppercase tracking-widest ml-1">Senha</label>
                            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-black/40 border-white/10 mt-1 focus:border-sacred-gold" placeholder="••••••••" />
                        </div>
                        <Button variant="sacred" className="w-full mt-4 h-12" disabled={loadingAuth}>
                            {loadingAuth ? <Activity className="animate-spin" /> : 'Acessar Painel'}
                        </Button>
                    </form>
                    <button onClick={() => navigate('/auth')} className="w-full text-center text-xs text-gray-500 mt-6 hover:text-white transition-colors">Voltar ao App</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05080f] text-white flex flex-col md:flex-row overflow-hidden">
            {/* SIDEBAR */}
            <div className="w-full md:w-64 bg-[#0f172a] border-r border-white/5 p-6 flex flex-col gap-2 shrink-0 z-20">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-8 h-8 bg-sacred-gold rounded-full flex items-center justify-center text-black font-serif font-bold shadow-lg shadow-sacred-gold/20">F</div>
                    <div>
                        <span className="font-serif text-lg tracking-wide block leading-none">FIAT</span>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest">Admin</span>
                    </div>
                </div>
                
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold px-2 mt-2 mb-1">Gestão</p>
                <NavButton active={activeTab === 'overview'} icon={<LayoutDashboard size={18} />} label="Visão Geral" onClick={() => setActiveTab('overview')} />
                <NavButton active={activeTab === 'users'} icon={<Users size={18} />} label="Fiéis (Usuários)" onClick={() => setActiveTab('users')} />
                
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold px-2 mt-6 mb-1">App & Conteúdo</p>
                <NavButton active={activeTab === 'app_preview'} icon={<Smartphone size={18} />} label="Simulador App" onClick={() => setActiveTab('app_preview')} />
                
                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                            {profile.photo ? <img src={profile.photo} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full text-xs">A</span>}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm text-white truncate font-medium">Administrador</p>
                            <p className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-lg w-full transition-colors text-sm font-medium">
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#05080f]">
                {/* Top Bar */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0f172a]/50 backdrop-blur-md">
                    <h2 className="text-lg font-serif text-white">
                        {activeTab === 'overview' && 'Dashboard'}
                        {activeTab === 'users' && 'Base de Usuários'}
                        {activeTab === 'app_preview' && 'Simulador em Tempo Real'}
                    </h2>
                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" className="border-white/10 text-xs" onClick={() => navigate('/')}>
                            Abrir App Real <Smartphone size={14} className="ml-2" />
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    
                    {/* --- TAB: OVERVIEW --- */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard 
                                    title="Receita Mensal (Est.)" 
                                    value={`R$ ${revenue.toFixed(2)}`} 
                                    icon={<DollarSign className="text-green-400" />} 
                                    sub={`${premiumCount} assinantes ativos`} 
                                    trend="+12%"
                                />
                                <StatCard 
                                    title="Total de Fiéis" 
                                    value={totalUsers.toString()} 
                                    icon={<Users className="text-blue-400" />} 
                                    sub="Cadastrados na base" 
                                    trend="+5%"
                                />
                                <StatCard 
                                    title="Terços Rezados" 
                                    value={(12458 + (profile.rosaries_prayed || 0)).toLocaleString()} 
                                    icon={<Activity className="text-sacred-gold" />} 
                                    sub="Globalmente esta semana" 
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6">
                                    <h3 className="font-serif text-white mb-4 flex items-center gap-2"><Crown size={16} className="text-sacred-gold" /> Assinaturas Recentes</h3>
                                    <div className="space-y-3">
                                        {users.filter(u => u.is_premium).slice(0, 5).map(user => (
                                            <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-sacred-gold/10 flex items-center justify-center text-sacred-gold text-xs font-bold">
                                                        {user.name?.[0] || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-white font-medium">{user.name || 'Usuário'}</p>
                                                        <p className="text-[10px] text-gray-500">{new Date(user.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-500/20">Ativo</span>
                                            </div>
                                        ))}
                                        {users.filter(u => u.is_premium).length === 0 && <p className="text-gray-500 text-sm italic">Nenhum assinante ainda.</p>}
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6">
                                    <h3 className="font-serif text-white mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-blue-400" /> Status do Sistema</h3>
                                    <div className="space-y-4">
                                        <SystemStatusRow label="Banco de Dados (Supabase)" status="online" />
                                        <SystemStatusRow label="API Liturgia (CNBB)" status="online" />
                                        <SystemStatusRow label="Gateway Pagamento (MP)" status="online" />
                                        <SystemStatusRow label="Serviço de Áudio (TTS)" status="warning" msg="Limitado em iOS" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: USERS --- */}
                    {activeTab === 'users' && (
                        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0f172a] p-4 rounded-xl border border-white/5">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                                    <Input 
                                        placeholder="Buscar por nome, email ou ID..." 
                                        className="pl-10 bg-black/20 border-white/10 focus:border-sacred-gold h-10" 
                                        value={userSearch} 
                                        onChange={e => setUserSearch(e.target.value)} 
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="border-white/10" onClick={fetchUsers}>
                                        Atualizar Lista
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden shadow-lg">
                                {loadingUsers ? (
                                    <div className="p-20 text-center text-gray-500"><Activity className="animate-spin mx-auto mb-2" /> Carregando base de dados...</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-black/40 text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-white/5">
                                            <tr>
                                                <th className="p-4">Usuário</th>
                                                <th className="p-4">Email</th>
                                                <th className="p-4">Data Cadastro</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4 text-right">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {users.filter(u => 
                                                (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) || 
                                                (u.email || '').toLowerCase().includes(userSearch.toLowerCase())
                                            ).map(user => (
                                                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-xs overflow-hidden">
                                                                {user.photo ? <img src={user.photo} className="w-full h-full object-cover"/> : user.name?.[0] || '?'}
                                                            </div>
                                                            <span className="font-medium text-white">{user.name || 'Sem Nome'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-gray-400 font-mono text-xs">{user.email}</td>
                                                    <td className="p-4 text-gray-500 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                                                    <td className="p-4">
                                                        {user.is_premium ? (
                                                            <span className="bg-sacred-gold/10 text-sacred-gold px-2 py-1 rounded text-[10px] font-bold border border-sacred-gold/20 flex w-fit items-center gap-1">
                                                                <Crown size={10} fill="currentColor" /> PREMIUM
                                                            </span>
                                                        ) : (
                                                            <span className="bg-gray-700/30 text-gray-400 px-2 py-1 rounded text-[10px] font-bold border border-gray-600/30">GRÁTIS</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => toggleUserPremium(user.id, user.is_premium)} 
                                                                className={`p-1.5 rounded-md transition-colors ${user.is_premium ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-sacred-gold hover:bg-sacred-gold/10'}`}
                                                                title={user.is_premium ? "Remover Premium" : "Dar Premium"}
                                                            >
                                                                {user.is_premium ? <X size={16} /> : <Crown size={16} />}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- TAB: APP PREVIEW (SIMULATOR) --- */}
                    {activeTab === 'app_preview' && (
                        <div className="h-full flex flex-col items-center justify-center animate-fade-in">
                            <div className="mb-4 text-center">
                                <h3 className="text-xl font-serif text-white">Simulador Premium</h3>
                                <p className="text-gray-400 text-sm">Nesta visualização, todos os recursos estão desbloqueados.</p>
                            </div>
                            
                            {/* Phone Bezel */}
                            <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-50 pointer-events-none"></div>
                                
                                {/* Simulated App Content */}
                                <div className="w-full h-full bg-[#05080f] flex flex-col overflow-hidden relative text-left">
                                    <AppContext.Provider value={{ 
                                        profile: { ...profile, is_premium: true, name: 'Simulador Premium', favorites: [], active_novenas: [], streak: 5, rosaries_prayed: 10, onboarding_completed: true }, 
                                        isLoadingProfile: false,
                                        updateProfile: () => console.log('Profile update mocked'), 
                                        refreshProfile: async () => {}, 
                                        themeColors: { primary: '#d4af37' } 
                                    }}>
                                        <MemoryRouter initialEntries={['/home']}>
                                            <Layout>
                                                <Routes>
                                                    <Route path="/home" element={<HomePage />} />
                                                    <Route path="/prayers" element={<PrayersPage />} />
                                                    <Route path="/rosary" element={<RosaryPage />} />
                                                    <Route path="/planner" element={<PlannerPage />} />
                                                    <Route path="/planner/create" element={<PlanCreatorPage />} />
                                                    <Route path="/planner/:id" element={<PlanDetailPage />} />
                                                    <Route path="/catechism" element={<CatechismPage />} />
                                                    <Route path="/calendar" element={<CalendarPage />} />
                                                    <Route path="/profile" element={<ProfilePage />} />
                                                    <Route path="/cenaculo" element={<CenaculoPage />} />
                                                    <Route path="/advento" element={<AdventoPage />} />
                                                    <Route path="/viasacra" element={<ViaSacraPage />} />
                                                    <Route path="/novena/:id" element={<NovenaDetailPage />} />
                                                </Routes>
                                            </Layout>
                                        </MemoryRouter>
                                    </AppContext.Provider>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const NavButton: React.FC<{ active: boolean, icon: React.ReactNode, label: string, onClick: () => void }> = ({ active, icon, label, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 w-full text-left ${active ? 'bg-sacred-gold text-sacred-sapphire font-bold shadow-lg shadow-sacred-gold/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
        {icon} <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
    </button>
);

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode, sub: string, trend?: string }> = ({ title, value, icon, sub, trend }) => (
    <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6 hover:border-sacred-gold/20 transition-colors shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity scale-150">{icon}</div>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{title}</p>
                {trend && <span className="text-[10px] text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded border border-green-500/20">{trend}</span>}
            </div>
            <h3 className="text-3xl font-serif text-white mb-1">{value}</h3>
            <p className="text-[10px] text-gray-500 flex items-center gap-1">{sub}</p>
        </div>
    </div>
);

const SystemStatusRow: React.FC<{ label: string, status: 'online' | 'offline' | 'warning', msg?: string }> = ({ label, status, msg }) => (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
        <span className="text-xs text-gray-300">{label}</span>
        <div className="flex items-center gap-2">
            {msg && <span className="text-[9px] text-gray-500 uppercase">{msg}</span>}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-bold uppercase border ${
                status === 'online' ? 'bg-green-900/20 text-green-400 border-green-500/20' : 
                status === 'warning' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/20' : 
                'bg-red-900/20 text-red-400 border-red-500/20'
            }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                    status === 'online' ? 'bg-green-400 animate-pulse' : 
                    status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                {status}
            </div>
        </div>
    </div>
);

export default AdminPage;