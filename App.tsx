import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Layout from './ui/Layout';
import { UserProfile } from './types';
import { initAudio } from './services/audio';
import { supabase, getCurrentUser } from './services/supabase';
import { AppContext } from './contexts/AppContext';

// Pages
import LandingPage from './pages/Landing';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import PrayersPage from './pages/Prayers';
import RosaryPage from './pages/Rosary';
import PlannerPage from './pages/Planner';
import ProfilePage from './pages/Profile';
import CatechismPage from './pages/Catechism';
import CalendarPage from './pages/Calendar';
import ViaSacraPage from './pages/ViaSacra';
import PlanCreatorPage from './pages/PlanCreator';
import PlanDetailPage from './pages/PlanDetail';
import NovenaDetailPage from './pages/NovenaDetail';
import CenaculoPage from './pages/Cenaculo';
import AdventoPage from './pages/Advento';

// Lazy load Admin to prevent circular dependency issues
const AdminPage = React.lazy(() => import('./pages/Admin'));

const App: React.FC = () => {
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fiat-profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      is_premium: false,
      streak: 0,
      rosaries_prayed: 0,
      favorites: [],
      active_novenas: [],
      onboarding_completed: false
    };
  });

  const checkExpiration = (userProfile: UserProfile): UserProfile => {
    if (userProfile.is_premium && userProfile.premium_expires_at) {
        const expirationDate = new Date(userProfile.premium_expires_at);
        const now = new Date();
        const daysLeft = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (now > expirationDate) {
            console.log('Plano Premium Expirado');
            toast.error("Seu tempo Premium acabou.", { description: "Renove para continuar usando os recursos." });
            return { ...userProfile, is_premium: false };
        } else if (daysLeft <= 3 && daysLeft > 0) {
             // Apenas avisa, mas mantém premium
             // toast("Seu Premium vence em breve", { description: `Restam apenas ${daysLeft} dias.` });
        }
    }
    return userProfile;
  };

  const fetchUserProfile = async () => {
      setIsLoadingProfile(true);
      try {
          const user = await getCurrentUser();
          if (user) {
            // Tenta buscar o perfil
            const { data, error } = await supabase
               .from('profiles')
               .select('*')
               .eq('id', user.id)
               .single();
            
            if (data) {
                // Perfil encontrado, atualiza estado local
                let updatedProfile: UserProfile = { 
                    ...profile,
                    name: data.name || profile.name,
                    email: data.email || user.email || profile.email,
                    photo: data.photo || profile.photo,
                    is_premium: data.is_premium,
                    premium_expires_at: data.premium_expires_at,
                    streak: data.streak || 0,
                    rosaries_prayed: data.rosaries_prayed || 0,
                    
                    // Mapeamento de Campos
                    active_novenas: data.active_novenas || profile.active_novenas || [],
                    favorites: data.favorites || profile.favorites || [],
                    
                    // Campos de Customização
                    devotionalSaintId: data.devotional_saint_id,
                    customTheme: data.custom_theme,
                    favoriteQuote: data.favorite_quote,
                    nightModeSpiritual: data.night_mode_spiritual,
                    
                    // Campos de Assinatura
                    subscriptionType: data.subscription_type,
                    subscriptionMethod: data.subscription_method,
                    subscriptionId: data.subscription_id,
                    
                    onboarding_completed: true 
                };
                
                updatedProfile = checkExpiration(updatedProfile);
                setProfile(updatedProfile);
                localStorage.setItem('fiat-profile', JSON.stringify(updatedProfile));
            } else {
                // Perfil NÃO encontrado. O Trigger do SQL deve cuidar disso, mas se falhar:
                console.log("Perfil não encontrado no DB (Trigger pending or failed).");
                
                // Não tentamos insert manual imediatamente para evitar conflito com trigger
                // Apenas definimos o estado local para o usuário não ficar bloqueado
                setProfile(prev => ({ 
                    ...prev, 
                    name: user.user_metadata?.name || user.email?.split('@')[0],
                    email: user.email,
                    onboarding_completed: true 
                }));
            }
          }
      } catch (error) {
          console.error('Erro ao sincronizar perfil:', error);
      } finally {
          setIsLoadingProfile(false);
      }
  };

  // Inicialização e Listener de Auth
  useEffect(() => {
    // Busca inicial
    fetchUserProfile();

    // Listener para mudanças de estado (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event: any, session: any) => {
       if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
           // Pequeno delay para dar tempo ao trigger do banco rodar
           setTimeout(fetchUserProfile, 1000);
       }
       if (event === 'SIGNED_OUT') {
           setProfile({
              name: '',
              email: '',
              is_premium: false,
              streak: 0,
              rosaries_prayed: 0,
              favorites: [],
              active_novenas: [],
              onboarding_completed: false
           });
           localStorage.removeItem('fiat-profile');
           setIsLoadingProfile(false);
       }
    });

    return () => {
        authListener.subscription.unsubscribe();
    };
  }, []);

  // Persistência local
  useEffect(() => {
    localStorage.setItem('fiat-profile', JSON.stringify(profile));
  }, [profile]);

  // Áudio unlock
  useEffect(() => {
    const unlockAudio = () => {
        initAudio();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const updateProfile = async (p: UserProfile) => {
      // Atualiza estado local imediatamente (Optimistic UI)
      setProfile(p);
      
      // Atualiza no banco
      try {
          const user = await getCurrentUser();
          if (user) {
              const { error } = await supabase
                  .from('profiles')
                  .update({
                      name: p.name,
                      photo: p.photo,
                      streak: p.streak,
                      rosaries_prayed: p.rosaries_prayed,
                      favorites: p.favorites,
                      active_novenas: p.active_novenas,
                      devotional_saint_id: p.devotionalSaintId,
                      custom_theme: p.customTheme,
                      favorite_quote: p.favoriteQuote,
                      night_mode_spiritual: p.nightModeSpiritual
                  })
                  .eq('id', user.id);
              
              if (error) console.error('Erro ao salvar perfil no Supabase:', error);
          }
      } catch (e) {
          console.error('Erro de conexão ao atualizar:', e);
      }
  };

  const refreshProfile = async () => {
      await fetchUserProfile();
  };

  return (
    <AppContext.Provider value={{ profile, isLoadingProfile, updateProfile, refreshProfile, themeColors: { primary: '#d4af37' } }}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={!profile.onboarding_completed ? <LandingPage /> : <Navigate to="/home" replace />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/prayers" element={<PrayersPage />} />
            <Route path="/rosary" element={<RosaryPage />} />
            <Route path="/cenaculo" element={<CenaculoPage />} />
            <Route path="/advento" element={<AdventoPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/planner/create" element={<PlanCreatorPage />} />
            <Route path="/planner/:id" element={<PlanDetailPage />} />
            <Route path="/catechism" element={<CatechismPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/viasacra" element={<ViaSacraPage />} />
            <Route path="/novena/:id" element={<NovenaDetailPage />} />
            <Route path="/admin" element={
                <React.Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#05080f] text-fiat-gold">Carregando Admin...</div>}>
                    <AdminPage />
                </React.Suspense>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster position="top-center" theme="dark" style={{ fontFamily: 'serif' }} />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;