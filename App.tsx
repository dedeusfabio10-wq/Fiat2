import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Layout from './ui/Layout';
import { UserProfile } from './types';
import { initAudio } from './services/audio';
import { supabase, getCurrentUser, isMockMode } from './services/supabase';
import { AppContext } from './contexts/AppContext';
import { RealtimeChannel } from '@supabase/supabase-js';

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
        const toleranceDate = new Date(expirationDate);
        toleranceDate.setDate(toleranceDate.getDate() + 1);

        if (now.getTime() > toleranceDate.getTime()) {
            console.log('Plano Premium Expirado');
            toast.error("Seu tempo Premium acabou.", { description: "Renove para continuar usando os recursos." });
            return { ...userProfile, is_premium: false };
        } 
    }
    return userProfile;
  };

  const fetchUserProfile = async () => {
      try {
          const user = await getCurrentUser();
          if (user) {
            // Busca perfil no Supabase
            const { data, error } = await supabase
               .from('profiles')
               .select('*')
               .eq('id', user.id)
               .single();
            
            if (data) {
                console.log("Perfil carregado:", data.is_premium ? "PREMIUM" : "GRÁTIS");
                
                let updatedProfile: UserProfile = { 
                    ...profile,
                    name: data.name || profile.name,
                    email: data.email || user.email || profile.email,
                    photo: data.photo || profile.photo,
                    is_premium: data.is_premium,
                    premium_expires_at: data.premium_expires_at,
                    streak: data.streak || 0,
                    rosaries_prayed: data.rosaries_prayed || 0,
                    active_novenas: data.active_novenas || profile.active_novenas || [],
                    favorites: data.favorites || profile.favorites || [],
                    devotionalSaintId: data.devotional_saint_id,
                    customTheme: data.custom_theme,
                    favoriteQuote: data.favorite_quote,
                    nightModeSpiritual: data.night_mode_spiritual,
                    subscriptionType: data.subscription_type,
                    subscriptionMethod: data.subscription_method,
                    subscriptionId: data.subscription_id,
                    onboarding_completed: true 
                };
                
                updatedProfile = checkExpiration(updatedProfile);
                setProfile(updatedProfile);
                localStorage.setItem('fiat-profile', JSON.stringify(updatedProfile));
            } else {
                // IMPORTANTE: Se não houver perfil (data é null), o usuário existe no Auth mas não pagou ainda.
                // Mantemos como "Grátis" e onboarding completed.
                console.log("Usuário sem perfil (Ainda não pagou ou erro).");
                setProfile(prev => ({ 
                    ...prev, 
                    name: user.user_metadata?.name || user.email?.split('@')[0],
                    email: user.email,
                    is_premium: false, // Garante que não é premium
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

  // Realtime Subscription
  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtime = async () => {
        const user = await getCurrentUser();
        if (user) {
            channel = supabase
                .channel('profile_updates')
                .on(
                    'postgres_changes',
                    {
                        event: '*', // Ouve INSERT e UPDATE (pois profile pode ser criado no webhook)
                        schema: 'public',
                        table: 'profiles',
                        filter: `id=eq.${user.id}`,
                    },
                    (payload: any) => {
                        console.log('🔔 Atualização Realtime:', payload);
                        fetchUserProfile();
                        
                        if (payload.new && payload.new.is_premium) {
                            toast.success("Premium Ativado! ♡");
                        }
                    }
                )
                .subscribe();
        }
    };

    setupRealtime();

    return () => {
        if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // Auth & Visibility Listener
  useEffect(() => {
    fetchUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((event: any, session: any) => {
       if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
           fetchUserProfile();
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

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            fetchUserProfile();
        }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
        authListener.subscription.unsubscribe();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
      if (isMockMode) {
          console.warn("⚠️ FIAT MOCK MODE: Supabase desconectado.");
      }
  }, []);

  // Persistência Local
  useEffect(() => {
    localStorage.setItem('fiat-profile', JSON.stringify(profile));
  }, [profile]);

  // Áudio Unlock
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
      setProfile(p);
      try {
          const user = await getCurrentUser();
          if (user) {
              // Tenta update. Se falhar pq não existe, ignora (o webhook cria)
              // Ou poderíamos usar upsert aqui também, mas para settings básicas update é mais seguro para não criar lixo
              await supabase
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
          }
      } catch (e) {
          console.error('Erro ao atualizar perfil:', e);
      }
  };

  return (
    <AppContext.Provider value={{ profile, isLoadingProfile, updateProfile, refreshProfile: fetchUserProfile, themeColors: { primary: '#d4af37' } }}>
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