import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../ui/UIComponents';
import { toast } from 'sonner';
import { AppContext } from '../contexts/AppContext';
import { supabase } from '../services/supabase';
import { Chrome, Mail, Sparkles } from 'lucide-react';

const AuthPage: React.FC = () => {
  const { updateProfile, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState<'welcome' | 'email'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error: any) {
      toast.error('Erro ao conectar com Google', { description: error.message });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Credenciais de Admin via Variáveis de Ambiente
    const adminEmail = (import.meta as any).env.VITE_ADMIN_EMAIL;
    const adminPass = (import.meta as any).env.VITE_ADMIN_PASSWORD;

    // Verifica se as variáveis existem e se correspondem
    if (adminEmail && adminPass && email === adminEmail && password === adminPass) {
      setTimeout(() => {
        setLoading(false);
        toast.success('Bem-vindo, Administrador.', { icon: '🛡️' });
        navigate('/admin', { state: { adminAuth: true } });
      }, 800);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        toast.success('Conta criada!', { description: 'Verifique seu e-mail para confirmar.' });
      } else {
        updateProfile({
          ...profile,
          name: email.split('@')[0],
          email: email,
          onboarding_completed: true
        });
        navigate('/');
      }
    } catch (error: any) {
      toast.error('Erro de autenticação', { description: error.message || 'Verifique seus dados.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543835218-76eeefbc8aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-black/40"></div>
      <div className="absolute inset-0 pointer-events-none">{Array.from({ length: 20 }).map((_, i) => (<div key={i} className="absolute w-1 h-1 bg-sacred-gold/60 rounded-full animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${5 + Math.random() * 10}s` }} />))}</div>

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center space-y-8 animate-fade-in">
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="mb-6 relative group"><div className="absolute inset-0 bg-sacred-gold/20 blur-2xl rounded-full group-hover:bg-sacred-gold/30 transition-all duration-1000"></div><svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] text-sacred-gold"><path d="M50 5L53 20L63 10L58 23L75 20L63 30L80 38L65 42L80 55L65 60L75 75L58 68L60 85L50 70L40 85L42 68L25 75L35 60L20 55L35 42L20 38L37 30L25 20L42 23L37 10L47 20L50 5Z" fill="currentColor" opacity="0.4" className="animate-spin-slow origin-center"/><path d="M50 15V85M30 35H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M50 45C65 45 75 55 75 70C75 85 50 85 50 85C50 85 25 85 25 70C25 55 35 45 50 45Z" stroke="currentColor" strokeWidth="2"/><path d="M35 55L50 70L65 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse"/></svg></div>
          <h1 className="text-4xl font-serif text-sacred-gold drop-shadow-lg">Bem-vindo ao Fiat</h1>
          <p className="text-sacred-gold/80 font-serif italic text-sm mt-1">“Faça-se em mim segundo a tua palavra ♡”</p>
          <p className="text-gray-300 font-serif italic text-lg mt-2">"Sua paróquia no bolso ♡"</p>
        </div>

        {mode === 'welcome' ? (
          <div className="w-full space-y-4">
            <button onClick={handleGoogleLogin} className="w-full h-14 bg-white text-gray-800 rounded-xl font-medium flex items-center justify-center gap-3 shadow-lg hover:bg-gray-50 transition-transform active:scale-95">
              <Chrome size={20} className="text-blue-500" />
              Entrar com Google
            </button>
            <button onClick={() => setMode('email')} className="w-full h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
              <Mail size={20} />
              Entrar com E-mail
            </button>
            <div className="relative py-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] text-gray-500 px-2 font-bold tracking-widest">Ou</span></div></div>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="w-full bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl space-y-4 animate-slide-up">
            <div className="text-center mb-2"><h3 className="text-white font-serif text-lg">Acessar com E-mail</h3><p className="text-xs text-gray-400">Entre ou crie sua conta gratuitamente.</p></div>
            <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="bg-black/30 border-white/10" />
            <Input type="password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} required className="bg-black/30 border-white/10" />
            <Button variant="sacred" className="w-full h-12 mt-2" disabled={loading}>{loading ? 'Processando...' : 'Entrar / Criar Conta'}</Button>
            <button type="button" onClick={() => setMode('welcome')} className="w-full text-center text-xs text-gray-500 hover:text-white mt-4">← Voltar</button>
          </form>
        )}
        <div className="mt-8 text-center space-y-2 opacity-60">
          <Sparkles className="w-4 h-4 text-sacred-gold mx-auto" />
          <p className="text-[10px] text-gray-400 max-w-xs mx-auto">Ao entrar, você concorda com nossos Termos de Fé e Privacidade.<br />Que a paz de Cristo esteja com você.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;